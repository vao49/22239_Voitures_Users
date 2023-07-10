export {Table}

class Table {

    code = "";
    marque = "";
    couleur = "";
    cylindree = "";
    data_cars = [];
    id_tbody = "";
    class_tab = "";
    id_zone = "";
    header = "";
    // fonction 
    fonction_ajout = "";
    fonction_vue = "";
    fonction_modifier = "";
    fonction_suppr = "";
    split = "*"
    //icon
    icone_modif = "";
    icone_vue = "";
    icone_suppr = "";
    icone_ajout = "";
    // CLASS 
    class_ajout = "";
    class_modif = "";
    class_suppr = "";
    class_vue = "";
    // class Bootstrap 
    class_vue_bootstrap = "";
    class_modif_bootstrap = "";
    class_suppr_bootstrap = "";
    class_ajout_bootstrap = "";
    // Modal 
    data_toggle = "";
    data_target_vue = "";
    data_target_modif = "";
    data_target_suppr = "";
    data_target_ajout = "";


    generer() {

        if (this.id_zone != "") {
            // Génération de <table>
            let table_genere = document.createElement("table");
            table_genere.className = this.class_tab;

            // Génération de <thead>
            let thead_genere = document.createElement("thead");
            table_genere.appendChild(thead_genere);

            // Génération des colonnes ENTETE
            let tr_head_genere = document.createElement("tr");
            thead_genere.appendChild(tr_head_genere);
            this.header.forEach(th_text => {
                let th_genere = document.createElement("th");
                th_genere.innerText = th_text;
                tr_head_genere.appendChild(th_genere);
            });
            // Si on a reçu des fonctions pour MODIF ou SUPPR ==> ajout du header ACTIONS
            if (this.fonction_modif || this.fonction_suppr || this.fonction_vue) {
                let th_genere = document.createElement("th");
                th_genere.innerText = "Actions";

                // Generation du bouton ajouté
                let btn_genere = document.createElement("button");
                btn_genere.className = this.class_ajout + " " + this.icone_ajout;
                btn_genere.setAttribute(this.data_toggle.attribut, this.data_toggle.valeur);
                btn_genere.setAttribute(this.data_target_ajout.attribut, this.data_target_ajout.valeur);
                btn_genere.innerText = "NEW"

                tr_head_genere.appendChild(th_genere).appendChild(btn_genere);
            }



            // Génération du <tbody>
            let tbody_genere = document.createElement("tbody");
            tbody_genere.id = this.id_tbody;
            table_genere.appendChild(tbody_genere);
            this.data_cars.forEach(ligne => {
                let tr_body_genere = document.createElement("tr");
                tbody_genere.appendChild(tr_body_genere);
                // Génération des cellules de la ligne
                ligne.forEach(cellule => {
                    let td_genere = document.createElement("td");
                    td_genere.innerText = cellule;
                    tr_body_genere.appendChild(td_genere);
                });

                if (typeof this.fonction_vue == "function" || this.fonction_modif == "function" || this.fonction_suppr == "function") {
                    let td_genere = document.createElement("td");
                    tr_body_genere.appendChild(td_genere);

                    let values = ligne.join(this.split);


                    if (typeof this.fonction_vue == "function") {

                        let btn_genere = document.createElement("button");
                        btn_genere.className = this.class_vue + " " + this.icone_vue;
                        btn_genere.value = values;

                        if (this.data_target_vue.valeur != "") {
                            btn_genere.setAttribute(this.data_toggle.attribut, this.data_toggle.valeur);
                            btn_genere.setAttribute(this.data_target_vue.attribut, this.data_target_vue.valeur);
                        }
                        btn_genere.addEventListener("click", this.fonction_vue, false);

                        td_genere.appendChild(btn_genere);
                    }
                    if (typeof this.fonction_modifier == 'function') {

                        let btn_genere = document.createElement("button");
                        btn_genere.className = this.class_modif + " " + this.icone_modif;
                        btn_genere.value = values;

                        if (this.data_target_modif.valeur != "") {
                            btn_genere.setAttribute(this.data_toggle.attribut, this.data_toggle.valeur);
                            btn_genere.setAttribute(this.data_target_modif.attribut, this.data_target_modif.valeur);
                        }
                        btn_genere.addEventListener("click", this.fonction_modifier, false);
                        td_genere.appendChild(btn_genere);
                    }
                    if (typeof this.fonction_suppr == 'function') {
                        let btn_genere = document.createElement("button");
                        btn_genere.className = this.class_suppr + " " + this.icone_suppr;
                        btn_genere.value = values;

                        // if (this.data_target_suppr.valeur != "") {
                        //     btn_genere.setAttribute(this.data_toggle.attribut, this.data_toggle.valeur);
                        //     btn_genere.setAttribute(this.data_target_suppr.attribut, this.data_target_suppr.valeur);
                        // }

                        btn_genere.addEventListener("click", this.fonction_suppr, false);
                        td_genere.appendChild(btn_genere);

                    }
                }
            });


            // La TABLE devint visible dans la ZONE d'affichage
            if (!this.append) {
                document.getElementById(id_zone).innerText = "";
            }
            document.getElementById(this.id_zone).appendChild(table_genere);

        } else {
            throw new Error("Pour générer une table, il faut préciser la proprieté id_zone");
        }
    }
}//
