console.log("Le fichier JavaScript est chargé");


const formulaire = document.getElementById("film-form");
const listeFilms = document.getElementById("films-list");

// Valeurs des champs du formulaire
const titreChamp = document.getElementById("titre");
const realisateurChamp = document.getElementById("realisateur");
const anneeChamp = document.getElementById("annee");
const dureeChamp = document.getElementById("duree");
const genreChamp = document.getElementById("genre");

// Messages d'erreur
const titreErreur = document.getElementById("titre-error");
const realisateurErreur = document.getElementById("realisateur-error");
const anneeErreur = document.getElementById("annee-error");
const dureeErreur = document.getElementById("duree-error");
const genreErreur = document.getElementById("genre-error");

// Tableau pour stocker les films
let films = [] ;

// Vérification du formulaire avant l'envoi
formulaire.addEventListener("submit", function (event) {
    event.preventDefault();

    // Récupération des valeurs des champs du formulaire
    const titre = titreChamp.value.trim();
    const realisateur = realisateurChamp.value.trim();
    const annee = Number(anneeChamp.value);
    const duree = Number(dureeChamp.value);
    const genre = genreChamp.value;

    // Effacer les messages d'erreur précédents
    titreErreur.textContent = "";
    realisateurErreur.textContent = "";
    anneeErreur.textContent = "";
    dureeErreur.textContent = "";
    genreErreur.textContent = "";

    const anneeActuelle = new Date().getFullYear();
    let formValide = true;

    //Vérification des champs du formulaire
    if(titre.length < 2 ) {
        titreErreur.textContent = "Le titre doit contenir au moins 2 caractères.";
        formValide = false;
    }
    if(realisateur.length < 2 ) {
        realisateurErreur.textContent = "Le nom du réalisateur doit contenir au moins 2 caractères.";
        formValide = false;
    }
    if(!Number.isInteger(annee) || annee < 1895 || annee > anneeActuelle) {
        anneeErreur.textContent = "L'année doit être comprise entre 1895 et " + anneeActuelle + ".";
        formValide = false;

    }
    if(duree <= 0 || !Number.isInteger(duree)) {
        dureeErreur.textContent = "La durée doit être un nombre positif.";
        formValide = false;
    }
    if(genre === "" || genre === "-- Choisir un genre --") {
        genreErreur.textContent = "Le genre est obligatoire.";
        formValide = false;
    }
    if(!formValide) {
        return;
        
    }else{
        // Ajouter le film au tableau
        films.push({ id: Date.now(),
            titre: titre,
            realisateur: realisateur,
            annee: annee,
            duree: duree,
            genre: genre});
        // Réinitialiser le formulaire
        formulaire.reset();
    } 

    console.log(films);
}   
);



