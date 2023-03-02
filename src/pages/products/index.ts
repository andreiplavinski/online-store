import Page from "../../scripts/templates/page";
import data from "../../data/data.json";
import { Card } from "../../scripts/templates/interfaceData";
import CardCatalog from "./createCards";
import { resFound, clickSize } from "./helpers";
import Filters from "./createFilters";
import ProductsSorting from "./sortProducts";
import { IProductsPage } from "./types";

const buttonsFilterName: string[] = ["Reset Filters", "Copy Link"];

class ProductsPage extends Page implements IProductsPage {
  static readonly data: Card[];
  static readonly CardCatalog: CardCatalog;
  static readonly Filters: Filters;
  static readonly ProductsSorting: ProductsSorting;

  constructor(tagName: string, id: string, className: string) {
    super(tagName, id, className);
  }

  private createContent(): HTMLElement {
    const filters: HTMLElement = document.createElement("div");
    filters.className = "filter";
    const filterHeader = document.createElement("div");
    filterHeader.className = "filter__header";
    filters.append(filterHeader);
    for (let i = 0; i < 2; i++) {
      const headerButton: HTMLButtonElement = document.createElement("button");
      headerButton.className = "filter__button";
      headerButton.setAttribute("id", "filter" + i);
      headerButton.textContent = buttonsFilterName[i];

      filterHeader.append(headerButton);

      headerButton.addEventListener("click", () => {
        if (headerButton.textContent === buttonsFilterName[1]) {
          window.navigator.clipboard.writeText(window.location.href);
          headerButton.textContent = "  Copied!  ";
          headerButton.style.background = "green";

          setTimeout(() => {
            headerButton.textContent = buttonsFilterName[1];
            headerButton.style.background = "rgb(110, 38, 38)";
          }, 2000);
        }
      });
    }

    const newdata: Card[] = data.products;
    const arrCategory: Array<string> = [];
    const arrBrand: Array<string> = [];
    const arrPrice: Array<number> = [];
    const arrStock: Array<number> = [];
    for (let i = 0; i < newdata.length; i++) {
      arrCategory.push(newdata[i].category);
      arrBrand.push(newdata[i].brand);
      arrPrice.push(newdata[i].price);
      arrStock.push(newdata[i].stock);
    }

    const arrCategoryUnic: string[] = arrCategory.filter(
      (el, i) => arrCategory.indexOf(el) === i
    );
    const arrBrandUnic: string[] = arrBrand.filter(
      (el, i) => arrBrand.indexOf(el) === i
    );

    const catalog: HTMLElement = document.createElement("div");
    catalog.className = "catalog";

    const catalogHeader: HTMLElement = document.createElement("div");
    catalogHeader.className = "catalog__header";
    catalog.append(catalogHeader);

    const catalogCards: HTMLElement = document.createElement("div");
    catalogCards.className = "catalog__block";
    catalog.append(catalogCards);

    const emptyBlock: HTMLElement = document.createElement("div");
    emptyBlock.className = "catalog__empty";
    emptyBlock.textContent = "Па вашым запыце нічога не знойдзена!";
    catalogCards.append(emptyBlock);

    const productCard: CardCatalog = new CardCatalog(newdata, catalogCards);
    productCard.renderCards();

    const filterCategory: Filters = new Filters(
      arrCategoryUnic,
      filters,
      "Category"
    );
    filterCategory.renderFilterCheckbox(arrCategory);

    const filterBrand: Filters = new Filters(arrBrandUnic, filters, "Brand");
    filterBrand.renderFilterCheckbox(arrBrand);

    const filterPrice: Filters = new Filters(arrPrice, filters, "Price");
    filterPrice.renderFilterRange("€");

    const filterStock: Filters = new Filters(arrStock, filters, "Stock");
    filterStock.renderFilterRange("");

    const cardFound: HTMLElement = document.createElement("p");
    cardFound.className = "catalog__found";
    resFound(cardFound, catalog);

    const sortCards: HTMLSelectElement = document.createElement("select");
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

    const cardChooseView: HTMLElement = document.createElement("div");
    cardChooseView.className = "catalog__choose-viev";
    catalogHeader.append(cardChooseView);

    const chooseSize: Array<string> = ["4 elements", "6 elements"];

    for (let i = 0; i < chooseSize.length; i++) {
      const sizeVar: HTMLElement = document.createElement("div");
      sizeVar.textContent = chooseSize[i];
      sizeVar.className = "catalog__var-view";
      if (sizeVar.textContent === chooseSize[0]) {
        sizeVar.classList.add("catalog__var-view-active");
      }
      cardChooseView.append(sizeVar);
      sizeVar.addEventListener("click", () => {
        clickSize<HTMLElement>(sizeVar);
      });
    }

    this.container.append(filters, catalog);

    const sort = new ProductsSorting(catalog, filters);

    sort.getParams();

    return this.container;
  }

  public render(): HTMLElement {
    return this.createContent();
  }
}

export default ProductsPage;
