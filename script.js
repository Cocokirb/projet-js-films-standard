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
        afficherFilms();
        // Réinitialiser le formulaire
        formulaire.reset();
    } 
});

const boutonToutSupprimer = document.getElementById("clear-films");
boutonToutSupprimer.addEventListener("click", function () {
    films = [];
    afficherFilms();
});

// Fonction pour afficher les films dans la liste
function afficherFilms() {
    listeFilms.textContent = "";

    // Vérifier si le tableau de films est vide si oui afficher le message "Aucun film à afficher ""
    if(films.length === 0) {
        const messageAucunFilm = document.createElement("p");
        messageAucunFilm.textContent = "Aucun film enregistré.";
        messageAucunFilm.className = "empty-message";
        listeFilms.appendChild(messageAucunFilm);
        return;

    }else{
    // Parcourir le tableau de films et créer les cases pour chaque film
    for (const film of films) {
        // Créations des balises pour chaque inormations sur le film
        const filmCard = document.createElement("div");
        filmCard.className = "film-item";
        const titreFilm = document.createElement("h2");
        const realisateurElement = document.createElement("p");
        const anneeDureeElement = document.createElement("p");
        const genreElement = document.createElement("p");
        const btnSuppr = document.createElement("button");
        btnSuppr.type = "button";
        btnSuppr.className = "button button-danger";
        btnSuppr.textContent = "Supprimer";
        btnSuppr.addEventListener("click", function () {
            films = films.filter(function (filmActuel) {
                return filmActuel.id !== film.id;
            });

            afficherFilms();
        });

        // Remplissage des balises avec les informations du film
        titreFilm.textContent = film.titre;
        realisateurElement.textContent =
            `Réalisateur : ${film.realisateur}`; 

        anneeDureeElement.textContent =
            `${film.annee} — ${film.duree} min`;

        genreElement.textContent =
            `Genre : ${film.genre}`;
        
        // Ajout des balises au html
        filmCard.appendChild(titreFilm);
        filmCard.appendChild(realisateurElement);
        filmCard.appendChild(anneeDureeElement);
        filmCard.appendChild(genreElement);
        filmCard.appendChild(btnSuppr);
        listeFilms.appendChild(filmCard);
    }
    }
}




