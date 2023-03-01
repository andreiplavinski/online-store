import { Card } from "../../scripts/templates/interfaceData";
import { PageIds } from "../../scripts/templates/enumPage";
import { AddToCart } from "./helpers";
import { writeToTalPriceCount } from "./script";
import { ICardCatalog } from "./types";

class CardCatalog implements ICardCatalog {
  readonly data: Card[];
  readonly container: HTMLElement;
  constructor(data: Card[], container: HTMLElement) {
    this.data = data;
    this.container = container;
  }

  public renderCards(): HTMLElement {
    for (let i = 0; i < this.data.length; i++) {
      const currentCardId = this.data[i].id;
      const cardGallery: HTMLElement = document.createElement("div");
      cardGallery.className = "card";
      cardGallery.style.backgroundImage = `url(${this.data[i].images[0]})`;

      cardGallery.setAttribute("data-id", String(currentCardId));
      cardGallery.setAttribute("data-category", String(this.data[i].category));
      cardGallery.setAttribute("data-brand", String(this.data[i].brand));
      cardGallery.setAttribute("data-price", String(this.data[i].price));
      cardGallery.setAttribute("data-stock", String(this.data[i].stock));
      cardGallery.setAttribute("data-rating", String(this.data[i].rating));

      cardGallery.setAttribute(
        "data-all",
        `${this.data[i].title}${this.data[i].description}${this.data[i].price}
        ${this.data[i].discountPercentage}${this.data[i].rating}${this.data[i].stock}
        ${this.data[i].brand}${this.data[i].category}`
      );

      this.container.append(cardGallery);
      const cardTitle: HTMLElement = document.createElement("div");
      cardTitle.textContent = this.data[i].title;
      cardTitle.className = "card__title";
      cardGallery.append(cardTitle);
      const cardDescription: HTMLElement = document.createElement("div");
      cardDescription.className = "card__description";
      cardGallery.append(cardDescription);

      const cardCategory: HTMLElement = document.createElement("p");
      cardCategory.className = "card__category";
      const cardBrand: HTMLElement = document.createElement("p");
      const cardPrice: HTMLElement = document.createElement("p");
      const cardDiscount: HTMLElement = document.createElement("p");
      const cardRating: HTMLElement = document.createElement("p");
      const cardStock: HTMLElement = document.createElement("p");

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

      const cardButtonAdd: HTMLButtonElement = document.createElement("button");
      cardButtonAdd.classList.add("card__button");
      cardButtonAdd.setAttribute("id", "add-product");
      cardButtonAdd.setAttribute("data-id", String(currentCardId));
      const cardButtonDetails: HTMLButtonElement =
        document.createElement("button");
      cardButtonDetails.classList.add("card__button");
      cardButtonDetails.setAttribute("id", "view-product");

      if (!localStorage.getItem("product")) {
        cardButtonAdd.textContent = "Add To Cart";
      } else if (
        Object.keys(
          JSON.parse(localStorage.getItem("product") || "{}")
        ).includes(`${currentCardId}`)
      ) {
        cardButtonAdd.textContent = "Drop From Cart";
      } else {
        cardButtonAdd.textContent = "Add To Cart";
      }
      cardButtonDetails.textContent = "Details";
      cardGallery.append(cardButtonAdd, cardButtonDetails);

      cardGallery.addEventListener("click", (event: Event) => {
        if (
          event.target instanceof HTMLElement &&
          !event.target.closest("#add-product")
        ) {
          window.location.hash = `${PageIds.Cards}/${currentCardId}`;
          localStorage.setItem("idCard", `${currentCardId}`);
        }
      });

      AddToCart(cardButtonAdd);
      cardButtonAdd.addEventListener("click", writeToTalPriceCount);
    }

    return this.container;
  }
}

export default CardCatalog;
