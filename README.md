# ROX LAB · HYROX 训练工具

中文、适配手机和 iPad 的训练工作台。独立开发，非 HYROX 官方应用。

在线体验：https://hyrox-performance-lab.heracles1983.chatgpt.site

## 已实现
- 全程模拟、单站与比赛日连续计时；跑步、进站、功能站和离站分别记录。
- 裁判有效计数、无效动作原因、人工罚时与保留历史的撤销；支持运动员和裁判姓名。
- 计时草稿恢复；记录由账户隔离，保存于 D1。
- 训练 / 恢复 / 比赛日历；补录成绩与训练复盘。
- 同一运动员、模式、组别、目标与记录的负重条件下的成绩趋势；两次记录的单站横向比较。
- 运动员参考成绩手工录入，需要 HTTPS 来源；不将空白分段当成零。
- 目标比赛、配速预算、倒计时与比赛日清单。
- 地区筛选与全球赛事快照，18 场，核对日期 2026-09-10。

## 数据边界
- 赛事为人工核对快照，不是自动更新或完整全球赛历；官方页面优先。
- 官方全球排名以外链提供，未连接官方实时成绩 API。
- 用户录入的运动员成绩不会标为已获官方验证。
- 比赛计时与裁判模块为辅助工具，不会向官方提交成绩或罚时。
- 未接入 Apple Health、Apple Watch、Garmin 或自动训练计划接口。
- localStorage 仅保存进行中的临时计时草稿和城市偏好，正式记录存于服务端。
- 当前不保证首次离线打开或浏览器被系统清除后的草稿恢复。

## 产品参考
- ROXFIT 开发者功能介绍：https://www.roxfit.app/how-it-works/
- ROXFIT FAQ：https://www.roxfit.app/faq/
- TrainRox 开发者商店介绍：https://play.google.com/store/apps/details?id=com.stellarapps.workout
- App Store 详情未能成功读取；不对地区上架、价格或版本作结论。
- 官方赛事：https://hyroxuk.com/find-my-race/
- 上海站：https://hyroxuk.com/event/hyrox-shanghai-1031/
- 官方赛制：https://hyroxuk.com/the-fitness-race/
- 官方规则：https://hyroxuk.com/rulebook/
- 官方排名入口：https://hyroxresults.com/

## 验证
使用 TypeScript 类型检查、Cloudflare Worker 构建，以及计时/判罚/分段逻辑检查。
未执行浏览器操作测试或真实比赛现场验证。

## 本地运行

需要 Node.js 22.13+ 和 pnpm 11。

```bash
pnpm install
pnpm dev
```

训练记录使用 Cloudflare D1；ChatGPT 登录及 Sites 部署依赖对应的托管环境。本地开发时可以查看和修改界面，账户登录及云端记录需要自行配置兼容的鉴权与数据库。

## 开源协议

项目代码采用 MIT License。HYROX 名称及相关商标归其权利人所有，本项目与 HYROX 官方无隶属或背书关系。
