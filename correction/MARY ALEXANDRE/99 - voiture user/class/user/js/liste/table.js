class Table {
    constructor(){
        this.id_zone = "";
        this.class_table = "";
        this.data = "";
        this.header = "";
        this.class_modif = "";
        this.class_supp = "";
        this.class_vue = "";
        this.icone_modif = "btn btn-info btn-sm fas fa-pencil-alt fa-sm";
        this.icone_vue = "btn btn-success btn-sm fas fa-eye fa-sm";
        this.icone_suppr = "btn btn-danger btn-sm fas fa-trash-alt fa-sm";
        this.separateur = "*";
        this.BS_class_vue = "";
        this.BS_class_modif = "";
        this.BS_class_suppr = "";
        this.BS_toggle_modal = {
            attribut : "data-bs-toggle",
            value : "modal"
        };
        this.BS_target_vue = {
            attribut : "data-bs-target",
            value : "#frmVue"
        };
        this.BS_target_modif = {
            attribut : "data-bs-target",
            value : "#frmModif"
        };
        this.BS_target_suppr = {
            attribut : "data-bs-target",
            value : "#frmSupp"
        };
        this.id_tbody = "";
        this.append = false;
    
        this.fonction_modif = "";
        this.fonction_vue = "";
        this.fonction_suppr = "";

    }



    generer() {
        if (!this.id_zone == "") {

            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].length == this.header.length) {

                } else {
                    throw new Error("La dimensions du tableau ne correspond pas .");
                }

            }
            console.log("la dimensions du tableau correspond.")
        } else {
            throw new Error("Pour générer une table, il faut préciser la proprieté id_zone ");
        }

        // append ajouter true/ clearfalse
        if (!this.append) {
            document.getElementById(this.id_zone).innerHTML = ""
        }
        // tableau a générer 
        let tableau = document.createElement('table')
        // debut entete
        tableau.className = this.class_table
        for (let i = 0; i < 1; i++) {
            let tr = document.createElement('tr');
            let thead = document.createElement('thead');
            for (let j = 0; j < this.header.length; j++) {
                let thead = document.createElement('th');
                thead.innerText = this.header[j];
                tr.appendChild(thead);
            };
            if ((typeof this.fonction_modif == "function") || (typeof this.fonction_vue == "function") || (typeof this.fonction_suppr == "function")) {
                let action = document.createElement('th');
                action.setAttribute("colspan", 3);
                tr.appendChild(action).append('ACTION')
            }

            
            tableau.appendChild(thead).appendChild(tr);
        }
        // fin entete
        // debut table body
        let tbody = document.createElement('tbody');
        tbody.id = this.id_tbody
        for (let i = 0; i < this.data.length; i++) {
            let tr = document.createElement('tr');

            for (let j = 0; j < this.data[i].length; j++) {
                let td = document.createElement('td')
                td.innerHTML = this.data[i][j]
                tr.appendChild(td)
            }
            // fin tbody
            // debut bouton
            let modif = document.createElement('button');
            let vue = document.createElement('button')
            let supp = document.createElement('button')
            let td = document.createElement('td');

            // bouton vue 
            if (!this.class_vue == "") {
                if (typeof this.fonction_vue == "function") {
                    vue.addEventListener('click',this.fonction_vue,false);
                    vue.type = "button";
                    vue.className = this.class_vue + " " + this.icone_vue;
                    vue.setAttribute(this.BS_toggle_modal.attribut, this.BS_toggle_modal.value)
                    vue.setAttribute(this.BS_target_vue.attribut, this.BS_target_vue.value)
                    for (let j = 0; j < this.data[i].length; j++) {
                        vue.value += this.data[i][j] 
                        vue.value += this.separateur;
                    }
                    
                    td.appendChild(document.createTextNode('\u00A0'));
                    tbody.appendChild(tr).appendChild(td).appendChild(vue);
                }
            }
            // bouton modifier 
            if (!this.class_modif == "") {
                if (typeof this.fonction_modif == "function") {
                    modif.addEventListener('click',this.fonction_modif,false);
                    modif.type = "button";
                    modif.className = this.class_modif + " " + this.icone_modif;
                    modif.setAttribute(this.BS_toggle_modal.attribut, this.BS_toggle_modal.value)
                    modif.setAttribute(this.BS_target_modif.attribut, this.BS_target_modif.value)
                    for (let j = 0; j < this.data[i].length; j++) {
                        modif.value += this.data[i][j] 
                        modif.value += this.separateur;
                    }
                    td.appendChild(document.createTextNode('\u00A0'));
                    tbody.appendChild(tr).appendChild(td).appendChild(modif);
                }

            }
            // bouton supprimer
            if (!this.class_supp == "") {
                if (typeof this.fonction_suppr == "function") {
                    supp.addEventListener('click',this.fonction_suppr,false);
                    supp.type = "button";
                    supp.className = this.class_supp + " " + this.icone_suppr;
                    supp.setAttribute(this.BS_toggle_modal.attribut, this.BS_toggle_modal.value)
                    supp.setAttribute(this.BS_target_suppr.attribut, this.BS_target_suppr.value)
                    for (let j = 0; j < this.data[i].length; j++) {
                        supp.value += this.data[i][j] 
                        supp.value += this.separateur;
                    }
                    td.appendChild(document.createTextNode('\u00A0'));
                    tbody.appendChild(tr).appendChild(td).appendChild(supp);
                }

            }

            tableau.appendChild(tbody).appendChild(tr)
        }


        document.getElementById(this.id_zone).appendChild(tableau);
        // fin tableau
    }
    // Fin generer 
}

export {Table}