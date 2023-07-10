import { Ajax_Es6 } from "./Ajax_class.js";

const url = "http://fbrc.esy.es/DWWM22239/Api/api.php/voitures";
let Obj_AJAX = new Ajax_Es6(url);

export { Obj_AJAX };
