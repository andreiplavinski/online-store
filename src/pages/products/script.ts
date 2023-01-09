import data from "../../data/data.json";
import { Card } from "../../scripts/templates/interfaceData";

const product: Card[] = data.products;
const productPrice: number[] = [];

for (let i = 0; i < product.length; i++) {
  productPrice.push(product[i].price);
}

export function writeToTalPriceCount() {
  const writePrice: HTMLElement | null = document.querySelector(
    ".header__price-result"
  );
  const writeProdCount: HTMLElement | null = document.querySelector(
    ".header__basket-count"
  );

  const arrValue: number[] = Object.values(
    JSON.parse(localStorage.getItem("product") || "{}")
  );
  const resCount: number = arrValue.reduce((sum, curr) => sum + curr, 0);

  if (writeProdCount) {
    writeProdCount.textContent = String(resCount);
  }

  const totalPrice = Object.keys(
    JSON.parse(localStorage.getItem("product") || "{}")
  )
    .map((el, i) => {
      return productPrice[+el - 1] * arrValue[i];
    })
    .reduce((acc, cur) => acc + cur, 0);

  if (writePrice) {
    writePrice.textContent = String(totalPrice);
  }

  console.log(resCount, totalPrice);
  console.log(JSON.parse(localStorage.getItem("product") || "{}"));
}
