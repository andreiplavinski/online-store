import Page from "../../scripts/templates/page";
import data from "../../data/data.json";
//import CardProd from "../../scripts/templates/interfaceData";
import { Card } from "../../scripts/templates/interfaceData";
import CreateCards from "./createCards";
import { resFound } from "./function";
import CreateFilters from "./createFilters";
import SortProducts from "./sortProducts";
//import SortProducts from "./sortProducts";

const buttonsFilterName = ["Reset Filters", "Copy Link"];

class ProductsPage extends Page {
  static data: Card[];
  static CreateCards: CreateCards;
  static CreateFilters: CreateFilters;
  static SortProducts: SortProducts;

  constructor(tagName: string, id: string, className: string) {
    super(tagName, id, className);
    //this.sort = new SortProducts(newData)
    //this.hello;
    // this.data = data;
    // this.sortCard();
  }

  // hello() {
  //   alert("hello");
  // }

  protected createContent(): HTMLElement {
    const filters = document.createElement("div");
    filters.className = "filter";
    const filterHeader = document.createElement("div");
    filterHeader.className = "filter__header";
    filters.append(filterHeader);
    for (let i = 0; i < 2; i++) {
      const headerButton = document.createElement("button");
      headerButton.className = "filter__button";
      headerButton.setAttribute("id", "filter" + i);
      headerButton.textContent = buttonsFilterName[i];

      filterHeader.append(headerButton);
    }

    const newdata = data.products;
    const arrCategory: Array<string> = [];
    const arrBrand: Array<string> = [];
    const arrPrice: Array<number> = [];
    const arrStock: Array<number> = [];
    for (let i = 0; i < newdata.length; i++) {
      arrCategory.push(newdata[i].category);
      arrBrand.push(newdata[i].brand);
      arrPrice.push(newdata[i].price);
      arrStock.push(newdata[i].stock);
      //arrPhoto.push(newdata[i].images[0]);
    }
    console.log(newdata);
    const arrCategoryUnic = arrCategory.filter(
      (el, i) => arrCategory.indexOf(el) === i
    );
    const arrBrandUnic = arrBrand.filter((el, i) => arrBrand.indexOf(el) === i);
    // console.log(arrBrand.filter((el, i) => arrBrand.indexOf(el) === i));
    // console.log(arrCategory.filter((el, i) => arrCategory.indexOf(el) === i));
    // console.log(arrCategory);
    // console.log(arrBrand);
    // console.log(arrPrice);
    // console.log(arrStock);

    const catalog = document.createElement("div");
    catalog.className = "catalog";

    const catalogHeader = document.createElement("div");
    catalogHeader.className = "catalog__header";
    catalog.append(catalogHeader);

    const catalogCards = document.createElement("div");
    catalogCards.className = "catalog__block";
    catalog.append(catalogCards);

    const productCard: CreateCards = new CreateCards(newdata, catalogCards);
    productCard.renderCards();

    const filterCategory: CreateFilters = new CreateFilters(
      arrCategoryUnic,
      filters,
      "Category"
    );
    filterCategory.renderFilterCheckbox();

    const filterBrand: CreateFilters = new CreateFilters(
      arrBrandUnic,
      filters,
      "Brand"
    );
    filterBrand.renderFilterCheckbox();

    const filterPrice: CreateFilters = new CreateFilters(
      arrPrice,
      filters,
      "Price"
    );
    filterPrice.renderFilterRange("€");

    const filterStock: CreateFilters = new CreateFilters(
      arrStock,
      filters,
      "Stock"
    );
    filterStock.renderFilterRange("");

    const cardFound: HTMLElement = document.createElement("p");
    cardFound.className = "catalog__found";
    resFound(cardFound, catalog);

    const sortCards = document.createElement("select");
    sortCards.name = "sortCard";
    sortCards.className = "catalog__sort";
    sortCards.setAttribute("id", "catalog__sort");
    catalogHeader.append(sortCards);
    const sortName: Array<string> = [
      "Sort Options:",
      "Sort by Price ascending",
      "Sort by Price descending",
      "Sort by Rating ascending",
      "Sort by Rating descending",
      "Sort by Stock ascending",
      "Sort by Stock descending",
    ];
    let sortChoose: HTMLOptionElement;
    for (let i = 0; i < sortName.length; i++) {
      sortChoose = document.createElement("option");
      sortChoose.textContent = sortName[i];
      sortChoose.value = `${i}`;
      if (i === 0) {
        sortChoose.setAttribute("disabled", "");
        sortChoose.setAttribute("selected", "");
      }
      sortCards.append(sortChoose);
    }

    catalogHeader.append(cardFound);

    const searchCard = document.createElement("input");
    searchCard.type = "search";
    searchCard.placeholder = "Search";
    searchCard.className = "catalog__search";
    catalogHeader.append(searchCard);

    const cardChooseView = document.createElement("div");
    cardChooseView.className = "catalog__choose-viev";
    catalogHeader.append(cardChooseView);

    const chooseSize: Array<string> = ["4 elements", "6 elements", "String"];

    for (let i = 0; i < chooseSize.length; i++) {
      const sizeVar = document.createElement("div");
      sizeVar.textContent = chooseSize[i];
      sizeVar.className = "catalog__var-view";
      cardChooseView.append(sizeVar);
    }

    this.container.append(filters, catalog);
    //this.sortCard();

    const sort = new SortProducts(data.products, catalog);
    console.log(data);
    sort.sort();

    //new SortProducts(newdata, sortCards);
    // sort.sort();
    //sort();

    // sortCards.addEventListener("change", f);

    // function f(e: Event) {
    //   console.log(123);
    //   if (e.target instanceof HTMLSelectElement) {
    //     console.log(e.target.value);
    //     if (e.target.value === "1" && data.products) {
    //       const arrPrice = data.products.sort((a, b) => {
    //         return a.price - b.price;
    //       });

    //       const productCard: CreateCards = new CreateCards(
    //         arrPrice,
    //         catalogCards
    //       );
    //       productCard.renderCards();
    //       //const url = new URL();
    //       //window.location.searchParams.set("price", "ASD");

    //       //("price", "ASD");
    //     }
    //     if (e.target.value === "2" && data.products) {
    //       const arrPrice = data.products.sort((a, b) => {
    //         return b.price - a.price;
    //       });
    //       const productCard: CreateCards = new CreateCards(
    //         arrPrice,
    //         catalogCards
    //       );
    //       productCard.renderCards();
    //     }

    //     if (e.target.value === "3" && data.products) {
    //       const arrPrice = data.products.sort((a, b) => {
    //         return a.rating - b.rating;
    //       });

    //       const productCard: CreateCards = new CreateCards(
    //         arrPrice,
    //         catalogCards
    //       );
    //       productCard.renderCards();
    //     }

    //     if (e.target.value === "4" && data.products) {
    //       const arrPrice = data.products.sort((a, b) => {
    //         return b.rating - a.rating;
    //       });

    //       const productCard: CreateCards = new CreateCards(
    //         arrPrice,
    //         catalogCards
    //       );
    //       productCard.renderCards();
    //     }

    //     if (e.target.value === "5" && data.products) {
    //       const arrPrice = data.products.sort((a, b) => {
    //         return a.stock - b.stock;
    //       });

    //       const productCard: CreateCards = new CreateCards(
    //         arrPrice,
    //         catalogCards
    //       );
    //       productCard.renderCards();
    //     }

    //     if (e.target.value === "6" && data.products) {
    //       const arrPrice = data.products.sort((a, b) => {
    //         return b.stock - a.stock;
    //       });

    //       const productCard: CreateCards = new CreateCards(
    //         arrPrice,
    //         catalogCards
    //       );
    //       productCard.renderCards();
    //     }
    //   }
    // }

    return this.container;
  }

  render(): HTMLElement {
    return this.createContent();
  }

  // sortCard() {
  //   new SortProducts(data.products);
  // }
}

const catProd: HTMLElement | null = document.querySelector(".catalog");
export { catProd };

export default ProductsPage;
