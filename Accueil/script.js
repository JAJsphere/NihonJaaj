/* Phrases stockées */
const phrases = [
    { jp: "いただきます", fr: "Itadakimasu — Expression avant de manger" },
    { jp: "おはようございます", fr: "Ohayou gozaimasu — Bonjour le matin (Formel)" },
    { jp: "こんばんは", fr: "Konbanwa — Bonsoir" },
    { jp: "ありがとうございます", fr: "Arigatou gozaimasu — Merci beaucoup" },
    { jp: "がんばって！", fr: "Ganbatte ! — Bon courage !" },
    { jp: "すごい！", fr: "Sugoi ! — Incroyable !" },
    { jp: "だいじょうぶ？", fr: "Daijoubu ? — Ça va ?" },
    { jp: "おやすみなさい", fr: "Oyasuminasai — Bonne nuit" },
    { jp: "よろしくお願いします", fr: "Yoroshiku onegaishimasu — Enchanté / Comptez sur moi" },
    { jp: "おはようございます", fr: "Ohayou — Bonjour le matin (Informel)" }
];

let lastIndex = -1;

function pickRandomIndex() {
    if (phrases.length === 0) return -1;
    if (phrases.length === 1) return 0;
    let idx = Math.floor(Math.random() * phrases.length);
    while (idx === lastIndex) {
        idx = Math.floor(Math.random() * phrases.length);
    }
    lastIndex = idx;
    return idx;
}

/* Fonction pour générer les phrases */
function genererPhrase() {
    const idx = pickRandomIndex();
    if (idx === -1) return;

    const jpEl = document.getElementById("jp");
    const frEl = document.getElementById("fr");

    // fade out
    jpEl.classList.add("invisible");
    frEl.classList.add("invisible");

    // attendre la fin du petit fade puis changer le texte et ré-afficher
    setTimeout(() => {
        jpEl.textContent = phrases[idx].jp;
        frEl.textContent = phrases[idx].fr;
        jpEl.classList.remove("invisible");
        frEl.classList.remove("invisible");
    }, 180);
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btn-nouvelle");
    btn.addEventListener("click", genererPhrase);
});
