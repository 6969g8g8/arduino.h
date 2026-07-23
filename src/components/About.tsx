interface AboutProps {
  onBack: () => void
}

export function About({ onBack }: AboutProps) {
  return (
    <section className="view about">
      <header className="panel-header">
        <button type="button" className="btn ghost" onClick={onBack}>
          返回
        </button>
        <h2>何以獨特</h2>
        <span className="panel-spacer" />
      </header>

      <div className="about-body">
        <p className="about-lead">
          App Store 裡多的是冥想計時、習慣打卡與白噪音。『間』做的是另一件事：
          <strong>把你沒有填滿的時間，變成可收藏的墨色。</strong>
        </p>

        <ol className="about-list">
          <li>
            <h3>反量化過程</h3>
            <p>進行中不顯示倒數或分數。時間以洇墨呈現，結束後才出現紀錄。</p>
          </li>
          <li>
            <h3>靜默驅動生成</h3>
            <p>
              裝置越靜、分頁越專注，墨色越沉。離開或晃動，進度會變慢或暫停——空白需要你在場。
            </p>
          </li>
          <li>
            <h3>收藏的是「空」</h3>
            <p>
              產品不是待辦、不是社交動態，而是一冊只屬於你的暫停畫冊。每場種子不同，墨跡不可重製。
            </p>
          </li>
        </ol>

        <p className="about-foot">
          間（Ma）源自日語美學中的「留白」——不是什麼都沒有，而是讓呼吸有地方待。
        </p>
      </div>
    </section>
  )
}
