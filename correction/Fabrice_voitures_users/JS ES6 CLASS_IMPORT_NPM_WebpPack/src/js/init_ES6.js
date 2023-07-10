import { Ajax_Es6 } from "./Ajax_class.js";

const url = "http://fbrc.esy.es/DWWM22239/Api/api.php";
let Obj_AJAX_voitures = new Ajax_Es6(url + "/voitures");
let Obj_AJAX_users = new Ajax_Es6(url + "/users");

export { Obj_AJAX_voitures, Obj_AJAX_users };
