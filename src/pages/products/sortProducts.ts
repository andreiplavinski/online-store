import { Card } from "../../scripts/templates/interfaceData";
import CreateCards from "./createCards";
import { resFound } from "./function";

//const url = window.location;

class SortProducts {
  data: Card[];
  select: HTMLSelectElement | null;
  container: HTMLElement | null;
  filter: HTMLElement;
  catalog: HTMLElement;
  cardGoods: NodeListOf<Element>;
  //CardProduct: NodeListOf<Element>;

  constructor(data: Card[], catalog: HTMLElement, filter: HTMLElement) {
    this.select = catalog.querySelector(".catalog__sort");
    this.container = catalog.querySelector(".catalog__block");
    this.data = data;
    this.catalog = catalog;
    this.filter = filter;
    this.sort();
    this.filterByCategory();
    this.search();
    this.cardGoods = this.catalog.querySelectorAll(".card");
    //this.CardProduct = catalog.querySelectorAll(".card");
  }

  sort() {
    this.select?.addEventListener("change", (e: Event) => {
      //console.log(123);
      if (e.target instanceof HTMLSelectElement && this.container) {
        //console.log(e.target.value);
        if (e.target.value === "1" && this.data) {
          //console.log(e.target.value);
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
          // url.search = "?price = ASD";
          // console.log(url.search);
          // if (url.search === "?price = ASD") {
          //   document.addEventListener("load", () => {
          //     this.select?.value == "1";
          //   });
          // }
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

  search() {
    const searchEl: HTMLElement | null =
      this.catalog.querySelector(".catalog__found");

    const searchField: HTMLInputElement | null =
      this.catalog.querySelector(".catalog__search");

    if (searchField instanceof HTMLInputElement) {
      searchField.addEventListener("input", () => {
        const text = searchField.value.toLowerCase();

        if (text !== "") {
          this.cardGoods.forEach((elem) => {
            elem.getAttribute(text);
            if (
              elem.getAttribute("data-all")?.toLowerCase().search(text) == -1
            ) {
              elem.classList.add("card-none");

              if (searchEl) {
                setInterval(() => {
                  resFound(searchEl, this.catalog);
                }, 0);
              }

              // if (searchEl) {
              //   setTimeout(() => resFound(searchEl, this.catalog));
              //   console.log(resFound(searchEl, this.catalog));
              // }
            } else {
              elem.classList.remove("card-none");
              // if (searchEl) {
              //   resFound(searchEl, this.catalog);
              // }
            }
          });
        } else {
          this.cardGoods.forEach((elem) => {
            elem.classList.remove("card-none");
            // if (searchEl) {
            //   resFound(searchEl, this.catalog);
            // }
          });
        }
      });
    }
  }

  filterByCategory() {
    //const filtcat = this.filter.querySelectorAll("input[name=Category]");
    //console.log(filtcat);
    //const cardGoods = this.catalog.querySelectorAll(".card");
    //console.log(cardGoods);
  }
}

export default SortProducts;
