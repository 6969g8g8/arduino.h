# 間 Ma

把暫停變成一幅墨色。

『間』是一款反沉迷、反量化的靜默收集應用：進行中不顯示倒數，墨色隨你的專注與靜止慢慢洇開；離開分頁或晃動裝置，進度會變慢或停住。結束後，這場空白成為可收藏的生成畫作。

## 獨特之處

App Store 常見冥想計時、習慣打卡與白噪音。『間』收藏的是**空本身**——以生成墨色記住你沒有填滿的時間。

詳見 [APP_STORE.md](./APP_STORE.md)（上架文案、關鍵字、審核說明）。

## 本機執行

```bash
npm install
npm run dev
```

建置：

```bash
npm run build
npm run preview
```

支援安裝為 PWA（加入主畫面）。在支援的行動裝置上會使用動態感測，讓靜止程度影響墨色濃淡。

## 技術

- React + TypeScript + Vite
- Framer Motion
- Canvas 生成墨色
- 本機 `localStorage` 墨集（無需帳號）
