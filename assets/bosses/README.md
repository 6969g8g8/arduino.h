# 攻略傳送門｜Boss 攻擊動畫素材包

依 10 張 Boss 概念圖生成的攻擊動畫（蓄力 → 出手 → 命中）。

## 目錄結構

```text
assets/bosses/
  01-slime/      attack.gif  attack.mp4  frames/{01_windup,02_strike,03_impact}.png
  02-bat/
  03-golem/
  04-sprite/
  05-crab/
  06-clown/
  07-magma/
  08-twins/
  09-hourglass/
  10-voidgate/
```

每個 Boss：
- `attack.gif`：循環攻擊動畫（約 1.1s／圈，512px）
- `attack.mp4`：同內容 MP4（較順）
- `frames/`：三個關鍵幀 PNG

## 對照表

| ID | 資料夾 | Boss | 動畫對應技能 |
|----|--------|------|--------------|
| 01 | `01-slime` | 拖延史萊姆 | 黏拳拍打 → 黏液噴吐 |
| 02 | `02-bat` | 回音蝙蝠 | 翼刃俯衝 → 尖叫點名 |
| 03 | `03-golem` | 鏡盾石像 | 石拳砸擊 → 鏡盾反傷／暴露 |
| 04 | `04-sprite` | 分裂草精（藤蔓女帝視覺） | 藤鞭抽打 → 分裂生苗 |
| 05 | `05-crab` | 潮汐巨蟹 | 左鉗重砸 → 漲潮 |
| 06 | `06-clown` | 欺詐小丑 | 愚人飛牌 → 真假提示 |
| 07 | `07-magma` | 熔核巨人 | 熔拳轟擊 → 過熱爆轟 |
| 08 | `08-twins` | 影縛雙子 | 影爪／鐮刀 → 靈魂連結 |
| 09 | `09-hourglass` | 時間沙漏魔 | 時刃斬 → 偷取冷卻 |
| 10 | `10-voidgate` | 虛空門神 | 開門衝擊／法杖光束 → 終末齊拍 |

## 幀語義

| 檔名 | 階段 | 用途 |
|------|------|------|
| `01_windup.png` | 蓄力 | 讀條／預兆開始 |
| `02_strike.png` | 出手 | 技能釋放中 |
| `03_impact.png` | 命中 | 傷害結算／機制生效 |

## 工程接入建議

```text
onCastStart  -> show frames/01_windup  (+ telegraph UI)
onSkillFire  -> show frames/02_strike  或播放 attack.mp4
onHitResolve -> show frames/03_impact  (+ VFX overlay)
```

或直接循環播放 `attack.gif`／`attack.mp4` 作為戰鬥中 Boss 表演層。

## 規格關聯

- 關卡／數值：`docs/game-design/portal-raid-10-stages.md`
- 動畫文字規格：`docs/game-design/portal-raid-boss-animations-skills.md`

大型二進位檔以 Git LFS 追蹤（`.gitattributes`）。
