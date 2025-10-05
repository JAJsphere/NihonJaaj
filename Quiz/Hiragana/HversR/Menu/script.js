document.getElementById("start-quiz").addEventListener("click", function() {
    const cases = document.querySelectorAll(".lignes-hiragana input:checked");
    if(cases.length === 0){
        alert("Sélectionne au moins une ligne !");
        return;
    }

    // Stocke les lignes choisies dans le localStorage
    const lignesChoisies = Array.from(cases).map(c => c.value);
    localStorage.setItem("lignesChoisies", JSON.stringify(lignesChoisies));

    // Redirige vers la page du quiz
    window.location.href = "quiz.html";
});