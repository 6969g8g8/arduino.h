# 攻略傳送門｜職業技能影片

本目錄下的三個職業技能 `*.mp4` 已更新為可直接播放的完整遊戲動畫影片，對應 PR #2 的戰士、坦克與輔助技能規格。

所有影片均為 **1280×720、16:9、8 秒、H.264 MP4，並包含 AAC 音效**。每段影片皆採「蓄力 → 釋放 → 效果生效」的三段式表現。

| 職業 | 技能 | 檔案 | 動畫內容 |
| --- | --- | --- | --- |
| 戰士 | 攻擊 | `warrior/attack.mp4` | 焰劍蓄力、火焰橫斬、砸地衝擊波 |
| 坦克 | 防禦 | `tank/defend.mp4` | 舉盾架勢、承受攻擊、藍色六角能量牆 |
| 輔助 | 回血 | `support/heal.mp4` | 法杖與藥水蓄能、綠色治療光束、隊友回血光環 |

## 工程引用

現有遊戲程式可直接沿用職業素材目錄與檔名，不需要變更播放路徑：

```text
assets/classes/warrior/attack.mp4
assets/classes/tank/defend.mp4
assets/classes/support/heal.mp4
```

每段影片均包含原生音效。若需要在動畫階段中進行更細緻的遊戲邏輯同步，可搭配同職業目錄下既有的 `frames/01_windup.png`、`frames/02_strike.png` 與 `frames/03_impact.png`。

來源 Pull Request：[Add portal raid 10-stage boss design spec](https://github.com/6969g8g8/arduino.h/pull/2)。
