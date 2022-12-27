import Page from "../../scripts/templates/page";
import data from "../../data/data.json";
//import CardProd from "../../scripts/templates/interfaceData";
import { Card } from "../../scripts/templates/interfaceData";
import CreateCards from "./createCards";
import { resFound, writeRes } from "./function";
import CreateFilters from "./createFilters";

const buttonsFilterName = ["Reset Filters", "Copy Link"];

class ProductsPage extends Page {
  // static textObject = {
  //   pageTitle: "",
  // };
  static data: Card[];

  constructor(
    tagName: string,
    id: string,
    className: string
    //data: Array<CardProd>
  ) {
    super(tagName, id, className);
    // this.data = data;
  }

  protected createContent() {
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
    console.log(arrBrand.filter((el, i) => arrBrand.indexOf(el) === i));
    console.log(arrCategory.filter((el, i) => arrCategory.indexOf(el) === i));
    console.log(arrCategory);
    console.log(arrBrand);
    console.log(arrPrice);
    console.log(arrStock);

    const catalog = document.createElement("div");
    catalog.className = "catalog";

    const catalogHeader = document.createElement("div");
    //catalogHeader.textContent = "Здесь будет Хеадер";
    catalogHeader.className = "catalog__header";
    catalog.append(catalogHeader);

    const sortCards = document.createElement("select");
    sortCards.name = "sortCard";
    sortCards.className = "catalog__sort";
    //sortCards.ariaPlaceholder = "Sort Options";
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

    for (let i = 0; i < sortName.length; i++) {
      const sortChoose = document.createElement("option");
      sortChoose.textContent = sortName[i];
      sortChoose.value = sortName[i];
      if (i === 0) {
        sortChoose.setAttribute("disabled", "");
        sortChoose.setAttribute("selected", "");
      }
      sortCards.append(sortChoose);
    }

    const catalogCards = document.createElement("div");
    catalogCards.className = "catalog__block";
    catalog.append(catalogCards);

    const productCard = new CreateCards(newdata, catalogCards);
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
    console.log(writeRes("card__category"));
    this.container.append(filters, catalog);
    return this.container;
  }

  render() {
    return this.createContent();
  }
}

const catProd: HTMLElement | null = document.querySelector(".catalog");
export { catProd };

export default ProductsPage;
