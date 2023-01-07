//import { Card } from "../../scripts/templates/interfaceData";
//import CreateCards from "./createCards";
//import { resFound } from "./function";
import DualSlider from "./dual-slider";

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
    this.filterByPriceStock(
      0,
      "card_none-price",
      "card_none-price1",
      DataAttribut.Price,
      "€"
    );
    this.filterByPriceStock(
      1,
      "card-none-stock",
      "card-none-stock1",
      DataAttribut.Stock,
      ""
    );
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
      let count = 0;
      for (let i = 0; i < this.cardGoods.length; i++) {
        if (
          //this.cardGoods[i] instanceof HTMLElement &&
          //(this.cardGoods[i] as HTMLElement).style.display !== "none"
          !this.cardGoods[i].matches(
            ".card card-none .card-none-filter .card-none-filter1"
          )
        ) {
          count++;
          //console.log(this.cardGoods[i] as HTMLElement).style.display ==="none");
        }
        //console.log(count);
      }
      // this.cardGoods.forEach((el) => {
      //   if (el instanceof HTMLElement && el.style.display == "none") {
      //     console.log(el.style.display == "none");
      //     count++;
      //     console.log(count);
      //   }
      // });
      console.log(count);
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

  filterByPriceStock(
    numberFilter: number,
    class1: string,
    class2: string,
    atribute: DataAttribut,
    val?: string
  ): void {
    const inputFilterFrom: Element =
      this.filter.querySelectorAll(".fromSlider")[numberFilter];
    const inputFilterTo: Element =
      this.filter.querySelectorAll(".toSlider")[numberFilter];

    const textFrom: Element = this.filter.querySelectorAll(
      ".filter-block__min-value"
    )[numberFilter];
    const textTo: Element = this.filter.querySelectorAll(
      ".filter-block__max-value"
    )[numberFilter];

    if (
      inputFilterFrom instanceof HTMLInputElement &&
      inputFilterTo instanceof HTMLInputElement &&
      textFrom instanceof HTMLElement &&
      textTo instanceof HTMLElement
    ) {
      const startSlider = new DualSlider(
        inputFilterFrom,
        inputFilterTo,
        textFrom,
        textTo
      );
      inputFilterFrom.addEventListener("input", () => {
        startSlider.controlFromSlider(val);

        this.cardGoods.forEach((el) => {
          if (
            inputFilterFrom instanceof HTMLInputElement &&
            Number(el.getAttribute(atribute)) < +inputFilterFrom.value
          ) {
            el.classList.add(class1);
          } else {
            el.classList.remove(class1);
          }
        });
        //}
      });
      inputFilterTo.addEventListener("input", () => {
        startSlider.controlToSlider(val);
        this.cardGoods.forEach((el) => {
          if (
            inputFilterTo instanceof HTMLInputElement &&
            Number(el.getAttribute(atribute)) > +inputFilterTo.value
          ) {
            el.classList.add(class2);
          } else {
            el.classList.remove(class2);
          }
        });
      });
    }
  }

  //   returnArrayPrice(atribute: DataAttribut): Array<number> {
  //     const arrPrice: Array<number> = [];
  //     for (let i = 0; i < this.cardGoods.length; i++) {
  //       arrPrice.push(Number(this.cardGoods[i].getAttribute(atribute)));
  //     }
  //     arrPrice.sort((a, b) => a - b);

  //     return arrPrice.filter((el, i) => arrPrice.indexOf(el) === i);
  //   }
}

export default SortProducts;
