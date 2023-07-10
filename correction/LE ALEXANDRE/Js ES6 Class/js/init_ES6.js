import { Ajax_Es6 } from "./Ajax_class.js";

const urlApi = "https://afpafabrice.space/DWWM22239/Api/api.php/voitures";
const urlApi_Users = "https://afpafabrice.space/DWWM22239/Api/api.php/users";

let ajax_voiture = new Ajax_Es6(urlApi);
let ajax_users = new Ajax_Es6(urlApi_Users);

export { ajax_voiture, urlApi, ajax_users, urlApi_Users };
