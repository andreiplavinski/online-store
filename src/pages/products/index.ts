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
    //console.log(newdata);
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
    filterCategory.renderFilterCheckbox(arrCategory);

    const filterBrand: CreateFilters = new CreateFilters(
      arrBrandUnic,
      filters,
      "Brand"
    );
    console.log(arrBrand);
    filterBrand.renderFilterCheckbox(arrBrand);

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

    const searchCard: HTMLInputElement = document.createElement("input");
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

    //const sort =
    new SortProducts(catalog, filters);

    return this.container;
  }

  render(): HTMLElement {
    return this.createContent();
  }
}

const catProd: HTMLElement | null = document.querySelector(".catalog");
export { catProd };

export default ProductsPage;
