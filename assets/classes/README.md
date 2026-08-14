# 攻略傳送門｜職業動畫素材包

依戰士／輔助／坦克立繪生成的 **攻擊、回血、防禦** 動畫（蓄力 → 出手／施放 → 命中／生效）。

## 目錄

```text
assets/classes/
  warrior/   attack.gif  heal.gif  defend.gif  (+ mp4)
             attack/frames/  heal/frames/  defend/frames/
  support/
  tank/
```

每個動作：
- `*.gif`／`*.mp4`：循環動畫（約 1.1s／圈，512px）
- `frames/01_windup.png`、`02_strike.png`、`03_impact.png`

預覽：`assets/classes/index.html`

## 對照表

| 職業 | 資料夾 | 攻擊 | 回血 | 防禦 |
|------|--------|------|------|------|
| 戰士 | `warrior` | 焰劍蓄力橫斬／砸地 | 鎧甲紫晶轉化治療光＋愛心 | 焰劍橫擋→插地橙盾 |
| 輔助 | `support` | 十字法杖綠光束／投藥瓶 | 高舉藥水＋法杖綠十字脈衝 | 法杖橫擋→綠十字結界 |
| 坦克 | `tank` | 盾擊衝刺／砸地藍紫刺 | 盾徽藍光治療光環 | 舉盾→藍色六角能量牆 |

## 技能對應（遊戲邏輯）

| 職業 | 攻擊動畫 | 回血動畫 | 防禦動畫 |
|------|----------|----------|----------|
| 戰士 | 狩獵／破壞 | 受輔助治療時的受術表現（可選） | 被防禦／效果增幅時的護體 |
| 輔助 | 輕攻擊（法杖） | **回血**／效果增幅 | 緊急自保結界 |
| 坦克 | 仇恨普攻／盾擊 | 受治療表現 | **防禦**／暫停 |

## 幀語義

| 檔名 | 階段 |
|------|------|
| `01_windup.png` | 蓄力／起手 |
| `02_strike.png` | 出手／引導 |
| `03_impact.png` | 命中／效果爆發 |

## 規格關聯

- 職業技能數值：`docs/game-design/portal-raid-10-stages.md` §1.3
- Boss 動畫包：`assets/bosses/`

## 可播放職業技能影片

下列三個職業技能 MP4 已更新為可直接播放的完整動畫，規格為 1280×720、16:9、8 秒，並包含 AAC 音效。影片沿用既有檔名與目錄，因此現有遊戲程式不需要變更引用路徑；完整對照表請見 [`GENERATED_SKILL_VIDEOS.md`](./GENERATED_SKILL_VIDEOS.md)。

| 職業 | 技能 | 影片 |
| --- | --- | --- |
| 戰士 | 攻擊 | `warrior/attack.mp4` |
| 坦克 | 防禦 | `tank/defend.mp4` |
| 輔助 | 回血 | `support/heal.mp4` |
