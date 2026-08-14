# 攻略傳送門｜10 Boss 攻擊影片

本目錄中的 `attack.mp4` 已更新為可直接播放的 Boss 攻擊動畫影片，對應 Pull Request #2 的十個 Boss 設計規格。

所有影片均為 **1280×720、16:9、8 秒、H.264 MP4，並包含 AAC 音效**。影片採「蓄力／預兆 → 出手 → 命中／機制爆發」的戰鬥動畫結構，並保留原有 `attack.gif`、三張關鍵幀與其他素材，不影響既有工程引用。

| 關卡 | Boss | 檔案 | 動畫內容 |
| ---: | --- | --- | --- |
| 01 | 拖延史萊姆 | `01-slime/attack.mp4` | 黏拳拍打、黏液濺射 |
| 02 | 回音蝙蝠 | `02-bat/attack.mp4` | 翼刃俯衝、尖叫聲波 |
| 03 | 鏡盾石像 | `03-golem/attack.mp4` | 石拳砸擊、鏡盾反傷 |
| 04 | 分裂草精 | `04-sprite/attack.mp4` | 藤鞭抽打、生命分裂 |
| 05 | 潮汐巨蟹 | `05-crab/attack.mp4` | 左鉗重砸、漲潮 |
| 06 | 欺詐小丑 | `06-clown/attack.mp4` | 愚人飛牌、真假提示 |
| 07 | 熔核巨人 | `07-magma/attack.mp4` | 熔拳轟擊、過熱爆轟 |
| 08 | 影縛雙子 | `08-twins/attack.mp4` | 雙影爪、靈魂連結 |
| 09 | 時間沙漏魔 | `09-hourglass/attack.mp4` | 時砂彈、時刃斬、時間倒轉 |
| 10 | 虛空門神 | `10-voidgate/attack.mp4` | 開門衝擊、虛空拍擊、終末之眼 |

## 工程引用

遊戲程式可沿用既有路徑，直接播放各 Boss 目錄下的 `attack.mp4`。若需要在預兆、出手與命中階段進行更細緻的同步，請使用同目錄中的 `frames/01_windup.png`、`frames/02_strike.png` 與 `frames/03_impact.png` 作為 UI 讀條或特效疊加的參考。

```text
assets/bosses/<boss-id>/attack.mp4
assets/bosses/<boss-id>/frames/01_windup.png
assets/bosses/<boss-id>/frames/02_strike.png
assets/bosses/<boss-id>/frames/03_impact.png
```

影片由 PR #2 的 Boss 動畫規格製作，來源 Pull Request：[Add portal raid 10-stage boss design spec](https://github.com/6969g8g8/arduino.h/pull/2)。
