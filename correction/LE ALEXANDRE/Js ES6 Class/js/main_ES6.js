import { ajax_voiture} from './init_ES6.js';
import { Table } from './Table_ES6.js';

function AppelAjax() {
    let affichage = document.getElementById("affichage");
    affichage.innerHTML = "";
    ajax_voiture.Cle = "";
    // Recupération de l'Url
    ajax_voiture.get(RetourAjax, ErreurAjax);
};

function RetourAjax(reponse) {
    let myObj = JSON.parse(reponse);

    let tab = new Table();

    tab.id_zone = "affichage";
    tab.class_tab = "table table-dark table-hover";

    tab.header = ["Code", "Marque", "Couleur", "Cylindrée"];
    tab.data_cars = myObj.voitures.records;

    // Bouttons 
    tab.class_vue = "btn btn-success btn-sm ";
    tab.class_modif = "btn btn-info btn-sm";
    tab.class_suppr = "btn btn-danger btn-sm ";
    tab.class_ajout = "btn btn-success btn-sm";

    // icon button
    tab.icone_vue = "fa-solid fa-eye";
    tab.icone_modif = "fa-solid fa-pencil mx-2";
    tab.icone_suppr = "fa-solid fa-trash-can";
    tab.icone_ajout = "fa-solid fa-plus mx-2";


    // Les méthodes
    tab.fonction_modifier = fonction_modif;
    tab.fonction_suppr = Suppr;
    tab.fonction_vue = fonction_vue;

    // Pour les fenetres MODAL BS
    tab.data_toggle = {
        // attribut : "data-toggle" ,
        attribut: "data-bs-toggle",
        valeur: "modal"
    };
    tab.data_target_vue = {
        attribut: "data-bs-target",
        valeur: "#modalVue"
    };

    tab.data_target_modif = {
        attribut: "data-bs-target",
        valeur: "#modalModif"
    };

    tab.data_target_ajout = {
        attribut: "data-bs-target",
        valeur: "#modalAjout"
    };

    tab.id_tbody = "tliste";
    tab.append = true;

    tab.generer();

};


function Suppr(e) {
    // alert("Etes-vous certain de vouloir supprimer cette voiture ?")
    if (window.confirm("Etes-vous certain de vouloir supprimer cette voiture ?")) {
        let valeur = e.target.value.split("*");
        let code_voiture = valeur[0];
        ajax_voiture.Cle = code_voiture;

        // Recupération de l'Url
        ajax_voiture.del(retourSuppr, ErreurAjax);
    }
};

function retourSuppr(reponse) {
    // alert("Suppr OK : " + reponse);
    let affichage = document.getElementById("zone_alert");
    affichage.innerHTML = "";
    affichage.className = "alert alert-danger alert-dismissible fade show"
    affichage.setAttribute("role", "alert");
    affichage.innerHTML = "Element supprimé";

    // ajout du bouton fermer 
    let buttonclose = document.createElement("button");
    buttonclose.setAttribute("type", "button");
    buttonclose.className = "btn-close";
    buttonclose.setAttribute("data-bs-dismiss", "alert");

    affichage.appendChild(buttonclose);
    ajax_voiture.Cle = "";
    ajax_voiture.get(AppelAjax, ErreurAjax);
};

function ErreurAjax() {
    alert("Erreur Ajax")
}

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

function Modif() {
    let data = {
        marque: document.getElementById("marque_modif").value,
        couleur: document.getElementById("couleur_modif").value,
        cylindree: document.getElementById("cylindree_modif").value,
    };

    let code_voiture = document.getElementById("code_modif").value;
    ajax_voiture.Cle = code_voiture;
    // Recupération de l'Url
    ajax_voiture.put(JSON.stringify(data), retourModif, ErreurAjax);
    console.log(JSON.stringify(data));
};

function retourModif(reponse) {
    // alert("Voiture bien modifiée / code = " + reponse);

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

    ajax_voiture.get(AppelAjax, ErreurAjax);
};

function Ajout() {
    let data = {
        marque: document.getElementById("marque_ajout").value,
        couleur: document.getElementById("couleur_ajout").value,
        cylindree: document.getElementById("cylindree_ajout").value,
    };
    ajax_voiture.post(JSON.stringify(data), retourAjout, ErreurAjax);
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

    ajax_voiture.get(AppelAjax, ErreurAjax);
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

    AppelAjax();
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

    // bouton modal 
    document.getElementById("btn-modif").addEventListener("click", Modif, false);
    document.getElementById("btn-ajouter").addEventListener("click", Ajout, false);
});