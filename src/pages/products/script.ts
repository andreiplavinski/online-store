//import ProductsPage from ".";

import { resFound } from "./function";
import { catProd } from ".";

const cardFound: HTMLElement | null = document.querySelector(".catalog__found");
//const catalog: HTMLElement | null = document.querySelector(".catalog");
if (cardFound !== null && catProd !== null) resFound(cardFound, catProd);

import data from "../../data/data.json";
import { Card } from "../../scripts/templates/interfaceData";

const product: Card[] = data.products;
const productPrice: number[] = [];

for (let i = 0; i < product.length; i++) {
  productPrice.push(product[i].price);
}

export function writeToTalPriceCount() {
  const writePrice = document.querySelector(".header__price-result");
  const WriteProdCount = document.querySelector(".header__basket-count");

  const a: number[] = Object.values(
    JSON.parse(localStorage.getItem("product") || "{}")
  );
  const b = a.reduce((sum, curr) => sum + curr);

  const c = Object.keys(JSON.parse(localStorage.getItem("product") || "{}"));

  // const d: number;
  // for (let i = 0; i< c.length; i++) {

  // }

  console.log(a, b, c, writePrice, WriteProdCount);
  console.log(JSON.parse(localStorage.getItem("product") || "{}"));
}
