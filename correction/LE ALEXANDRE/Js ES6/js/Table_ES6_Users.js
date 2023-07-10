import { urlApiUser } from './init.js';
import { get } from './ajax_Js_ES6.js'
import { userRetourAjax, userfonction_vue, userfonction_modif, userSuppr, userErreurAjax } from "./main_ES6Users.js";
export { CreaTabUsers };


// Creation tableau Users
function CreaTabUsers(reponse) {

    let myObj = JSON.parse(reponse);

    //creation du tableau 
    let table_genere = document.createElement("table");
    table_genere.className = "table table-dark table-hover";
    document.getElementById("affichage").appendChild(table_genere);

    // Génération de <thead>
    let header = ["Code", "Nom", "Prenom", "Mail"];
    let thead_genere = document.createElement("thead");
    table_genere.appendChild(thead_genere);

    // Génération des colonnes ENTETE
    let tr_head_genere = document.createElement("tr");
    thead_genere.appendChild(tr_head_genere);
    header.forEach(th_text => {
        let th_genere = document.createElement("th");
        th_genere.innerText = th_text;
        tr_head_genere.appendChild(th_genere);
    });

    let th_genere = document.createElement("th");
    th_genere.innerText = "Actions";
    // Bouton ajouté
    let btn_ajout_genere = document.createElement("button");
    btn_ajout_genere.className = "btn btn-success btn-sm fa-solid fa-plus mx-2";
    btn_ajout_genere.setAttribute("data-bs-toggle", "modal");
    btn_ajout_genere.setAttribute("data-bs-target", "#modalAjout");
    btn_ajout_genere.innerText = "NEW"


    tr_head_genere.appendChild(th_genere).appendChild(btn_ajout_genere);

    // Génération du <tbody>
    let tbody_genere = document.createElement("tbody");
    tbody_genere.id = "tliste";
    table_genere.appendChild(tbody_genere);

    myObj.users.records.forEach(ligne => {
        let tbody = document.getElementById("tliste")
        let TRgenere = document.createElement("tr");
        tbody.appendChild(TRgenere);

        //creation cellule du tableau
        ligne.forEach(cellule => {
            let TDgenere = document.createElement("td");
            TDgenere.innerHTML = cellule;
            TRgenere.appendChild(TDgenere);
        });

        let split = "*"
        let values = ligne.join(split)
        // Bouton Vue
        let btn_vue_genere = document.createElement("button");
        btn_vue_genere.className = "btn btn-success btn-sm fa-solid fa-eye";
        btn_vue_genere.setAttribute("data-bs-toggle", "modal");
        btn_vue_genere.setAttribute("data-bs-target", "#modalVue");
        btn_vue_genere.value = values;
        btn_vue_genere.addEventListener("click", userfonction_vue, false);

        // Bouton Modifier
        let btn_modif_genere = document.createElement("button");
        let TD_Btngenere = document.createElement("td");
        btn_modif_genere.className = "btn btn-info btn-sm fa-solid fa-pencil mx-2";
        btn_modif_genere.setAttribute("data-bs-toggle", "modal");
        btn_modif_genere.setAttribute("data-bs-target", "#modalModif");
        btn_modif_genere.value = values;
        btn_modif_genere.addEventListener("click", userfonction_modif, false);

        // Bouton Supprimer
        let btn_suppr_genere = document.createElement("button");
        btn_suppr_genere.className = "btn btn-danger btn-sm fa-solid fa-trash-can";
        btn_suppr_genere.value = values;
        btn_suppr_genere.addEventListener("click", userSuppr, false);

        TD_Btngenere.appendChild(btn_vue_genere);
        TD_Btngenere.appendChild(btn_modif_genere);
        TRgenere.appendChild(TD_Btngenere).appendChild(btn_suppr_genere)

        get(urlApiUser, userRetourAjax, userErreurAjax);
    });
}; //