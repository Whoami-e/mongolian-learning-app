# 技术方案

## 1. 技术选型

### 推荐方案

```text
React Native
Expo
TypeScript
Expo Router
expo-audio
expo-sqlite
Supabase
```

React Native 负责跨平台手机界面，Expo 负责项目运行和系统能力，TypeScript 负责类型约束。

Expo Router 用于管理页面和导航；`expo-audio` 用于播放课程音频；`expo-sqlite` 用于保存本地学习数据。

## 2. 分阶段架构

### V0 和 MVP

```text
App
├── 本地课程 JSON
├── 本地图片
├── 本地音频
├── SQLite 学习进度
└── 本地错题记录
```

### 后续版本

```text
App
├── 本地课程缓存
├── 本地学习进度
├── Supabase 用户账号
├── Supabase 数据库
├── Supabase Storage 音频和图片
└── 云端同步
```

第一版不强制登录，不把后端作为开发前置条件。

## 3. 本地数据模型

### 课程

```text
courses
- id
- unit_id
- title_zh
- description_zh
- order_index
- level
- status
```

### 词汇

```text
vocabulary
- id
- category
- chinese
- mongolian_traditional
- pronunciation_hint
- audio_asset
- image_asset
- example_chinese
- example_mongolian
- review_status
```

### 练习题

```text
exercises
- id
- lesson_id
- type
- prompt
- answer
- options
- explanation
- audio_asset
- image_asset
```

### 用户进度

```text
user_progress
- lesson_id
- completed
- score
- attempts
- last_studied_at
```

### 错题

```text
mistakes
- exercise_id
- wrong_count
- correct_streak
- next_review_at
```

## 4. 传统蒙古文显示方案

开发前必须做独立验证页，验证：

- 字母独立形态
- 词首、词中、词尾形态
- 字母连接
- 竖排显示
- 字体在 Android 和 iPhone 上的表现
- 小屏幕和大字号下是否变形或溢出

字体选择必须确认授权。不能默认假设所有系统设备都能正确显示传统蒙古文。

如果系统字体表现不稳定，使用项目内嵌字体，并统一由 App 控制字形显示。

## 5. 音频方案

第一版只支持音频播放：

- 词条音频
- 字母音频
- 句子音频

音频文件要求：

- 真人录制
- 统一音量
- 每个条目单独文件
- 文件名与内容编号绑定
- 本地资源和云端资源使用同一套编号

暂不加入录音和自动评分，避免一开始引入麦克风权限、语音识别和评分误差。

## 6. 离线策略

首批课程随 App 安装包提供：

- 课程数据
- 字体
- 图片
- 音频

用户学习后，把以下内容保存到 SQLite：

- 已完成课程
- 分数
- 错题
- 连续学习天数
- 最近学习时间

后续接入云同步时，以本地记录优先合并，避免网络中断导致进度丢失。

## 7. 后端方案

后续可以使用 Supabase：

- Auth：家长或成人账号
- Postgres：课程和学习进度
- Storage：图片和音频
- 权限策略：区分用户数据和公开课程数据

儿童模式不应默认要求填写真实姓名、手机号或其他不必要的个人信息。

## 8. 推荐目录结构

正式开发时可以采用：

```text
mongolian-learning-app/
├── README.md
├── 01-product-plan.md
├── 02-product-solution.md
├── 03-technical-solution.md
├── app/
├── assets/
│   ├── fonts/
│   ├── audio/
│   └── images/
├── content/
│   ├── courses/
│   ├── vocabulary/
│   └── exercises/
└── docs/
```

## 9. 测试重点

### 字形测试

- 不同设备显示一致
- 不出现方框或乱码
- 不出现字母错连
- 竖排布局不溢出

### 学习流程测试

- 课程可以连续完成
- 答错后反馈正确
- 错题能进入复习
- 退出后进度不丢失
- 没有网络时可以学习已下载内容

### 音频测试

- 音频能播放和暂停
- 切换题目时不会重叠播放
- 快速点击不会重复播放
- 低网络环境下不会卡死

## 10. 开发前技术验证

正式开发前只做一个小型验证原型，不做完整 App。

验证内容：

1. 一个蒙古文字体页面
2. 一个音频播放页面
3. 一个本地课程页面
4. 一道选择题
5. 一次 SQLite 进度保存

验证通过标准：

- 字形在目标设备上可读
- 音频播放稳定
- 本地数据可读取
- 学习进度可保存
- 网络关闭后仍能完成课程

验证通过后，再开始正式开发首页、课程地图和完整 MVP。

## 11. 技术决策结论

首选：

> React Native + Expo + TypeScript + expo-router + expo-audio + expo-sqlite

后续扩展：

> Supabase Auth + Database + Storage

开发顺序：

```text
字体验证 -> 音频验证 -> 本地课程验证
-> SQLite 验证 -> UI 开发 -> 内容接入
-> 用户测试 -> 云同步
```

