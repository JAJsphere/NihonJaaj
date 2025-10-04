document.addEventListener("DOMContentLoaded", () => {
  // Sélectionne tous les symboles et leurs lettres associées
  const kanas = Array.from(document.querySelectorAll(".kana"));
  const lettres = Array.from(document.querySelectorAll(".lettre-reponse"));

  // Récupère les paires (kana + lettre)
  const paires = kanas.map((k, i) => ({
    kana: k.textContent,
    lettre: lettres[i].textContent
  }));

  // Mélange avec Fisher–Yates
  for (let i = paires.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [paires[i], paires[j]] = [paires[j], paires[i]];
  }

  // Réaffecte les nouvelles valeurs dans le HTML
  paires.forEach((p, i) => {
    kanas[i].textContent = p.kana;
    lettres[i].textContent = p.lettre;
  });
});