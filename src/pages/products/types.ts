import { Card } from "../../scripts/templates/interfaceData";

export interface ICreateCards {
  data: Card[];
  container: HTMLElement;
  renderCards(): HTMLElement;
}

export interface ICreateFilters {
  data: Array<string | number>;
  container: HTMLElement;
  headerName: string;
  renderContainer(): HTMLElement;
  renderFilterCheckbox(array: Array<string>): HTMLElement;
  renderFilterRange(value: string): void;
}

export interface IProducts {
  [key: number]: number;
}

export interface IProductsPage {
  render(): HTMLElement;
}

export enum CheckSort {
  A,
  B,
}
export enum DataAttribut {
  Price = "data-price",
  Rating = "data-rating",
  Stock = "data-stock",
  Category = "data-category",
  Brand = "data-brand",
  All = "data-all",
  Id = "data-id",
}

export interface ISortProducts {
  select: HTMLSelectElement | null;
  container: HTMLElement | null;
  filter: HTMLElement;
  catalog: HTMLElement;
  cardGoods: NodeListOf<HTMLElement>;
  searchEl: HTMLElement | null;
  sort(): void;
  sortArray(dataAttribut: DataAttribut, checkSort: CheckSort): void;
  search(): void;
  writeResSearch(flag: number): void;
  filterByCategory(
    selector: DataAttribut,
    value: string,
    nameClass: string
  ): void;
  filterByPriceStock(
    numberFilter: number,
    class1: string,
    class2: string,
    atribute: DataAttribut,
    val?: string
  ): void;
  resetFilter(): void;
  getParams(): void;
  writeChecbox(value: string, attribyte: DataAttribut, nameClass: string): void;
  writeInput(
    query: string,
    num: number,
    class1: string,
    class2: string,
    data: string
  ): void;
}

export interface IDualSlider {
  fromSlider: HTMLInputElement;
  toSlider: HTMLInputElement;
  fromParagraph: HTMLElement;
  toParagraph: HTMLElement;
  controlFromSlider(val?: string): void;
  controlToSlider(val?: string): void;
  getParsed(): number[];
  setToggleAccessible(): void;
}
