export class Table {

  id_zone = '';
  class_table = '';
  data = '';
  header = '';
  class_modif = '';
  class_suppr = '';
  class_vue = '';
  icone_modif = '';
  icone_suppr = '';
  icone_vue = '';
  separateur = '';
  fonction_modif = '';
  fonction_suppr = '';
  fonction_vue = '';
  BS_class_vue = '';
  BS_class_modif = '';
  BS_class_suppr = '';
  BS_toggle_modal = '';
  BS_target_vue = '';
  BS_target_modif = '';
  BS_target_suppr = '';
  modalClass = '';
  modalClassLabel = '';
  id_tbody = '';
  append = '';

  constructor(idZone, classTable) {
    this.id_zone = idZone;
    this.class_table = classTable;
    this.data = '';
    this.header = '';
    this.class_modif = '';
    this.class_suppr = '';
    this.class_vue = '';
    this.icone_modif = '';
    this.icone_suppr = '';
    this.icone_vue = '';
    this.separateur = '';
    this.fonction_modif = '';
    this.fonction_suppr = '';
    this.fonction_vue = '';
    this.cellClass = '';
    this.BS_class_vue = '';
    this.BS_class_modif = '';
    this.BS_class_suppr = '';
    this.BS_toggle_modal = { attribut: 'data-bs-toggle', valeur: 'modal' };
    this.BS_target_vue = { attribut: 'data-bs-target', valeur: '' };
    this.BS_target_modif = { attribut: 'data-bs-target', valeur: '' };
    this.BS_target_suppr = { attribut: 'data-bs-target', valeur: '' };
    this.modalClass = '';
    this.modalClassLabel = '';
    this.id_tbody = '';
    this.append = false;
  }

  generer() {
    if (this.id_zone === undefined || this.id_zone === '' || this.id_zone === null) { throw 'Pour générer une table, il faut préciser la proprieté id_zone'; }
    else {
      this.id_zone = String(this.id_zone);
      let isEqual = true;
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].length != this.header.length) {
          isEqual = false;
          i++;
          throw "Le nombre d'éléments dans le sous-tableau " + i + ": [" + this.data[i] + "] ne correspond pas au nombre de colonne défini lors de la déclaration des th (Table.header)";
        }
      }
      if (isEqual) {
        let htmlZone = document.getElementById(this.id_zone);
        let table = document.createElement('table');
        table.className = this.class_table;
        let thead = document.createElement('thead');
        table.appendChild(thead);
        let tr = document.createElement('tr');
        thead.appendChild(tr);
        this.header.forEach(h => {
          let th = document.createElement('th');
          th.innerText = h;
          th.className = this.cellClass;
          tr.appendChild(th);
        });
        if (this.fonction_modif || this.fonction_suppr || this.fonction_vue) {
          let th = document.createElement('th');
          th.innerText = 'Actions';
          th.className = this.cellClass;
          tr.appendChild(th);
        }
        document.getElementById('viewEntry').innerHTML = '';
        document.getElementById('modEntry').innerHTML = '';
        document.getElementById('delEntry').innerHTML = '';
        let index = 0;
        let tbody = document.createElement('tbody');
        tbody.id = this.id_tbody;
        table.appendChild(tbody);
        this.data.forEach(d => {
          let tr = document.createElement('tr');
          tbody.appendChild(tr);
          d.forEach(cell => {
            let td = document.createElement('td');
            td.innerText = cell;
            td.className = this.cellClass;
            tr.appendChild(td);
          });
          let instance = this;
          let l = instance.header.length;
          if ((typeof instance.fonction_modif === 'function') || (typeof instance.fonction_suppr === 'function') || (typeof instance.fonction_vue === 'function')) {
            let td = document.createElement('td');
            tr.appendChild(td);
            let data = d.join(instance.separateur);
            if (typeof instance.fonction_vue === 'function') {
              let btn = document.createElement('button');
              btn.className = instance.class_vue + ' ' + instance.BS_class_vue + ' ' + instance.icone_vue;
              btn.value = data;
              if (index < l) {
                let div = document.createElement('div');
                div.className = this.modalClass;
                let label = document.createElement('label');
                label.className = instance.modalClassLabel;
                label.innerText = instance.header[index] + ':';
                label.htmlFor = 'viewID' + index;
                div.appendChild(label);
                let input = document.createElement('input');
                input.type = 'text';
                input.id = 'viewID' + index;
                input.setAttribute('disabled', '');
                div.appendChild(input);
                document.getElementById('viewEntry').appendChild(div);
              }
              if (instance.BS_target_vue.valeur != "") {
                btn.setAttribute(instance.BS_toggle_modal.attribut, instance.BS_toggle_modal.valeur);
                btn.setAttribute(instance.BS_target_vue.attribut, instance.BS_target_vue.valeur);
              }
              btn.addEventListener('click',
                function (event) {
                  instance.fonction_vue(event);
                },
                false);
              td.appendChild(btn);
            }
            if (typeof instance.fonction_modif === 'function') {
              let btn = document.createElement('button');
              btn.className = instance.class_modif + ' ' + instance.BS_class_modif + ' ' + instance.icone_modif;
              btn.value = data;
              if (index < l) {
                let div = document.createElement('div');
                div.className = this.modalClass;
                let label = document.createElement('label');
                label.className = instance.modalClassLabel;
                label.innerText = instance.header[index] + ':';
                label.htmlFor = 'modifID' + index;
                div.appendChild(label);
                let input = document.createElement('input');
                input.type = 'text';
                input.id = 'modifID' + index;
                // input.setAttribute('disabled', '');
                div.appendChild(input);
                document.getElementById('modEntry').appendChild(div);
              }
              if (instance.BS_target_modif.valeur != '') {
                btn.setAttribute(instance.BS_toggle_modal.attribut, instance.BS_toggle_modal.valeur);
                btn.setAttribute(instance.BS_target_modif.attribut, instance.BS_target_modif.valeur);
              }
              btn.addEventListener('click',
                function (event) {
                  instance.fonction_modif(event);
                },
                false);
              td.appendChild(btn);
            }
            if (typeof this.fonction_suppr === 'function') {
              let btn = document.createElement('button');
              btn.className = instance.class_suppr + ' ' + instance.BS_class_suppr + ' ' + instance.icone_suppr;
              btn.value = data;
              if (index < l) {
                let div = document.createElement('div');
                div.className = this.modalClass;
                let label = document.createElement('label');
                label.className = instance.modalClassLabel;
                label.innerText = instance.header[index] + ':';
                label.htmlFor = 'delID' + index;
                div.appendChild(label);
                let input = document.createElement('input');
                input.type = 'text';
                input.id = 'delID' + index;
                input.setAttribute('disabled', '');
                div.appendChild(input);
                document.getElementById('delEntry').appendChild(div);
              }
              if (instance.BS_target_suppr.valeur != '') {
                btn.setAttribute(instance.BS_toggle_modal.attribut, instance.BS_toggle_modal.valeur);
                btn.setAttribute(instance.BS_target_suppr.attribut, instance.BS_target_suppr.valeur);
              }
              btn.addEventListener('click',
                function (event) {
                  instance.fonction_suppr(event);
                },
                false);
              td.appendChild(btn);
            }
          }
          index++;
        });
        if (this.append === false) { htmlZone.innerText = ''; }
        htmlZone.appendChild(table);
      }
    }
  }
}