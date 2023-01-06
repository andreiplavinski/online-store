//import { Card } from "../../scripts/templates/interfaceData";
//import CreateCards from "./createCards";
//import { resFound } from "./function";

//const url = window.location;

enum CheckSort {
  A,
  B,
}
enum DataAttribut {
  Price = "data-price",
  Rating = "data-rating",
  Stock = "data-stock",
  Category = "data-category",
  Brand = "data-brand",
  All = "data-all",
}

class SortProducts {
  select: HTMLSelectElement | null;
  container: HTMLElement | null;
  filter: HTMLElement;
  catalog: HTMLElement;
  cardGoods: NodeListOf<Element>;
  searchEl: HTMLElement | null;
  //CardProduct: NodeListOf<Element>;

  constructor(catalog: HTMLElement, filter: HTMLElement) {
    this.select = catalog.querySelector(".catalog__sort");
    this.container = catalog.querySelector(".catalog__block");
    this.catalog = catalog;
    this.filter = filter;
    this.sort();
    this.filterByCategory(
      DataAttribut.Category,
      "Category",
      "card-none-filter"
    );
    this.filterByCategory(DataAttribut.Brand, "Brand", "card-none-filter1");
    this.search();
    this.cardGoods = this.catalog.querySelectorAll(".card");
    this.searchEl = this.catalog.querySelector(".catalog__found");
    //this.CardProduct = catalog.querySelectorAll(".card");
  }

  sort() {
    this.select?.addEventListener("change", (e: Event) => {
      if (e.target instanceof HTMLSelectElement && this.container) {
        if (e.target.value === "1") {
          this.sortArray(DataAttribut.Price, CheckSort.A);
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
        if (e.target.value === "2") {
          this.sortArray(DataAttribut.Price, CheckSort.B);
        }

        if (e.target.value === "3") {
          this.sortArray(DataAttribut.Rating, CheckSort.A);
        }

        if (e.target.value === "4") {
          this.sortArray(DataAttribut.Rating, CheckSort.B);
        }

        if (e.target.value === "5") {
          this.sortArray(DataAttribut.Stock, CheckSort.A);
        }

        if (e.target.value === "6") {
          this.sortArray(DataAttribut.Stock, CheckSort.B);
        }
      }
    });
  }

  sortArray(dataAttribut: DataAttribut, checkSort: CheckSort) {
    const arrPrice: Array<number> = [];
    for (let i = 0; i < this.cardGoods.length; i++) {
      arrPrice.push(Number(this.cardGoods[i].getAttribute(dataAttribut)));
    }
    if (checkSort === CheckSort.A) {
      arrPrice.sort((a, b) => a - b);
    } else if (checkSort === CheckSort.B) {
      arrPrice.sort((a, b) => b - a);
    }

    this.cardGoods.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.order = `${arrPrice.indexOf(
          Number(el.getAttribute(dataAttribut))
        )}`;
      }
    });
  }

  search() {
    const searchField: HTMLInputElement | null =
      this.catalog.querySelector(".catalog__search");

    if (searchField instanceof HTMLInputElement) {
      searchField.addEventListener("input", () => {
        const text = searchField.value.toLowerCase();

        if (text !== "") {
          this.cardGoods.forEach((elem) => {
            elem.getAttribute(text);
            if (
              elem.getAttribute(DataAttribut.All)?.toLowerCase().search(text) ==
              -1
            ) {
              elem.classList.add("card-none");

              this.writeResSerch();
            } else {
              elem.classList.remove("card-none");
              this.writeResSerch();
            }
          });
        } else {
          this.cardGoods.forEach((elem) => {
            elem.classList.remove("card-none");
            this.writeResSerch();
          });
        }
      });
    }
  }

  writeResSerch() {
    if (this.searchEl) {
      //let count = 0;
      // for (let i = 0; i < this.cardGoods.length; i++) {
      //   if (
      //     this.cardGoods instanceof HTMLElement &&
      //     this.cardGoods.style.display === "none"
      //   ) {
      //     count++;
      //   }
      // }
      // this.cardGoods.forEach((el) => {
      //   if (el instanceof HTMLElement && el.style.display == "none") {
      //     console.log(el.style.display == "none");
      //     count++;
      //     console.log(count);
      //   }
      // });
      // console.log(count);
      this.searchEl.textContent = `Found: ${
        this.cardGoods.length -
        this.catalog.querySelectorAll(".card-none").length -
        this.catalog.querySelectorAll(".card-none-filter").length -
        this.catalog.querySelectorAll(".card-none-filter1").length
        //this.cardGoods.length - count
      }`;
    }
  }

  filterByCategory(selector: DataAttribut, value: string, nameClass: string) {
    const filtcat = this.filter.querySelectorAll(`input[name="${value}"]`);
    const ArrClick: Array<string | null> = [];
    filtcat.forEach((el) => {
      if (el instanceof HTMLInputElement) {
        el.addEventListener("click", () => {
          if (el.checked) {
            ArrClick.push(el.value);
          } else {
            ArrClick.splice(ArrClick.indexOf(el.value), 1);
          }
          console.log(ArrClick);

          this.cardGoods.forEach((item) => {
            if (ArrClick.includes(item.getAttribute(selector))) {
              item.classList.remove(nameClass);
              this.writeResSerch();
            } else if (ArrClick.length === 0) {
              item.classList.remove(nameClass);
              this.writeResSerch();
            } else {
              item.classList.add(nameClass);
              this.writeResSerch();
            }
          });
        });
      }
    });
  }
}

export default SortProducts;
