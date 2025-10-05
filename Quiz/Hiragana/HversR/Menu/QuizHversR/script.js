// Définition des hiragana par lignes
const HIRAGANA = {
    "a": { "a":"あ", "i":"い", "u":"う", "e":"え", "o":"お" },
    "ka": { "ka":"か","ki":"き","ku":"く","ke":"け","ko":"こ" },
    "sa": { "sa":"さ","shi":"し","su":"す","se":"せ","so":"そ" },
    "ta": { "ta":"た","chi":"ち","tsu":"つ","te":"て","to":"と" },
    "na": { "na":"な","ni":"に","nu":"ぬ","ne":"ね","no":"の" },
    "ha": { "ha":"は","hi":"ひ","fu":"ふ","he":"へ","ho":"ほ" },
    "ma": { "ma":"ま","mi":"み","mu":"む","me":"め","mo":"も" },
    "ya": { "ya":"や","yu":"ゆ","yo":"よ" },
    "ra": { "ra":"ら","ri":"り","ru":"る","re":"れ","ro":"ろ" },
    "wa": { "wa":"わ","wo":"を","n":"ん" }
};

// Récupération des lignes choisies dans localStorage
let lignesChoisies = JSON.parse(localStorage.getItem("lignesChoisies")) || ["a"];
let quizChars = [];

// Création du tableau des caractères choisis
function genererQuiz() {
    quizChars = [];
    lignesChoisies.forEach(ligne => {
        for (let key in HIRAGANA[ligne]) {
            quizChars.push({hiragana: HIRAGANA[ligne][key], romaji: key});
        }
    });
    quizChars.sort(() => Math.random() - 0.5);
}

genererQuiz();

let index = 0;
let score = 0;

const charDisplay = document.getElementById("caractere-hiragana");
const input = document.getElementById("reponse");
const scoreDisplay = document.getElementById("score");
const validerBtn = document.getElementById("valider");
const resetBtn = document.getElementById("reset");

// Création d'un élément pour le feedback
let feedback = document.createElement("p");
feedback.id = "feedback";
feedback.style.fontWeight = "600";
feedback.style.marginTop = "10px";
charDisplay.parentNode.insertBefore(feedback, input.nextSibling);

// Affiche le caractère courant
function afficherCaractere() {
    if(index >= quizChars.length){
        // Fin du quiz : cacher input, bouton et feedback
        charDisplay.textContent = "🎉 Quiz terminé !";
        charDisplay.style.fontSize = "3rem";
        charDisplay.style.marginBottom = "20px";
        input.style.display = "none";
        validerBtn.style.display = "none";
        feedback.style.display = "none";
        return;
    }

    // Affiche la question
    charDisplay.textContent = quizChars[index].hiragana;
    charDisplay.style.fontSize = "5rem";
    input.style.display = "inline-block";
    validerBtn.style.display = "inline-block";
    feedback.style.display = "block";

    input.value = "";
    input.focus();
    feedback.textContent = "";
}

// Valider la réponse et passer au suivant
validerBtn.addEventListener("click", function() {
    if(index >= quizChars.length) return;

    let reponseUser = input.value.trim().toLowerCase();
    let reponseCorrecte = quizChars[index].romaji.toLowerCase();

    if(reponseUser === reponseCorrecte) {
        score++;
        feedback.textContent = "✅ Correct !";
        feedback.style.color = "green";
    } else {
        feedback.textContent = `❌ Faux (réponse : ${reponseCorrecte})`;
        feedback.style.color = "red";
    }

    scoreDisplay.textContent = `Score : ${score} / ${quizChars.length}`;

    index++;
    // Pause avant la prochaine question pour voir le feedback
    setTimeout(() => {
        afficherCaractere();
    }, 800);
});

// Reset du quiz
resetBtn.addEventListener("click", function() {
    index = 0;
    score = 0;
    input.disabled = false;
    validerBtn.disabled = false;
    scoreDisplay.textContent = `Score : ${score} / ${quizChars.length}`;

    // Réafficher les éléments du quiz
    input.style.display = "inline-block";
    validerBtn.style.display = "inline-block";
    feedback.style.display = "block";
    charDisplay.style.fontSize = "5rem";

    genererQuiz();
    afficherCaractere();
});

// Initialisation
afficherCaractere();

// Permet de valider en appuyant sur "Entrée"
input.addEventListener("keypress", function(e) {
    if(e.key === "Enter") {
        validerBtn.click();
    }
});