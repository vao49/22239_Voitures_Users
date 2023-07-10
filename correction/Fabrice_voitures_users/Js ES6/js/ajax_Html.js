// Fonctions utiles
function loadHTML(idZone, urlFichier) {
  fetch(urlFichier)
    .then((r) => {
      if (r.ok) {
        return r.text();
      } else {
        throw new Error("Code Erreur : " + r.status);
      }
    })
    .then((s) => {
      // console.log(s);
      if (document.getElementById(idZone) !== null) {
        document.getElementById(idZone).innerHTML = s;
      } else {
        console.log("l'Id " + idZone + " n'existe pas sur la page");
      }
    })
    .catch(function (error) {
      console.log("La requete GET HTML a échoué : ", error);
    });
}
