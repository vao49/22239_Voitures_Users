"use strict";

import { urlApi } from "../../Js ES6/js/Init_Users.js";
import { Ajax_Es6 } from "./Ajax_class.js";
import { Table } from "../../Js ES6/js/classTable.js";
import { search, displayAlert } from "../../Js ES6/js/functions.js";

function createNew() {
  document.getElementById("validationAddBtn").addEventListener(
    "click",
    () => {
      let obj = {
        // id: document.getElementById('addID0').value,
        nom: document.getElementById("addID1").value,
        prenom: document.getElementById("addID2").value,
        email: document.getElementById("addID3").value,
      };
      obj = JSON.stringify(obj);
      let AjaxObj = new Ajax_Es6(urlApi);
      bootstrap.Modal.getInstance(document.getElementById("modalAdd")).hide();
      // post(urlApi + '/' + targetValue[0], obj, modSucces, error);
      AjaxObj.post(obj, addSucces, error);
    },
    false
  );
}

function modUser(event) {
  let targetValue = event.target.value.split("*");
  for (let i = 0; i < targetValue.length; i++) {
    document.getElementById(String("modifID" + i)).value = targetValue[i];
  }
  document.getElementById("validationModifBtn").addEventListener(
    "click",
    () => {
      let obj = {
        id: document.getElementById("modifID0").value,
        nom: document.getElementById("modifID1").value,
        prenom: document.getElementById("modifID2").value,
        email: document.getElementById("modifID3").value,
      };
      obj = JSON.stringify(obj);
      let AjaxObj = new Ajax_Es6(urlApi + "/" + targetValue[0]);
      AjaxObj.put(obj, modSucces, error);
    },
    false
  );
}

function delUser(event) {
  let targetValue = event.target.value.split("*");
  for (let i = 0; i < targetValue.length; i++) {
    document.getElementById(String("delID" + i)).value = targetValue[i];
  }
  document.getElementById("validationDelBtn").addEventListener(
    "click",
    () => {
      let AjaxObj = new Ajax_Es6(urlApi + "/" + targetValue[0]);
      AjaxObj.del((response) => {
        bootstrap.Modal.getInstance(document.getElementById("modalDel")).hide();
        displayAlert(
          "outcome",
          '<p class="alert alert-success" role="alert"><span class="me-1 icon-check"></span>Utilisateur n°' +
            targetValue[0] +
            " supprimé avec succès!</p>",
          targetValue[0]
        );
        // alert('Voiture ' + targetValue[0] + ' supprimée avec succès!');
        // location.reload();
        fetchAPI();
      }, error);
    },
    false
  );
}

function viewUser(event) {
  let targetValue = event.target.value.split("*");
  for (let i = 0; i < targetValue.length; i++) {
    document.getElementById(String("viewID" + i)).value = targetValue[i];
  }
  document.getElementById("validationViewBtn").addEventListener(
    "click",
    () => {
      bootstrap.Modal.getInstance(document.getElementById("modalView")).hide();
    },
    false
  );
}

function display(data, title) {
  let tab = new Table("output", "table table-dark table-striped");
  tab.header = title;
  tab.data = data;
  tab.modalClass = "form-group mb-1";
  tab.modalClassLabel = "me-2";
  tab.class_modif = "modCarClass";
  tab.class_suppr = "delCarClass";
  tab.class_vue = "viewCarClass";
  tab.icone_modif = "icon-cog2";
  tab.icone_suppr = "icon-trash2";
  tab.icone_vue = "icon-eye2";
  tab.cellClass = "align-middle";
  tab.separateur = "*";
  tab.fonction_modif = modUser;
  tab.fonction_suppr = delUser;
  tab.fonction_vue = viewUser;
  tab.BS_toggle_modal = { attribut: "data-bs-toggle", valeur: "modal" };
  tab.BS_target_modif = { attribut: "data-bs-target", valeur: "#modalModif" };
  tab.BS_target_suppr = { attribut: "data-bs-target", valeur: "#modalDel" };
  tab.BS_target_vue = { attribut: "data-bs-target", valeur: "#modalView" };
  tab.id_tbody = "tliste";
  try {
    tab.generer();
  } catch (e) {
    console.error(e);
  }
}

function store(obj) {
  let data = [];
  let title = [];
  for (let i = 0; i < obj.users.records.length; i++) {
    data.push(obj.users.records[i]);
  }
  for (let i = 0; i < obj.users.columns.length; i++) {
    title.push(obj.users.columns[i].capitalize());
  }
  display(data, title);
}

function goFetch(response) {
  let myObj = JSON.parse(response);
  console.log("Successfully find " + myObj);
  store(myObj);
}

function modSucces() {
  bootstrap.Modal.getInstance(document.getElementById("modalModif")).hide();
  displayAlert(
    "outcome",
    '<p class="alert alert-success" role="alert"><span class="me-1 icon-check"></span>Utilisateur modifié avec succès!</p>'
  );
  // alert('Voiture modifiée avec succès');
  fetchAPI();
  // location.reload();
}

function addSucces() {
  bootstrap.Modal.getInstance(document.getElementById("modalAdd")).hide();
  displayAlert(
    "outcome",
    '<p class="alert alert-success" role="alert"><span class="me-1 icon-check"></span>Utilisateur ajouté avec succès!</p>'
  );
  // alert('Voiture ajoutée avec succès');
  fetchAPI();
  // location.reload();
}

function error(response) {
  displayAlert(
    "outcome",
    '<p class="alert alert-danger" role="alert"><span class="me-2 icon-warning"></span>Error Ajax</p>'
  );
  // alert('Erreur Ajax');
}

function fetchAPI() {
  let AjaxObj = new Ajax_Es6(urlApi);
  AjaxObj.get(goFetch, error);
}

window.addEventListener("load", (event) => {
  fetchAPI();
  search("searchInput", "tliste");
  document
    .getElementById("addNewBtn")
    .addEventListener("click", createNew, false);
});
