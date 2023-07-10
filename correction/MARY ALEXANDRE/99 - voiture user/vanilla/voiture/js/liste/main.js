//////////////////////////////////
////    Les imports            ///
//////////////////////////////////
import {url_ajax_Es6 as url} from './init.js'
import {get, post, put, del} from './ajax_Js_ES6.js'
import {Table} from './table.js'


function modifStag(e) {
    let valeurs = e.target.value.split("*");
    document.getElementById('code_modif').value = valeurs[0];
    document.getElementById('marque_modif').value = valeurs[1];
    document.getElementById('couleur_modif').value = valeurs[2];
    document.getElementById('cylindree_modif').value = valeurs[3];
  }

  function supprStag(e) {
    let valeurs = e.target.value.split("*");
    document.getElementById('code_supp').value = valeurs[0];
    document.getElementById('marque_supp').value = valeurs[1];
    document.getElementById('couleur_supp').value = valeurs[2];
    document.getElementById('cylindree_supp').value = valeurs[3];
  }

  function vueStag(e) {
    let valeurs = e.target.value.split("*");
    document.getElementById('code_vue').value = valeurs[0];
    document.getElementById('marque_vue').value = valeurs[1];
    document.getElementById('couleur_vue').value = valeurs[2];
    document.getElementById('cylindree_vue').value = valeurs[3];
  }
  function RetourAjax(reponse) {
    // // On affiche le resultat
    let myObj = JSON.parse(reponse);
    let tab = new Table();
    let n = false;
    console.log(myObj);

    tab.id_zone = "reponse";
    tab.class_table = "table table-dark table-striped table-hover";
    tab.header = myObj.voitures.columns;
    tab.data = myObj.voitures.records;
    tab.fonction_modif = modifStag;
    tab.fonction_suppr = supprStag;
    tab.fonction_vue = vueStag;
    tab.class_modif = "mod_stag";
    tab.class_supp = "suppr_stag";
    tab.class_vue = "vue_stag";
    tab.id_tbody = "body"

    tab.generer();

  }

  function retourAjout(reponse) {
    document.getElementById('balert').innerHTML = '<div id="balert" class="alert alert-success" role="alert">Voiture correctement ajouté code : ' + reponse + ' !</div>'
    // Liste des voitures
    get(url, RetourAjax, erreur);
  }

  function retourModif(reponse) {
    document.getElementById('balert').innerHTML = '<div class="alert alert-success" role="alert">Element correctement modifié</div>'
    // Liste des voitures
    get(url, RetourAjax, erreur);
  }

  function retourSuppr(reponse) {
    document.getElementById('balert').innerHTML = '<div id="balert" class="alert alert-danger" role="alert">Voiture correctement supprimé !</div>'
    // Liste des voitures
    get(url, RetourAjax, erreur);
  }

  function erreur(reponse) {
    alert("Erreur Ajax");
  }
  function erreurshearch(reponse) {
    document.getElementById('balert').innerHTML = '<div id="balert" class="alert alert-danger" role="alert">Code introuvable : '+document.getElementById('code').value +' !</div>'
  }
  function affichage() {
    document.getElementById('balert').innerHTML = '<div class="alert alert-info" role="alert">Voici la liste des voitures</div>'
  }

  function erreursupp(){
    document.getElementById('balert').innerHTML = '<div class="alert alert-success" role="alert">Voiture Supprimé</div>'
  }
  

  function getelement(){
    get(url, RetourAjax, erreur)
  }

  // Programme PRINCIPAL
  window.addEventListener('load', (event) => {
    affichage()
    get(url, RetourAjax, erreur);


    document.getElementById('btnmodif').addEventListener('click', () => {
      let code = document.getElementById('code_modif').value;
      let data = {};
        data.marque = document.getElementById('marque_modif').value;
        data.couleur = document.getElementById('couleur_modif').value;
        data.cylindree = document.getElementById('cylindree_modif').value;
      
      put(url + "/"+code, JSON.stringify(data), retourModif, erreur);
    }, false)


    document.getElementById('btnsupp').addEventListener('click', () => {
      if (confirm('Voulez vous vraiment supprimer cette voiture?')) {
        let code = document.getElementById('code_supp').value;
        del(url + "/" +code, retourSuppr, erreursupp);
      } else{
        alert('Suppression annulé')
      }
    }, false)


    document.getElementById('code').addEventListener('keyup', (e) => {
      let searchInput = document.querySelector('#code');
      let rows = document.querySelectorAll('tbody tr');
      let q = e.target.value.toLowerCase();
      rows.forEach((row) =>{
        row.querySelector('td').innerText.toLowerCase().startsWith(q)
        if (!row.innerText.includes(searchInput.value)) {
          row.classList.add("visually-hidden") // Classe BS
        } else {
          row.classList.remove("visually-hidden") // Classe BS
        }
      })
  });

    document.getElementById('btn-ajout').addEventListener('click', () => {
      if ((document.getElementById('marque_ajout').value == "") || (document.getElementById('couleur_ajout').value == "") || (document.getElementById('cylindreev').value == "")) {
        alert('Remplir tous les champs !')
        document.getElementById('balert').innerHTML = ""
        document.getElementById('balert').innerHTML = '<div id="balert" class="alert alert-danger" role="alert">Remplir tous les champs !</div>'
      } else {
        let data = {};
        data.marque = document.getElementById('marque_ajout').value;
        data.couleur = document.getElementById('couleur_ajout').value;
        data.cylindree = document.getElementById('cylindreev').value;
                console.log("Les valeurs envoyées : " + JSON.stringify(data));
        document.getElementById('balert').innerHTML = ""
        document.getElementById('balert').innerHTML = '<div id="balert" class="alert alert-success" role="alert">Voiture ajouté !</div>'
                post(url, JSON.stringify(data), getelement, erreur);
      }

    }, false)
  });