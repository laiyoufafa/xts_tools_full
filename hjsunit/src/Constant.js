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
// define the test type, size and level
if (typeof globalThis !== 'undefined') {
  globalThis.DEFAULT = 0B0000
  globalThis.FUNCTION = 0B1
  globalThis.PERFORMANCE = 0B1 << 1
  globalThis.POWER = 0B1 << 2
  globalThis.RELIABILITY = 0B1 << 3
  globalThis.SECURITY = 0B1 << 4
  globalThis.GLOBAL = 0B1 << 5
  globalThis.COMPATIBILITY = 0B1 << 6
  globalThis.USER = 0B1 << 7
  globalThis.STANDARD = 0B1 << 8
  globalThis.SAFETY = 0B1 << 9
  globalThis.RESILIENCE = 0B1 << 10

  globalThis.SMALLTEST = 0B1 << 16
  globalThis.MEDIUMTEST = 0B1 << 17
  globalThis.LARGETEST = 0B1 << 18

  globalThis.LEVEL0 = 0B1 << 24
  globalThis.LEVEL1 = 0B1 << 25
  globalThis.LEVEL2 = 0B1 << 26
  globalThis.LEVEL3 = 0B1 << 27
  globalThis.LEVEL4 = 0B1 << 28
}
