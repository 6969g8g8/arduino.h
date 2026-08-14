// Design reminder: Tactical fantasy battle UI — use role-specific depth movement as the readable meaning of each action.
const bosses = [
  ["01", "拖延史萊姆", "黏拳拍打", "../bosses/01-slime/attack.mp4"],
  ["02", "回音蝙蝠", "尖叫點名", "../bosses/02-bat/attack.mp4"],
  ["03", "鏡盾石像", "鏡核暴露", "../bosses/03-golem/attack.mp4"],
  ["04", "分裂草精", "生命分裂", "../bosses/04-sprite/attack.mp4"],
  ["05", "潮汐巨蟹", "漲潮", "../bosses/05-crab/attack.mp4"],
  ["06", "欺詐小丑", "真假提示", "../bosses/06-clown/attack.mp4"],
  ["07", "熔核巨人", "熔核過熱", "../bosses/07-magma/attack.mp4"],
  ["08", "影縛雙子", "靈魂連結", "../bosses/08-twins/attack.mp4"],
  ["09", "時間沙漏魔", "偷取冷卻", "../bosses/09-hourglass/attack.mp4"],
  ["10", "虛空門神", "開門衝擊", "../bosses/10-voidgate/attack.mp4"],
];
const roles = ["warrior", "tank", "support"];
const roleMeta = { warrior: ["戰士", "攻擊", "前排突進"], tank: ["坦克", "防禦", "中排承傷"], support: ["輔助", "回血", "原位施療"] };
const bossVideo = document.querySelector("#boss-video");
const activeActors = new Set();
let soundOn = false;
let bossIndex = 0;
let round = 7;
let bossHp = 78;

function setText(id, value) { document.getElementById(id).textContent = value; }
function setHp(value) { bossHp = Math.max(0, Math.min(100, value)); setText("boss-hp-value", `${bossHp}%`); document.getElementById("boss-hp-fill").style.width = `${bossHp}%`; }
function setPhase(value) { setText("phase-chip", value); }
function addLog(value) { const log = document.querySelector("#combat-log"); const line = document.createElement("p"); line.innerHTML = `<b>0${(round % 9) + 1}</b> ${value}`; log.prepend(line); while (log.children.length > 3) log.lastElementChild.remove(); }

function renderBosses() {
  const selector = document.querySelector("#boss-selector");
  selector.innerHTML = "";
  bosses.forEach((boss, index) => {
    const button = document.createElement("button");
    button.className = `boss-pill${index === bossIndex ? " boss-pill-active" : ""}`;
    button.type = "button";
    button.innerHTML = `<span>${boss[0]}</span>${boss[1]}`;
    button.addEventListener("click", () => { if (activeActors.size) return; bossIndex = index; updateBoss(); });
    selector.appendChild(button);
  });
}
function updateBoss() {
  const boss = bosses[bossIndex];
  bossVideo.src = boss[3]; bossVideo.load(); bossVideo.play().catch(() => {}); bossVideo.muted = !soundOn;
  setText("boss-id", `BOSS · ${boss[0]}`); setText("boss-name", boss[1]); setText("boss-skill", boss[2]); setText("boss-count", `${boss[0]} / 10`); renderBosses();
}

function endRole(role) {
  const actor = document.querySelector(`.actor-${role}`); const video = actor.querySelector("video");
  activeActors.delete(role); actor.classList.remove("actor-active"); actor.querySelector(".actor-state").textContent = "待命"; video.pause(); video.currentTime = 0;
  document.querySelectorAll("[data-role-button]").forEach((button) => { button.disabled = false; button.classList.remove("active"); });
  document.querySelector("#command-state").textContent = "● READY"; document.querySelector("#command-state").classList.remove("live"); setPhase("⌁ 等待隊伍指令");
}
function triggerRole(role) {
  if (activeActors.size) return;
  const actor = document.querySelector(`.actor-${role}`); const video = actor.querySelector("video"); const meta = roleMeta[role];
  activeActors.add(role); actor.classList.add("actor-active"); actor.querySelector(".actor-state").textContent = meta[2];
  document.querySelectorAll("[data-role-button]").forEach((button) => { button.disabled = true; }); document.querySelector(`[data-role-button="${role}"]`).classList.add("active");
  document.querySelector("#command-state").textContent = "● EXECUTING"; document.querySelector("#command-state").classList.add("live"); setPhase(`${role === "warrior" ? "⚔" : role === "tank" ? "♜" : "✚"} ${meta[0]}｜${meta[1]}｜${meta[2]}`); addLog(`${meta[0]}｜${meta[1]}｜${meta[2]}`); round += 1; setText("round-number", String(round).padStart(2, "0"));
  if (role === "warrior") setHp(bossHp - 7);
  if (role === "support") document.querySelectorAll(".party-vitals p small").forEach((node, index) => { const value = [81, 91, 97][index]; node.textContent = `${value}%`; node.previousElementSibling.querySelector("em").style.width = `${value}%`; });
  if (role === "tank") document.querySelector(".party-vitals p:nth-of-type(2) small").textContent = "84%";
  document.querySelector("#heal-link").classList.toggle("heal-link-visible", role === "support"); document.querySelector("#screen-flash").className = `screen-flash flash-${role}`;
  video.muted = !soundOn; video.currentTime = 0; video.play().catch(() => {}); video.onended = () => { document.querySelector("#heal-link").classList.remove("heal-link-visible"); endRole(role); };
  window.setTimeout(() => { if (activeActors.has(role)) endRole(role); }, 8200);
}

document.querySelectorAll("[data-role-button]").forEach((button) => button.addEventListener("click", () => triggerRole(button.dataset.roleButton)));
document.querySelector("#sound-toggle").addEventListener("click", () => { soundOn = !soundOn; document.querySelector("#sound-toggle").textContent = soundOn ? "◉" : "⌁"; document.querySelector("#sound-toggle").setAttribute("aria-label", soundOn ? "關閉音效" : "開啟音效"); document.querySelectorAll("video").forEach((video) => { video.muted = !soundOn; if (soundOn) video.play().catch(() => {}); }); });
document.querySelector("#reset-button").addEventListener("click", () => { roles.forEach(endRole); setHp(78); round = 7; setText("round-number", "07"); addLog("隊伍已重新集結"); setPhase("⌁ 等待隊伍指令"); });
updateBoss();
