//import ProductsPage from ".";

import { resFound } from "./function";
import { catProd } from ".";

const cardFound: HTMLElement | null = document.querySelector(".catalog__found");
//const catalog: HTMLElement | null = document.querySelector(".catalog");
if (cardFound !== null && catProd !== null) resFound(cardFound, catProd);
