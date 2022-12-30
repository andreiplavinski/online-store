import { Card } from "../../scripts/templates/interfaceData";
import { pageIds } from "../../scripts/templates/enumPage";
import { AddToCart } from "./function";

class CreateCards {
  data: Card[];
  container: HTMLElement;
  constructor(data: Card[], container: HTMLElement) {
    this.data = data;
    this.container = container;
  }

  renderCards(): HTMLElement {
    for (let i = 0; i < this.data.length; i++) {
      const idCardCurrent = this.data[i].id;
      const catalogCard = document.createElement("div");
      catalogCard.className = "card";
      catalogCard.style.backgroundImage = `url(${this.data[i].images[0]})`;
      catalogCard.setAttribute("data-id", String(idCardCurrent));
      this.container.append(catalogCard);
      const cardTitle = document.createElement("div");
      cardTitle.textContent = this.data[i].title;
      cardTitle.className = "card__title";
      catalogCard.append(cardTitle);
      const cardDescription = document.createElement("div");
      cardDescription.className = "card__description";
      catalogCard.append(cardDescription);

      const cardCategory = document.createElement("p");
      cardCategory.className = "card__category";
      const cardBrand = document.createElement("p");
      const cardPrice = document.createElement("p");
      const cardDiscount = document.createElement("p");
      const cardRating = document.createElement("p");
      const cardStock = document.createElement("p");
      cardCategory.innerHTML = `Category:<span> ${this.data[i].category}</span>`;
      cardBrand.innerHTML = `Brand:<span> ${this.data[i].brand}</span`;
      cardPrice.innerHTML = `Price:<span> ${this.data[i].price}€</span`;
      cardDiscount.innerHTML = `Discount:<span> ${this.data[i].discountPercentage}%</span`;
      cardRating.innerHTML = `Rating:<span> ${this.data[i].rating}</span`;
      cardStock.innerHTML = `Stock:<span> ${this.data[i].stock}</span`;

      cardDescription.append(
        cardCategory,
        cardBrand,
        cardPrice,
        cardDiscount,
        cardRating,
        cardStock
      );

      const cardButtonAdd = document.createElement("button");
      cardButtonAdd.classList.add("card__button");
      cardButtonAdd.setAttribute("id", "add-product");
      cardButtonAdd.setAttribute("data-id", String(idCardCurrent));
      const cardButtonDetails = document.createElement("button");
      cardButtonDetails.classList.add("card__button");
      cardButtonDetails.setAttribute("id", "view-product");

      if (!localStorage.getItem("product")) {
        cardButtonAdd.textContent = "Add To Cart";
      } else if (
        Object.keys(
          JSON.parse(localStorage.getItem("product") || "{}")
        ).includes(`${idCardCurrent}`)
      ) {
        cardButtonAdd.textContent = "Drop From Cart";
      } else {
        cardButtonAdd.textContent = "Add To Cart";
      }
      cardButtonDetails.textContent = "Details";
      catalogCard.append(cardButtonAdd, cardButtonDetails);

      catalogCard.addEventListener("click", (event: Event) => {
        if (
          event.target instanceof HTMLElement &&
          !event.target.closest("#add-product")
        ) {
          window.location.hash = `${pageIds.cards}/${idCardCurrent}`;
          localStorage.setItem("idCard", `${idCardCurrent}`);
        }
      });

      AddToCart(cardButtonAdd);
    }

    return this.container;
  }
}

export default CreateCards;
