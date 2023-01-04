import { Card } from "../../scripts/templates/interfaceData";
import CreateCards from "./createCards";

class SortProducts {
  data: Card[];
  select: HTMLSelectElement | null;
  container: HTMLElement | null;

  constructor(data: Card[], catalog: HTMLElement) {
    this.select = catalog.querySelector(".catalog__sort");
    this.container = catalog.querySelector(".catalog__block");
    this.data = data;
    this.sort();
  }

  sort() {
    this.select?.addEventListener("change", (e: Event) => {
      console.log(123);
      if (e.target instanceof HTMLSelectElement && this.container) {
        console.log(e.target.value);
        if (e.target.value === "1" && this.data) {
          console.log(e.target.value);
          const arrPrice = this.data.sort((a, b) => {
            return a.price - b.price;
          });

          const productCard: CreateCards = new CreateCards(
            arrPrice,
            this.container
          );
          productCard.renderCards();
          //const url = new URL();
          //window.location.searchParams.set("price", "ASD");

          //("price", "ASD");
        }
        if (e.target.value === "2" && this.data) {
          const arrPrice = this.data.sort((a, b) => {
            return b.price - a.price;
          });
          const productCard: CreateCards = new CreateCards(
            arrPrice,
            this.container
          );
          productCard.renderCards();
        }

        if (e.target.value === "3" && this.data) {
          const arrPrice = this.data.sort((a, b) => {
            return a.rating - b.rating;
          });

          const productCard: CreateCards = new CreateCards(
            arrPrice,
            this.container
          );
          productCard.renderCards();
        }

        if (e.target.value === "4" && this.data) {
          const arrPrice = this.data.sort((a, b) => {
            return b.rating - a.rating;
          });

          const productCard: CreateCards = new CreateCards(
            arrPrice,
            this.container
          );
          productCard.renderCards();
        }

        if (e.target.value === "5" && this.data) {
          const arrPrice = this.data.sort((a, b) => {
            return a.stock - b.stock;
          });

          const productCard: CreateCards = new CreateCards(
            arrPrice,
            this.container
          );
          productCard.renderCards();
        }

        if (e.target.value === "6" && this.data) {
          const arrPrice = this.data.sort((a, b) => {
            return b.stock - a.stock;
          });

          const productCard: CreateCards = new CreateCards(
            arrPrice,
            this.container
          );
          productCard.renderCards();
        }
      }
    });
  }
}

export default SortProducts;
