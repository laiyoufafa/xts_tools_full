/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class InstrumentLog {
  constructor (attr) {
    this.id = attr.id
    this.index = 0
  }

  init (coreContext) {
    this.coreContext = coreContext
    this.suiteService = this.coreContext.getDefaultService('suite')
    this.specService = this.coreContext.getDefaultService('spec')
  }

  taskStart () {
  }

  taskDone () {
    let summary = this.suiteService.getSummary()
    var action = {}
    var actionData = {}
    actionData.data = '\\' + 'INSTRUMENTATION_RESULT: stream=Tests run: ' + summary.total + ',  Failures: ' + summary.failure + ' ' + '\\' + 'INSTRUMENTATION_CODE: ' + (summary.failure > 0 ? -1 : 0) + '\\'

    action.bundleName = 'decc.testkit.runner'
    action.abilityName = 'decc.testkit.runner.MessageAbility'
    action.messageCode = 1001
    action.data = actionData
    action.abilityType = 1
    action.syncOption = 0

    console.info('call ability data: ' + JSON.stringify(action))
    FeatureAbility.callAbility(action).then(data => {
      console.info('call ability resolved: ' + data)
    }, error => {
      console.error('call ability rejected: ' + error)
    })
  }

  suiteStart () {

  }

  suiteDone () {

  }

  specStart () {
    var action = {}
    var actionData = {}

    let suiteService = this.coreContext.getDefaultService('suite')
    actionData.data = '\\' + 'INSTRUMENTATION_STATUS: class=' + suiteService.getCurrentRunningSuite().description
    actionData.data += '\\' + 'INSTRUMENTATION_STATUS: current=' + (this.index + 1)
    actionData.data += '\\' + 'INSTRUMENTATION_STATUS: id=JS'
    actionData.data += '\\' + 'INSTRUMENTATION_STATUS: numtests=' + suiteService.getSummary().total
    actionData.data += '\\' + 'INSTRUMENTATION_STATUS: stream='
    actionData.data += '\\' + 'INSTRUMENTATION_STATUS: test=' + this.specService.currentRunningSpec.description
    actionData.data += '\\' + 'INSTRUMENTATION_STATUS_CODE: 1' + '\\'
    this.index = this.index + 1

    action.bundleName = 'decc.testkit.runner'
    action.abilityName = 'decc.testkit.runner.MessageAbility'
    action.messageCode = 1001
    action.data = actionData
    action.abilityType = 1
    action.syncOption = 0

    console.info('call ability data: ' + JSON.stringify(action))
    FeatureAbility.callAbility(action).then(data => {
      console.info('call ability resolved: ' + data)
    }, error => {
      console.error('call ability rejected: ' + error)
    })
  }

  specDone () {
    var action = {}
    var actionData = {}
    actionData.data = '\\' + 'INSTRUMENTATION_STATUS: class=' + this.suiteService.getCurrentRunningSuite().description
    actionData.data += '\\' + 'INSTRUMENTATION_STATUS: current=' + this.index
    actionData.data += '\\' + 'INSTRUMENTATION_STATUS: id=JS'
    actionData.data += '\\' + 'INSTRUMENTATION_STATUS: numtests=' + this.suiteService.getSummary().total
    let emsg = ''
    if (this.specService.currentRunningSpec.error) {
      actionData.data += '\\' + 'INSTRUMENTATION_STATUS: stack=' + this.specService.currentRunningSpec.error
      actionData.data += '\\' + 'INSTRUMENTATION_STATUS: stream=' + '\\' + 'Error in ' + this.specService.currentRunningSpec.description + '\\' + this.specService.currentRunningSpec.error
      actionData.data += '\\' + 'INSTRUMENTATION_STATUS: test=' + this.specService.currentRunningSpec.description
      actionData.data += '\\' + 'INSTRUMENTATION_STATUS_CODE: -1' + '\\'
    } else if (this.specService.currentRunningSpec.result) {
      if (this.specService.currentRunningSpec.result.failExpects.length > 0) {
        this.specService.currentRunningSpec.result.failExpects.forEach(failExpect => {
          emsg = failExpect.message || ('expect ' + failExpect.actualValue + ' ' + failExpect.checkFunc + ' ' + (failExpect.expectValue || ''))
        })
        actionData.data += '\\' + 'INSTRUMENTATION_STATUS: stack=' + emsg
        actionData.data += '\\' + 'INSTRUMENTATION_STATUS: stream=' + '\\' + 'Error in ' + this.specService.currentRunningSpec.description + '\\' + emsg
        actionData.data += '\\' + 'INSTRUMENTATION_STATUS: test=' + this.specService.currentRunningSpec.description
        actionData.data += '\\' + 'INSTRUMENTATION_STATUS_CODE: -2' + '\\'
      } else {
        actionData.data += '\\' + 'INSTRUMENTATION_STATUS: stream='
        actionData.data += '\\' + 'INSTRUMENTATION_STATUS: test=' + this.specService.currentRunningSpec.description
        actionData.data += '\\' + 'INSTRUMENTATION_STATUS_CODE: 0' + '\\'
      }
    } else {
      actionData.data += '\\'
    }

    action.bundleName = 'decc.testkit.runner'
    action.abilityName = 'decc.testkit.runner.MessageAbility'
    action.messageCode = 1001
    action.data = actionData
    action.abilityType = 1
    action.syncOption = 0

    console.info('call ability data: ' + JSON.stringify(action))
    FeatureAbility.callAbility(action).then(data => {
      console.info('call ability resolved: ' + data)
    }, error => {
      console.error('call ability rejected: ' + error)
    })
  }
}

export default InstrumentLog
