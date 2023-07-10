import { urlApi } from './init.js';
import { CreaTab } from './80 Table_ES6.js'
import { get, post, put, del } from './ajax_Js_ES6.js';
export { RetourAjax, fonction_vue, fonction_modif, Suppr, ErreurAjax };

function AppelAjax(reponse) {
    let affichage = document.getElementById("affichage");
    affichage.innerHTML = "";
    // Recupération de l'Url
    get(urlApi, CreaTab, ErreurAjax);
};

function RetourAjax(reponse) {
    let myObj = JSON.parse(reponse);
    console.log("Success " + myObj);
};

// Methodes 
function fonction_vue(e) {
    let valeur = e.target.value.split("*");
    document.getElementById("code_vue").value = valeur[0];
    document.getElementById("marque_vue").value = valeur[1];
    document.getElementById("couleur_vue").value = valeur[2];
    document.getElementById("cylindree_vue").value = valeur[3];
};

function fonction_modif(e) {
    let valeur = e.target.value.split("*");
    document.getElementById("code_modif").value = valeur[0];
    document.getElementById("marque_modif").value = valeur[1];
    document.getElementById("couleur_modif").value = valeur[2];
    document.getElementById("cylindree_modif").value = valeur[3];
};

// fonction mofifié
function Modif(reponse) {
    let data = {
        marque: document.getElementById("marque_modif").value,
        couleur: document.getElementById("couleur_modif").value,
        cylindree: document.getElementById("cylindree_modif").value,
    };

    let code_voiture = '/' + document.getElementById("code_modif").value;
    // Recupération de l'Url
    put(urlApi + code_voiture, JSON.stringify(data), retourModif, ErreurAjax);

};

function retourModif(reponse) {
    // alert("Voiture bien modifiée / code = " + reponse);
    // alert 
    let affichage = document.getElementById("zone_alert");
    affichage.innerHTML = "";
    affichage.className = "alert alert-info alert-dismissible fade show";
    affichage.setAttribute("role", "alert");
    affichage.innerHTML = "Element bien modifiée";

    // ajout du bouton fermer 
    let buttonclose = document.createElement("button");
    buttonclose.setAttribute("type", "button");
    buttonclose.className = "btn-close";
    buttonclose.setAttribute("data-bs-dismiss", "alert");

    affichage.appendChild(buttonclose);

    get(urlApi, AppelAjax, ErreurAjax);
};

// fonction ajouté
function Ajout(reponse) {
    let data = {
        marque: document.getElementById("marque_ajout").value,
        couleur: document.getElementById("couleur_ajout").value,
        cylindree: document.getElementById("cylindree_ajout").value,
    };
    post(urlApi, JSON.stringify(data), retourAjout, ErreurAjax);
};

function retourAjout(reponse) {
    // alert("Voiture bien ajouté / code = " + reponse);
    let affichage = document.getElementById("zone_alert");
    affichage.innerHTML = "";
    affichage.className = "alert alert-success alert-dismissible fade show"
    affichage.setAttribute("role", "alert");
    affichage.innerHTML = "Element bien ajouté avec le code :" + reponse;

    // ajout du bouton fermer 
    let buttonclose = document.createElement("button");
    buttonclose.setAttribute("type", "button");
    buttonclose.className = "btn-close";
    buttonclose.setAttribute("data-bs-dismiss", "alert");

    affichage.appendChild(buttonclose);

    get(urlApi, AppelAjax, ErreurAjax);
}

// fonction supprimer 
function Suppr(e) {
    // alert("Etes-vous certain de vouloir supprimer cette voiture ?")
    if (window.confirm("Etes-vous certain de vouloir supprimer cette voiture ?")) {
        let valeur = e.target.value.split("*");
        let code_voiture = '/' + valeur[0];
        // Recupération de l'Url
        del(urlApi + code_voiture, retourSuppr, ErreurAjax);
    }
};

function retourSuppr(reponse) {
    // alert("Suppr OK : " + reponse);
    let affichage = document.getElementById("zone_alert");
    affichage.innerHTML = "";
    affichage.className = "alert alert-danger alert-dismissible fade show"
    affichage.setAttribute("role", "alert");
    affichage.innerHTML = "Element bien supprimé";

    // ajout du bouton fermer 
    let buttonclose = document.createElement("button");
    buttonclose.setAttribute("type", "button");
    buttonclose.className = "btn-close";
    buttonclose.setAttribute("data-bs-dismiss", "alert");

    affichage.appendChild(buttonclose);

    get(urlApi, AppelAjax, ErreurAjax);
};


function ErreurAjax(reponse) {
    // Ecrire le resultat dans la zone d'affichage
    // let affichage = document.getElementById("erreur");
    // affichage.innerHTML = "Erreur dans la requete";
    alert("Erreur Ajax")
};

function chargement_liste() {
    // Alert affichage  "Voici la liste des vehicules"
    let buttonclose = document.createElement("button");
    let Monalert = document.getElementById("zone_alert");
    Monalert.innerHTML = "";
    Monalert.className = "alert alert-success alert-dismissible fade show";
    Monalert.setAttribute("role", "alert");
    Monalert.innerHTML = "Voici la liste des vehicules";

    // ajout du bouton fermer 
    buttonclose.setAttribute("type", "button");
    buttonclose.className = "btn-close";
    buttonclose.setAttribute("data-bs-dismiss", "alert");

    Monalert.appendChild(buttonclose);
};


// Se déclenche lorsque TOUTE LA PAGE est chargée (Style, images etc..)
window.addEventListener('load', (event) => {
    // Le code de PROGRAMME PRINCIPAL
    AppelAjax()
    chargement_liste();

    // Recherche 
    document.getElementById("zoneRech").addEventListener("keyup", () => {
        let rows = document.getElementById("tliste").getElementsByTagName("tr");
        for (let item of rows) {
            if (!item.innerText.includes(document.getElementById("zoneRech").value)) {
                item.classList.add("visually-hidden") // Classe BS
            } else {
                item.classList.remove("visually-hidden") // Classe BS
            }
        }
    }, false);

    document.getElementById("btn-modif").addEventListener("click", Modif, false);
    document.getElementById("btn-ajouter").addEventListener("click", Ajout, false);

});