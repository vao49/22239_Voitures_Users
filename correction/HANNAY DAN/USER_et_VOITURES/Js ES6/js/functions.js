export function search(input, zone) {
  document.getElementById(input).addEventListener("keyup", () => {
    let tr = document.getElementById(zone).getElementsByTagName("tr");
    for (let i of tr) {
      if (!i.innerText.toLowerCase().includes(document.getElementById(input).value.toLowerCase())) {
        i.classList.add("visually-hidden");
      } else {
        i.classList.remove("visually-hidden");
      }
    };
  },
    false);
}

export function displayAlert(id, alert) {
  let zone = document.getElementById(id);
  zone.innerHTML = '';
  zone.innerHTML = alert;
}

Object.defineProperty(String.prototype, 'capitalize', { // Juste une fonction trouvée sur stackoverflow permettant de mettre la première lettre d'une phrase en majuscule.
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false
});