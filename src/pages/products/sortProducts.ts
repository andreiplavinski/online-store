import {
  countProductView,
  controlSliders,
  controlSlidersNoneResult,
} from "./function";

import { CheckSort, DataAttribut, ISortProducts, IDualSlider } from "./types";

const currentUrl = window.location.href;
const url = new URL(currentUrl);

class SortProducts implements ISortProducts {
  select: HTMLSelectElement | null;
  container: HTMLElement | null;
  filter: HTMLElement;
  catalog: HTMLElement;
  cardGoods: NodeListOf<HTMLElement>;
  searchEl: HTMLElement | null;

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
    this.resetFilter();
  }

  sort(): void {
    this.select?.addEventListener("change", (e: Event) => {
      if (e.target instanceof HTMLSelectElement && this.container) {
        if (e.target.value === "1") {
          this.sortArray<DataAttribut, CheckSort>(
            DataAttribut.Price,
            CheckSort.A
          );

          url.searchParams.set("sort", "priceAsd");
          window.history.replaceState({}, "", url);
        }
        if (e.target.value === "2") {
          this.sortArray<DataAttribut, CheckSort>(
            DataAttribut.Price,
            CheckSort.B
          );
          url.searchParams.set("sort", "priceDesc");
          window.history.replaceState({}, "", url);
        }

        if (e.target.value === "3") {
          this.sortArray<DataAttribut, CheckSort>(
            DataAttribut.Rating,
            CheckSort.A
          );
          url.searchParams.set("sort", "rateAsd");
          window.history.replaceState({}, "", url);
        }

        if (e.target.value === "4") {
          this.sortArray(DataAttribut.Rating, CheckSort.B);
          url.searchParams.set("sort", "rateDesc");
          window.history.replaceState({}, "", url);
        }

        if (e.target.value === "5") {
          this.sortArray<DataAttribut, CheckSort>(
            DataAttribut.Stock,
            CheckSort.A
          );
          url.searchParams.set("sort", "stockAsd");
          window.history.replaceState({}, "", url);
        }

        if (e.target.value === "6") {
          this.sortArray<DataAttribut, CheckSort>(
            DataAttribut.Stock,
            CheckSort.B
          );
          url.searchParams.set("sort", "stockDesc");
          window.history.replaceState({}, "", url);
        }
      }
    });
  }

  sortArray<T extends string, U>(dataAttribut: T, checkSort: U): void {
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

  search(): void {
    const searchField: HTMLInputElement | null =
      this.catalog.querySelector(".catalog__search");

    if (searchField instanceof HTMLInputElement) {
      searchField.addEventListener("input", () => {
        const text: string = searchField.value.toLowerCase();

        if (text !== "") {
          this.cardGoods.forEach((elem) => {
            elem.getAttribute(text);
            if (
              elem.getAttribute(DataAttribut.All)?.toLowerCase().search(text) ==
              -1
            ) {
              elem.classList.add("card-none");

              this.writeResSearch(3);
            } else {
              elem.classList.remove("card-none");
              this.writeResSearch(3);
            }
          });
        } else {
          this.cardGoods.forEach((elem) => {
            elem.classList.remove("card-none");
            this.writeResSearch(3);
          });
        }

        url.searchParams.set("search", `${text}`);
        window.history.replaceState({}, "", url);

        if (url.searchParams.get("search") === "") {
          url.searchParams.delete("search");
          window.history.replaceState({}, "", url);
        }
      });
    }
  }

  writeResSearch(flag: number): void {
    if (this.searchEl) {
      const ArrContentView: Array<HTMLElement> = [];
      const arrPriceView: Array<number> = [];
      const arrStockView: Array<number> = [];
      const arrCategView: Array<string> = [];
      const arrBrandView: Array<string> = [];

      for (let i = 0; i < this.cardGoods.length; i++) {
        if (!(getComputedStyle(this.cardGoods[i]).display == "none")) {
          ArrContentView.push(this.cardGoods[i]);
          arrPriceView.push(
            Number(this.cardGoods[i].getAttribute(DataAttribut.Price))
          );
          arrStockView.push(
            Number(this.cardGoods[i].getAttribute(DataAttribut.Stock))
          );
          arrCategView.push(
            String(this.cardGoods[i].getAttribute(DataAttribut.Category))
          );
          arrBrandView.push(
            String(this.cardGoods[i].getAttribute(DataAttribut.Brand))
          );
        }
      }

      countProductView(this.filter, "Category", arrCategView);
      countProductView(this.filter, "Brand", arrBrandView);
      if (flag === 1) {
        controlSliders(this.filter, arrPriceView, ArrContentView, 0, "€");
        controlSlidersNoneResult(this.filter, ArrContentView, 1);
      }
      if (flag === 2) {
        controlSliders(this.filter, arrStockView, ArrContentView, 1, "");
        controlSlidersNoneResult(this.filter, ArrContentView, 0);
      }
      if (flag === 3) {
        controlSliders(this.filter, arrPriceView, ArrContentView, 0, "€");
        controlSliders(this.filter, arrStockView, ArrContentView, 1, "");
      }

      const emptyContainer = this.container?.querySelector(".catalog__empty");
      if (ArrContentView.length === 0) {
        emptyContainer?.classList.add("catalog__empty_view");
      } else {
        emptyContainer?.classList.remove("catalog__empty_view");
      }

      this.searchEl.textContent = `Found: ${ArrContentView.length}`;
    }
  }

  filterByCategory(
    selector: DataAttribut,
    value: string,
    nameClass: string
  ): void {
    const filtcat: NodeListOf<HTMLInputElement> = this.filter.querySelectorAll(
      `input[name="${value}"]`
    );
    let ArrClick: Array<string | null> = [];
    if (url.searchParams.has(`${selector}`)) {
      ArrClick = String(url.searchParams.get(`${selector}`)).split("/");
    }
    filtcat.forEach((el) => {
      el.addEventListener("click", () => {
        if (el.checked) {
          ArrClick.push(el.value);
        } else {
          ArrClick.splice(ArrClick.indexOf(el.value), 1);
        }

        this.cardGoods.forEach((item) => {
          if (ArrClick.includes(item.getAttribute(selector))) {
            item.classList.remove(nameClass);
            this.writeResSearch(3);
          } else if (ArrClick.length === 0) {
            item.classList.remove(nameClass);
            this.writeResSearch(3);
          } else {
            item.classList.add(nameClass);
            this.writeResSearch(3);
          }
        });

        url.searchParams.set(
          `${selector}`,
          `${ArrClick.filter((el, index) => {
            return ArrClick.indexOf(el) === index;
          }).join("/")}`
        );
        window.history.replaceState({}, "", url);
        if (ArrClick.length === 0) {
          url.searchParams.delete(`${selector}`);
          window.history.replaceState({}, "", url);
        }
      });
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

        url.searchParams.set(
          `${atribute}`,
          `${inputFilterFrom.value}/${inputFilterTo.value}`
        );
        window.history.replaceState({}, "", url);
        if (
          url.searchParams.get(`${atribute}`) ===
          `${inputFilterFrom.min}/${inputFilterTo.max}`
        ) {
          url.searchParams.delete(`${atribute}`);
          window.history.replaceState({}, "", url);
        }
      });

      inputFilterFrom.addEventListener("change", () => {
        if (numberFilter === 0) {
          this.writeResSearch(2);
        } else if (numberFilter === 1) {
          this.writeResSearch(1);
        }
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

        url.searchParams.set(
          `${atribute}`,
          `${inputFilterFrom.value}/${inputFilterTo.value}`
        );
        window.history.replaceState({}, "", url);

        if (
          url.searchParams.get(`${atribute}`) ===
          `${inputFilterFrom.min}/${inputFilterTo.max}`
        ) {
          url.searchParams.delete(`${atribute}`);
          window.history.replaceState({}, "", url);
        }
      });
      inputFilterTo.addEventListener("change", () => {
        if (numberFilter === 0) {
          this.writeResSearch(2);
        } else if (numberFilter === 1) {
          this.writeResSearch(1);
        }
      });
    }
  }

  resetFilter(): void {
    const buttonReset: HTMLInputElement | null =
      this.filter.querySelector("#filter0");

    buttonReset?.addEventListener("click", () => {
      const search: HTMLInputElement | null =
        document.querySelector(".catalog__search");
      if (search instanceof HTMLInputElement) {
        search.value = "";
      }

      this.cardGoods.forEach((elem) => {
        elem.classList.remove("card-none");
        elem.classList.remove("card-none-filter");
        elem.classList.remove("card-none-filter1");
        elem.classList.remove("card_none-price");
        elem.classList.remove("card_none-price1");
        elem.classList.remove("card-none-stock");
        elem.classList.remove("card-none-stock1");
      });

      const checkBox: NodeListOf<HTMLInputElement> =
        this.filter.querySelectorAll(`input[type="checkbox"]`);

      checkBox.forEach((el) => {
        el.checked = false;
      });

      url.searchParams.delete("search");
      window.history.replaceState({}, "", url);
      url.searchParams.delete("data-price");
      window.history.replaceState({}, "", url);
      url.searchParams.delete("data-stock");
      window.history.replaceState({}, "", url);
      url.searchParams.delete("data-category");
      window.history.replaceState({}, "", url);
      url.searchParams.delete("data-brand");

      window.history.replaceState({}, "", url);

      this.writeResSearch(3);
    });
    buttonReset?.addEventListener("click", () => {
      location.reload();
    });
  }

  getParams(): void {
    const clickBut = this.catalog.querySelectorAll(".catalog__var-view");
    clickBut[0].addEventListener("click", () => {
      clickBut[0].classList.add("catalog__var-view-active");
      clickBut[1].classList.remove("catalog__var-view-active");

      url.searchParams.set("size-card", "4");
      window.history.replaceState({}, "", url);
    });
    clickBut[1].addEventListener("click", () => {
      clickBut[1].classList.add("catalog__var-view-active");
      clickBut[0].classList.remove("catalog__var-view-active");

      url.searchParams.set("size-card", "6");
      window.history.replaceState({}, "", url);
    });

    if (url.searchParams.has("size-card")) {
      const cardBlock: NodeListOf<HTMLElement> =
        this.catalog.querySelectorAll(".card");
      const cardInfo: NodeListOf<HTMLElement> =
        this.catalog.querySelectorAll(".card__description");
      if (url.searchParams.get("size-card") === "4") {
        cardBlock.forEach((elem, i) => {
          elem.style.width = "24%";
          elem.style.minHeight = "225px";
          cardInfo[i].style.display = "block";
        });
        clickBut[0].classList.add("catalog__var-view-active");
        clickBut[1].classList.remove("catalog__var-view-active");
      } else if (url.searchParams.get("size-card") === "6") {
        cardBlock.forEach((elem, i) => {
          elem.style.width = "15.66%";
          elem.style.minHeight = "100px";
          cardInfo[i].style.display = "none";
        });
        clickBut[1].classList.add("catalog__var-view-active");
        clickBut[0].classList.remove("catalog__var-view-active");
      }
    }

    if (url.searchParams.has("sort")) {
      if (url.searchParams.get("sort") === "priceAsd" && this.select) {
        this.select.value = "1";
        this.sortArray(DataAttribut.Price, CheckSort.A);
      }

      if (url.searchParams.get("sort") === "priceDesc" && this.select) {
        this.select.value = "2";
        this.sortArray(DataAttribut.Price, CheckSort.B);
      }

      if (url.searchParams.get("sort") === "rateAsd" && this.select) {
        this.select.value = "3";
        this.sortArray(DataAttribut.Rating, CheckSort.A);
      }

      if (url.searchParams.get("sort") === "rateDesc" && this.select) {
        this.select.value = "4";
        this.sortArray(DataAttribut.Rating, CheckSort.B);
      }

      if (url.searchParams.get("sort") === "stockAsd" && this.select) {
        this.select.value = "5";
        this.sortArray(DataAttribut.Stock, CheckSort.A);
      }

      if (url.searchParams.get("sort") === "stockDesc" && this.select) {
        this.select.value = "6";
        this.sortArray(DataAttribut.Stock, CheckSort.B);
      }
    } else {
      if (this.select) {
        this.select.value = "0";
        this.sortArray(DataAttribut.Id, CheckSort.A);
      }
    }

    const searchField: HTMLInputElement | null =
      this.catalog.querySelector(".catalog__search");

    if (
      url.searchParams.has("search") &&
      searchField instanceof HTMLInputElement
    ) {
      searchField.value = url.searchParams.get("search") || "";

      this.cardGoods.forEach((elem) => {
        if (
          elem
            .getAttribute(DataAttribut.All)
            ?.toLowerCase()
            .search(url.searchParams.get("search") || "") == -1
        ) {
          elem.classList.add("card-none");
        }
      });
    }

    if (url.searchParams.has("data-price")) {
      this.writeInput(
        "data-price",
        0,
        "card_none-price",
        "card_none-price1",
        DataAttribut.Price
      );
    }

    if (url.searchParams.has("data-stock")) {
      this.writeInput(
        "data-stock",
        1,
        "card-none-stock",
        "card-none-stock1",
        DataAttribut.Stock
      );
    }

    this.writeChecbox("Category", DataAttribut.Category, "card-none-filter");
    this.writeChecbox("Brand", DataAttribut.Brand, "card-none-filter1");
  }

  writeChecbox(
    value: string,
    attribyte: DataAttribut,
    nameClass: string
  ): void {
    const filtcat: NodeListOf<HTMLInputElement> = this.filter.querySelectorAll(
      `input[name="${value}"]`
    );

    if (url.searchParams.has(attribyte)) {
      const arrayFromQyuery: string[] | undefined = url.searchParams
        .get(attribyte)
        ?.split("/");
      console.log(arrayFromQyuery);

      filtcat.forEach((el) => {
        if (arrayFromQyuery?.includes(el.value)) {
          el.checked = true;
        }
      });

      this.cardGoods.forEach((item) => {
        if (!arrayFromQyuery?.includes(String(item.getAttribute(attribyte)))) {
          item.classList.add(nameClass);
        }
      });
    }
  }

  writeInput(
    query: string,
    num: number,
    class1: string,
    class2: string,
    data: string
  ): void {
    const prisMin = url.searchParams
      .get(query)
      ?.substring(0, url.searchParams.get(query)?.indexOf("/"));

    const prisMax = url.searchParams
      .get(query)
      ?.substring(Number(url.searchParams.get(query)?.indexOf("/")))
      .replace("/", "");

    const inputFilterFrom: Element =
      this.filter.querySelectorAll(".fromSlider")[num];
    const inputFilterTo: Element =
      this.filter.querySelectorAll(".toSlider")[num];

    const textFrom: Element = this.filter.querySelectorAll(
      ".filter-block__min-value"
    )[num];
    const textTo: Element = this.filter.querySelectorAll(
      ".filter-block__max-value"
    )[num];

    textFrom.textContent = String(prisMin);
    textTo.textContent = String(prisMax);

    if (inputFilterFrom instanceof HTMLInputElement) {
      inputFilterFrom.value = String(prisMin);
    }

    if (inputFilterTo instanceof HTMLInputElement) {
      inputFilterTo.value = String(prisMax);
    }

    this.cardGoods.forEach((el) => {
      if (
        inputFilterFrom instanceof HTMLInputElement &&
        Number(el.getAttribute(data)) < +inputFilterFrom.value
      ) {
        el.classList.add(class1);
      }
      if (
        inputFilterTo instanceof HTMLInputElement &&
        Number(el.getAttribute(data)) > +inputFilterTo.value
      ) {
        el.classList.add(class2);
      }
    });
  }
}

export default SortProducts;

class DualSlider implements IDualSlider {
  fromSlider: HTMLInputElement;
  toSlider: HTMLInputElement;
  fromParagraph: HTMLElement;
  toParagraph: HTMLElement;

  constructor(
    fromSlider: HTMLInputElement,
    toSlider: HTMLInputElement,
    fromParagraph: HTMLElement,
    toParagraph: HTMLElement
  ) {
    this.fromSlider = fromSlider;
    this.toSlider = toSlider;
    this.fromParagraph = fromParagraph;
    this.toParagraph = toParagraph;
  }

  controlFromSlider(val?: string): void {
    const [from, to] = this.getParsed();
    if (from > to) {
      this.fromSlider.value = String(to);
      this.fromParagraph.textContent = `${val} ${to}`;
    } else {
      this.fromParagraph.textContent = `${val} ${from}`;
    }
  }

  controlToSlider(val?: string): void {
    const [from, to] = this.getParsed();
    this.setToggleAccessible();
    if (from <= to) {
      this.toSlider.value = String(to);
      this.toParagraph.textContent = `${val} ${to}`;
    } else {
      this.toParagraph.textContent = `${val} ${from}`;
      this.toSlider.value = String(from);
    }
  }

  getParsed(): number[] {
    const from: number = parseInt(this.fromSlider.value, 10);
    const to: number = parseInt(this.toSlider.value, 10);
    return [from, to];
  }

  setToggleAccessible(): void {
    if (Number(this.toSlider.value) <= 0) {
      this.toSlider.style.zIndex = "2";
    } else {
      this.toSlider.style.zIndex = "0";
    }

    if (this.fromSlider.value === this.fromSlider.max) {
      this.fromSlider.style.zIndex = "3";
    } else {
      this.fromSlider.style.zIndex = "0";
    }

    if (this.toSlider.value === this.fromSlider.min) {
      this.toSlider.style.zIndex = "3";
    } else {
      this.toSlider.style.zIndex = "0";
    }
  }
}
