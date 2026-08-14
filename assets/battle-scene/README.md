# 整合式戰鬥場景 Demo

這個資料夾提供一個可直接在瀏覽器開啟的單頁戰鬥畫面，對應手繪草圖的核心構圖：Boss 位於上方，戰士、坦克與輔助位於同一個地下城背景的下方戰場，底部則是職業技能操作列。

## 開啟方式

請從儲存庫根目錄啟動一個靜態伺服器，再開啟 `assets/battle-scene/index.html`。例如：

```bash
python3 -m http.server 8080
```

直接以 `file://` 開啟可能會被瀏覽器的影片跨來源限制阻擋，因此建議使用 HTTP 靜態伺服器。

## 已整合的互動

Boss 選擇列會切換上方的 Boss 攻擊影片。點擊「戰士／攻擊」時，戰士會從後排位置前移至前排並播放 `assets/classes/warrior/attack.mp4`；點擊「坦克／防禦」時，坦克會移至中排並播放 `assets/classes/tank/defend.mp4`；點擊「輔助／回血」時，輔助維持原位，以 `assets/classes/support/heal.mp4` 播放治療動畫並顯示治療連結。技能執行期間按鈕會暫時鎖定，避免重複觸發造成位置與影片狀態錯亂。

## 資產路徑

```text
assets/battle-scene/index.html
assets/battle-scene/style.css
assets/battle-scene/app.js
assets/battle-scene/battlefield.jpg
assets/battle-scene/portal-mark.png
assets/bosses/<boss-id>/attack.mp4
assets/classes/warrior/attack.mp4
assets/classes/tank/defend.mp4
assets/classes/support/heal.mp4
```
