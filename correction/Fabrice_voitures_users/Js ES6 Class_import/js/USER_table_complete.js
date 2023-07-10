"use strict";
//////////////////////////////////////////////////////////
///////			LES IMPORTs
//////////////////////////////////////////////////////////
import { loadHTML } from "./ajax_Class_Html.js";
import { Table } from "./90 Table_ES6.js";

import { Obj_AJAX_users } from "./init_ES6.js";

//////////////////////////////////////////////////////////
///////			LES FONCTIONS
//////////////////////////////////////////////////////////

function generer_alert(type, message) {
  // Pour BS 5
  document.getElementById("message").innerHTML =
    "<div class = 'alert alert-" +
    type +
    " alert-dismissible' ><button type='button' class = 'btn-close' data-bs-dismiss = 'alert' role='alert' aria-label='Close'></button>" +
    message +
    "</div>";
}
///     Fonction déclenchée lorsque l'on click sur VUE
function vueUser(e) {
  //   Fonction qui sera executée lors du click sur le bouton VUE
  let valeurs = e.target.value.split("*");

  document.getElementById("txtcode_vue").value = valeurs[0];
  document.getElementById("txtNom_vue").value = valeurs[1];
  document.getElementById("txtPrenom_vue").value = valeurs[2];
  document.getElementById("txtEmail_vue").value = valeurs[3];
}

///     Fonction déclenchée lorsque l'on click sur MODIF
function modifUser(e) {
  //   Fonction quie sera executée lors du click sur le bouton MODIF
  let valeurs = e.target.value.split("*");

  document.getElementById("txtcode_modif").value = valeurs[0];
  document.getElementById("txtNom_modif").value = valeurs[1];
  document.getElementById("txtPrenom_modif").value = valeurs[2];
  document.getElementById("txtEmail_modif").value = valeurs[3];
}

///     Fonction déclenchée lorsque l'on click sur SUPPR
function supprUser(e) {
  //   Fonction quie sera executée lors du click sur le bouton SUPPR
  let valeurs = e.target.value.split("*");
  let reponse = confirm(
    "Êtes-vous certain de vouloir supprimer cet utilisateur ?"
  );
  if (reponse) {
    Obj_AJAX_users.Cle = valeurs[0]; // Recupération du code à supprimer
    Obj_AJAX_users.del(retourAjaxSuppr, erreur);
  }
}

function Get_zones_ajout() {
  let resultat;

  resultat = "nom=" + document.getElementById("txtnom").value;
  resultat += "&prenom=" + document.getElementById("txtprenom").value;
  resultat += "&email=" + document.getElementById("txtemail").value;
  return resultat;
}

function Get_zones_modif() {
  let resultat;

  resultat = "nom=" + document.getElementById("txtNom_modif").value;
  resultat += "&prenom=" + document.getElementById("txtPrenom_modif").value;
  resultat += "&email=" + document.getElementById("txtEmail_modif").value;
  return resultat;
}

function enregistrer_ajout() {
  let params = Get_zones_ajout();
  Obj_AJAX_users.Cle = "";
  Obj_AJAX_users.post(params, retourAjaxAjout, erreur);
}

function enregistrer_modif(code) {
  let params = Get_zones_modif();

  Obj_AJAX_users.Cle = code;
  Obj_AJAX_users.put(params, RetourAjaxModif, erreur);
}

////////////////////////////////
//    La fonction pour activer la recherche sur la TABLE
////////////////////////////////
function search(saisie, table) {
  let zoneRecherche = document.getElementById(saisie);
  zoneRecherche.addEventListener(
    "keyup",
    () => {
      let rows = document.getElementById(table).getElementsByTagName("tr");
      // console.log(rows);
      for (let item of rows) {
        if (!item.innerText.includes(zoneRecherche.value)) {
          item.classList.add("visually-hidden"); // Classe BS
        } else {
          item.classList.remove("visually-hidden"); // Classe BS
        }
      }
    },
    false
  );
}

//////////////////////////////////////////////////////////
///////			Les fonctions AJAX
//////////////////////////////////////////////////////////
function RetourGetAjax(reponse) {
  // Version améliorée qui gére l'affichage du resultat
  let myObj = JSON.parse(reponse);

  // // Efface la zone et ajoute la zone de recherche
  document.getElementById("zoneTable").innerHTML = "";
  document.getElementById("zoneTable").innerHTML =
    "<div class='form-inline'> <label for='txtRech'>Recherche&nbsp;&nbsp; </label> <input type='text' class='form-control' id='txtRech' name='txtRech' placeholder='saisir le début de votre recherche'>&nbsp; <i class='fas fa-search' id='btnsearch'></i> </div>";

  let tab = new Table();
  tab.id_zone = "zoneTable";
  tab.class_table = "table table-dark table-hover";

  tab.data = myObj.users.records; // Les données à afficher
  tab.header = ["Code", "Nom", "Prénom", "Email"];

  tab.class_modif = "mod_user btn btn-info btn-sm ";
  tab.class_suppr = "suppr_user btn btn-danger btn-sm ";
  tab.class_vue = "vue_user btn btn-success btn-sm ";

  ///////////     BS 5  /////////////////////
  tab.icone_vue = "bi bi-eye";
  tab.icone_modif = "bi bi-pencil";
  tab.icone_suppr = "bi bi-trash3";

  // Les méthodes
  tab.fonction_modif = modifUser;
  tab.fonction_suppr = supprUser;
  tab.fonction_vue = vueUser;

  tab.separateur = "*";

  // Les nouvelles Propriétés de la classe TABLE
  tab.BS_class_modif = "btn btn-info btn-sm";
  tab.BS_class_suppr = "btn btn-danger btn-sm";
  tab.BS_class_vue = "btn btn-success btn-sm";

  // Pour les fenetres MODAL BS
  tab.BS_toggle_modal = {
    // attribut : "data-toggle" ,
    attribut: "data-bs-toggle",
    valeur: "modal",
  };
  tab.BS_target_vue = {
    attribut: "data-bs-target",
    valeur: "#frmVue",
  };

  tab.BS_target_modif = {
    attribut: "data-bs-target",
    valeur: "#frmModif",
  };

  tab.id_tbody = "tliste";
  tab.append = true;

  tab.generer();

  // // Association de la zone de recherche avec la table
  // // Le filtre devient actif
  search("txtRech", "tliste");
}

function retourAjaxAjout(reponse) {
  // Liste des users
  afficher_Liste();
  generer_alert("success", "Element bien ajouté avec le code : " + reponse);
}

function RetourAjaxModif(xhttp) {
  //            document.getElementById("message").innerHTML = "Element supprimé";
  afficher_Liste();
  generer_alert("success", "Element bien modifié");

  // Ferme la fenetre MODAL
  var myModal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("frmModif")
  );
  myModal.hide();
  console.log(myModal);
}

function retourAjaxSuppr(reponse) {
  // Liste des USERS
  afficher_Liste();
  generer_alert("danger", "Element bien supprimé");
}

function erreur(reponse) {
  alert("Erreur Ajax " + reponse);
}

function afficher_Liste() {
  // Liste des USERS
  Obj_AJAX_users.Cle = "";

  Obj_AJAX_users.get(RetourGetAjax, erreur);
}

//////////////////////////////////////////////////////////
///////			PROGRAMME PRINCIPAL
//////////////////////////////////////////////////////////
window.addEventListener("load", (event) => {
  let header = new loadHTML("id-header", "../HEADER_FOOTER/HEADER.html");
  header.load();
  let footer = new loadHTML("id-footer", "../HEADER_FOOTER/FOOTER.html");
  footer.load();

  afficher_Liste();
  generer_alert("info", "Voici la liste des utilisateurs");

  // Listener sur le bouton ENREGISTRER Ajout
  let btn_ajout = document.getElementById("btnAjout");
  btn_ajout.addEventListener("click", enregistrer_ajout, false);

  // Listener sur le bouton ENREGISTRER Modif
  let btnModif_enreg = document.getElementById("btnModif_enreg");
  btnModif_enreg.addEventListener(
    "click",
    () => {
      let code = document.getElementById("txtcode_modif").value;
      enregistrer_modif(code);
    },
    false
  );
});
