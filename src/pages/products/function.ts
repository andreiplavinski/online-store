//import { Card } from "../../scripts/templates/interfaceData";

export function resFound(cardFound: HTMLElement, catalog: HTMLElement): void {
  cardFound.textContent = `Found: ${catalog.querySelectorAll(".card").length}`;
}

export function writeRes(selectorName: string): number {
  return document.getElementsByClassName(selectorName).length;
}

interface IProducts {
  [key: number]: number;
}
let prodIdCount: IProducts = {};

export function AddToCart(cardButtonAdd: HTMLElement) {
  cardButtonAdd.addEventListener("click", () => {
    if (
      !localStorage.getItem("product") ||
      !Object.keys(
        JSON.parse(localStorage.getItem("product") || "{}")
      ).includes(`${Number(cardButtonAdd.getAttribute("data-id"))}`)
    ) {
      cardButtonAdd.textContent = "Drop From Cart";

      prodIdCount = JSON.parse(localStorage.getItem("product") || "{}");
      prodIdCount[Number(cardButtonAdd.getAttribute("data-id"))] = 1;
      localStorage.setItem("product", JSON.stringify(prodIdCount));
    } else if (
      Object.keys(JSON.parse(localStorage.getItem("product") || "{}")).includes(
        `${Number(cardButtonAdd.getAttribute("data-id"))}`
      ) &&
      Object.keys(prodIdCount).includes(
        `${Number(cardButtonAdd.getAttribute("data-id"))}`
      )
    ) {
      delete prodIdCount[Number(cardButtonAdd.getAttribute("data-id"))];
      localStorage.setItem("product", JSON.stringify(prodIdCount));

      cardButtonAdd.textContent = "Add To Cart";
    } else if (
      Object.keys(JSON.parse(localStorage.getItem("product") || "{}")).includes(
        `${Number(cardButtonAdd.getAttribute("data-id"))}`
      ) &&
      !Object.keys(prodIdCount).includes(
        `${Number(cardButtonAdd.getAttribute("data-id"))}`
      )
    ) {
      prodIdCount = JSON.parse(localStorage.getItem("product") || "{}");
      delete prodIdCount[Number(cardButtonAdd.getAttribute("data-id"))];
      localStorage.setItem("product", JSON.stringify(prodIdCount));

      cardButtonAdd.textContent = "Add To Cart";
    }
  });
}

// export function writeResFound() {
//   const cardFound: HTMLElement | null =
//     document.querySelector(".catalog__found");
//   const catalog: HTMLElement | null = document.querySelector(".catalog");
//   if (cardFound !== null && catalog !== null) return cardFound, catalog;
// }
