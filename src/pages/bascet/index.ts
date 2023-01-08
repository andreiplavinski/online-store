import Page from "../../scripts/templates/page";
import data from "../../data/data.json";
import buyWindow from "../window";
import "./bascet.scss";

interface IProducts {
  [key: number]: number;
}

interface IDiscounts {
  [key: string]: number;
}

class BascetPage extends Page {
  dataBase = data.products;
  dataIdBase = this.dataBase.map((x) => x.id);

  products: IProducts = {};
  discounts: IDiscounts = {};

  totalPrice = 0;
  totalProduct = 0;
  cardsLimit = 0;
  pageCounter = 0;
  cardCounter = 0;

  constructor(tagName: string, id: string, className: string) {
    super(tagName, id, className);
  }

  protected getData() {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    if (!localStorage.getItem("product")) {
      this.products = {};
    } else {
      this.products = JSON.parse(localStorage.getItem("product") || "{}");
    }

    if (!localStorage.getItem("discount")) {
      this.discounts = {};
    } else {
      this.discounts = JSON.parse(localStorage.getItem("discount") || "{}");
    }

    if (
      new RegExp("^[1-9][0-9]?$").test(url.searchParams.get("page") as string)
    ) {
      this.pageCounter = Number(url.searchParams.get("page"));
    } else {
      this.pageCounter = 1;
    }

    if (
      new RegExp("^[1-9][0-9]?$").test(url.searchParams.get("limit") as string)
    ) {
      this.cardsLimit = Number(url.searchParams.get("limit"));
    } else {
      this.cardsLimit = 3;
    }

    if (localStorage.getItem("windowFlag")) {
      this.createWindow();
    }
  }

  protected setData(data: string) {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    if (data === "page") {
      url.searchParams.set("page", `${this.pageCounter}`);
      window.history.replaceState({}, "", url);
    }
    if (data === "limit") {
      url.searchParams.set("limit", `${this.cardsLimit}`);
      window.history.replaceState({}, "", url);
    }
    if (data === "product") {
      localStorage.setItem("product", JSON.stringify(this.products));
    }
    if (data === "discount") {
      localStorage.setItem("discount", JSON.stringify(this.discounts));
    }
  }

  protected changeProducts(id: number, operation: string) {
    if (id in this.products && operation === "+") {
      this.products[id] = this.products[id] + 1;
    } else if (id in this.products && operation === "-") {
      if (this.products[id] === 1) {
        delete this.products[id];
        const cartWraper = document.querySelector(".cart__wraper");
        if (cartWraper instanceof HTMLElement) {
          const parent = cartWraper.parentNode;
          parent?.removeChild(cartWraper);
          parent?.append(this.createCards(this.products));
        }
      } else {
        this.products[id] = this.products[id] - 1;
      }
    }
    this.setData("product");
  }

  protected createCards(products: IProducts) {
    this.totalPrice = 0;
    this.totalProduct = 0;
    this.cardCounter = 1;

    const cartWraper = document.createElement("div");
    cartWraper.className = "cart__wraper";

    let viewFlag = false;

    for (const [id, quantity] of Object.entries(products)) {
      let quantityProduct: number = quantity;
      this.totalProduct += quantityProduct;
      if (id in this.dataIdBase) {
        const selectItem = this.dataBase[Number(id) - 1];

        const card = document.createElement("div");
        card.className = "cart__card";

        const cartCounter = document.createElement("p");
        cartCounter.innerText = String(this.cardCounter);
        card.classList.add("hide");

        this.cardCounter += 1;

        if (
          this.cardCounter <= this.cardsLimit * this.pageCounter + 1 &&
          this.cardCounter >
            this.cardsLimit * this.pageCounter - this.cardsLimit + 1
        ) {
          card.classList.add("view");
          viewFlag = true;
        }
        cartCounter.className = "cart__counter";

        const photo = document.createElement("div");
        photo.className = "cart__photo";

        const photoImage = document.createElement("img");
        photoImage.className = "cart__photo-image";
        if (photoImage instanceof HTMLImageElement) {
          photoImage.src = `${selectItem.images[0]}`;
          photo.append(photoImage);
        }

        const descriptions = document.createElement("div");
        descriptions.className = "cart__descriptions";
        for (let i = 0; i < 4; i++) {
          const descriptionItem = document.createElement("p");
          descriptionItem.className = "cart__description";
          if (i === 0) {
            descriptionItem.innerText = selectItem.title;
          }
          if (i === 1) {
            descriptionItem.innerText = selectItem.description;
          }
          if (i === 2) {
            descriptionItem.innerText = `Rating: ${String(selectItem.rating)}`;
          }
          if (i === 3) {
            descriptionItem.innerText = `Discount: ${String(
              selectItem.discountPercentage
            )}%`;
          }
          descriptions.append(descriptionItem);
        }

        const amount = document.createElement("div");
        amount.className = "cart__amount amount";

        const stock = document.createElement("p");
        stock.innerText = `Stock: ${String(selectItem.stock)}`;
        stock.className = "amount__stock";

        const price = document.createElement("p");
        price.innerText = `€${String(selectItem.price * quantityProduct)}`;
        this.totalPrice += selectItem.price * quantityProduct;
        price.className = "amount__price";

        const amountWraper = document.createElement("div");
        amountWraper.className = "amount__wraper";

        const addButton = document.createElement("button");
        addButton.className = "amount__button";
        addButton.innerText = "+";

        const removeButton = document.createElement("button");
        removeButton.innerText = "-";
        removeButton.className = "amount__button";

        const amountCounter = document.createElement("p");
        amountCounter.innerText = String(quantityProduct);
        amountCounter.className = "amount__counter";

        amountWraper.append(addButton, amountCounter, removeButton);
        amount.append(stock, amountWraper, price);
        card.append(cartCounter, photo, descriptions, amount);
        cartWraper.append(card);

        addButton.addEventListener("click", () => {
          if (quantityProduct + 1 <= selectItem.stock) {
            quantityProduct += 1;
            amountCounter.innerText = String(quantityProduct);
            price.innerText = `€${String(selectItem.price * quantityProduct)}`;
            this.totalPrice += selectItem.price;
            this.totalProduct += 1;
            this.changeProducts(Number(id), "+");

            const summaryWraper = document.querySelector(".summary__wraper");
            if (summaryWraper instanceof HTMLElement) {
              const parent = summaryWraper.parentNode;
              parent?.removeChild(summaryWraper);
              parent?.append(this.createSummary());
            }
          }
        });

        removeButton.addEventListener("click", () => {
          if (quantityProduct - 1 >= 0) {
            quantityProduct -= 1;
            amountCounter.innerText = String(quantityProduct);
            price.innerText = `€${String(selectItem.price * quantityProduct)}`;
            this.totalPrice -= selectItem.price;
            this.totalProduct -= 1;
            this.changeProducts(Number(id), "-");

            const summaryWraper = document.querySelector(".summary__wraper");
            if (summaryWraper instanceof HTMLElement) {
              const parent = summaryWraper.parentNode;
              parent?.removeChild(summaryWraper);
              parent?.append(this.createSummary());
            }
          }
        });
      }
    }

    if (viewFlag === false && this.pageCounter > 1) {
      this.pageCounter -= 1;
      this.setData("page");

      const cartPageCounter = document.querySelector(".page-counter__value");
      if (cartPageCounter instanceof HTMLElement) {
        cartPageCounter.innerText = String(this.pageCounter);
      }

      cartWraper.innerHTML = this.createCards(this.products).innerHTML;
    } else if (viewFlag === false && this.pageCounter === 1) {
      const page = document.querySelector(".basket-page");
      if (page instanceof HTMLElement) {
        page.innerHTML = "";
        const emptyMessage = document.createElement("p");
        emptyMessage.innerText = "Cart is Empty";
        emptyMessage.className = "cart__empty-message";
        page.append(emptyMessage);
      }
    }

    return cartWraper;
  }

  createSummary() {
    const sumWraper = document.createElement("div");
    sumWraper.className = "summary__wraper";

    const sumCounter = document.createElement("p");
    sumCounter.innerText = `Products: ${this.totalProduct}`;

    sumCounter.className = "summary__counter";

    const totalPrice = document.createElement("p");
    totalPrice.innerText = `Total: €${this.totalPrice}`;
    totalPrice.className = "summary__price";

    const oldPrice = document.createElement("p");
    oldPrice.className = "summary__old-price";
    oldPrice.classList.add("hide");

    const promo = document.createElement("div");
    promo.className = "summary__promo promo";

    const promoTitle = document.createElement("p");
    promoTitle.innerText = "Use promo code:";
    promoTitle.className = "promo__title";

    const promoInner = document.createElement("input");
    promoInner.title = "hello";
    promoInner.type = "text";
    promoInner.placeholder = "input 'RS', '2023', 'Student 1'";
    promoInner.className = "promo__inner";

    const promoAddWraper = document.createElement("div");
    promoAddWraper.className = "promo__add-wraper";
    promoAddWraper.classList.add("hide");

    const promoAddText = document.createElement("p");
    promoAddText.className = "promo__add-text";

    const promoAddButton = document.createElement("button");
    promoAddButton.innerText = "ADD";
    promoAddButton.className = "promo__add-button";

    const promoAppliedWraper = document.createElement("div");
    promoAppliedWraper.className = "promo__applied-wraper";
    promoAppliedWraper.innerHTML = "";
    promoAppliedWraper.classList.add("hide");

    const promoAppliedTitle = document.createElement("p");
    promoAppliedTitle.className = "promo__applied-title";

    if (Object.keys(this.discounts).length === 0) {
      promoAppliedWraper.classList.remove("view");
      oldPrice.classList.remove("view");
      this.createCards(this.products);
      totalPrice.innerText = `Total: €${this.totalPrice}`;
    } else {
      this.createCards(this.products);
      oldPrice.innerText = String(`Old price: €${this.totalPrice.toFixed(2)}`);
      oldPrice.classList.add("view");
      let sum = 0;
      for (const value of Object.values(this.discounts)) {
        sum += value;
      }

      promoAppliedTitle.innerText = `Your discount is: ${sum}%`;

      this.totalPrice = this.totalPrice - (this.totalPrice * sum) / 100;

      totalPrice.innerText = `Total: €${this.totalPrice.toFixed(2)}`;

      for (const [key, value] of Object.entries(this.discounts)) {
        const promoAppliedItem = document.createElement("div");
        promoAppliedItem.className = "promo__applied-item";

        const promoAppliedText = document.createElement("p");
        promoAppliedText.className = "promo__applied-text";
        promoAppliedText.innerText = `"${key}" ✓`;

        const promoDropButton = document.createElement("button");
        promoDropButton.setAttribute("data-discount", `${key}:${value}`);
        promoDropButton.innerText = "DROP";
        promoDropButton.className = "promo__drop-button";

        promoAppliedItem.append(promoAppliedText, promoDropButton);
        promoAppliedWraper.append(promoAppliedItem);

        promoAppliedWraper.classList.add("view");

        promoDropButton.addEventListener("click", (e) => {
          if (e.target instanceof HTMLElement) {
            const discount = e.target.getAttribute("data-discount");
            if (typeof discount === "string") {
              delete this.discounts[discount?.split(":")[0]];
            }
            promoDropButton.parentElement?.remove();
          }
          this.setData("discount");
          const parent = sumWraper.parentNode;
          parent?.removeChild(sumWraper);
          parent?.append(this.createSummary());
        });
      }
    }

    const buyButton = document.createElement("button");
    buyButton.innerText = "BUY NOW";
    buyButton.className = "summary__button";

    buyButton.addEventListener("click", this.createWindow);

    promoInner.addEventListener("input", (e) => {
      if (e.target instanceof HTMLInputElement) {
        const value = e.target.value;
        if (value === "RS" && !this.discounts["RS"]) {
          promoAddButton.setAttribute("data-discount", "RS:10");
          promoAddText.innerText = "Rolling Scopes School - 10%";
          promoAddWraper.classList.add("view");
        } else if (value === "2023" && !this.discounts["2023"]) {
          promoAddButton.setAttribute("data-discount", "2023:23");
          promoAddText.innerText = "Happy new year! - 23%";
          promoAddWraper.classList.add("view");
        } else if (value === "Student 1" && !this.discounts["Student 1"]) {
          promoAddButton.setAttribute("data-discount", "Student:1");
          promoAddText.innerText = "Nobody loves you - 1%";
          promoAddWraper.classList.add("view");
        } else {
          promoAddWraper.classList.remove("view");
        }
      }
    });

    promoAddButton.addEventListener("click", (e) => {
      if (e.target instanceof HTMLElement) {
        const discount = e.target.getAttribute("data-discount");
        if (typeof discount === "string") {
          this.discounts[discount?.split(":")[0]] = Number(
            discount?.split(":")[1]
          );
          promoAddWraper.classList.remove("view");
          this.setData("discount");

          const parent = sumWraper.parentNode;
          parent?.removeChild(sumWraper);
          parent?.append(this.createSummary());
        }
      }
    });

    promoAddWraper.append(promoAddText, promoAddButton);
    promoAppliedWraper.append(promoAppliedTitle);
    promo.append(promoAppliedWraper, promoTitle, promoInner, promoAddWraper);
    sumWraper.append(sumCounter, oldPrice, totalPrice, promo, buyButton);

    return sumWraper;
  }

  protected createCartHeader() {
    const cartHeader = document.createElement("div");
    cartHeader.className = "cart__header";

    const cartTitle = document.createElement("p");
    cartTitle.innerText = "Products In Cart:";
    cartTitle.className = "cart__title";

    const cartLimit = document.createElement("div");
    cartLimit.className = "cart__limit";

    const cartLimitText = document.createElement("span");
    cartLimitText.innerText = "Limit:";
    cartLimitText.className = "cart__span-limit";

    const cartLimitInput = document.createElement("input");
    cartLimitInput.type = "number";
    cartLimitInput.value = String(this.cardsLimit);
    cartLimitInput.min = String(1);
    cartLimitInput.max = String(this.cardCounter - 1);
    cartLimitInput.className = "cart__input-limit";

    cartLimitInput?.addEventListener("change", (event) => {
      const value = (event.target as HTMLInputElement).value;
      this.cardsLimit = Number(value);
      this.setData("limit");
      const cartWraper = document.querySelector(".cart__wraper");
      if (cartWraper instanceof HTMLElement) {
        const parent = cartWraper.parentNode;
        parent?.removeChild(cartWraper);
        parent?.append(this.createCards(this.products));
      }
    });

    const cartPageWraper = document.createElement("div");
    cartPageWraper.className = "cart__page page-counter";

    const cartPageSpan = document.createElement("span");
    cartPageSpan.innerText = "Page:";
    cartPageSpan.className = "page-counter__span";

    const cartLeftButton = document.createElement("button");
    cartLeftButton.innerText = "<";
    cartLeftButton.className = "page-counter__button";

    const cartRightButton = document.createElement("button");
    cartRightButton.innerText = ">";
    cartRightButton.className = "page-counter__button";

    const cartPageCounter = document.createElement("p");
    cartPageCounter.innerText = String(this.pageCounter);
    cartPageCounter.className = "page-counter__value";

    cartRightButton?.addEventListener("click", () => {
      if (
        this.pageCounter + 1 <
        Object.keys(this.products).length / this.cardsLimit + 1
      ) {
        this.pageCounter += 1;
        cartPageCounter.innerText = String(this.pageCounter);
        const cartWraper = document.querySelector(".cart__wraper");
        if (cartWraper instanceof HTMLElement) {
          const parent = cartWraper.parentNode;
          parent?.removeChild(cartWraper);
          parent?.append(this.createCards(this.products));
        }
      }
      this.setData("page");
    });

    cartLeftButton?.addEventListener("click", () => {
      if (this.pageCounter - 1 > 0) {
        this.pageCounter -= 1;
        cartPageCounter.innerText = String(this.pageCounter);
        const cartWraper = document.querySelector(".cart__wraper");
        if (cartWraper instanceof HTMLElement) {
          const parent = cartWraper.parentNode;
          parent?.removeChild(cartWraper);
          parent?.append(this.createCards(this.products));
        }
      }
      this.setData("page");
    });

    cartLimit.append(cartLimitText, cartLimitInput);

    cartPageWraper.append(
      cartPageSpan,
      cartLeftButton,
      cartPageCounter,
      cartRightButton
    );

    cartHeader.append(cartTitle, cartLimit, cartPageWraper);
    return cartHeader;
  }

  protected createPage(products: IProducts) {
    const page = document.createElement("div");
    page.className = "basket-page";

    const cart = document.createElement("div");
    cart.className = "basket-page__cart cart";

    const cards = this.createCards(products);

    const cartHeader = this.createCartHeader();

    const summary = document.createElement("div");
    summary.className = "basket-page__summary summary";

    const summaryTitle = document.createElement("p");
    summaryTitle.innerText = "Summary";
    summaryTitle.className = "summary__title";

    const summaryWraper = this.createSummary();
    summary.append(summaryTitle, summaryWraper);
    cart.append(cartHeader, cards);
    page.append(cart, summary);

    return page;
  }

  createWindow() {
    const newWindow = new buyWindow();
    const modalWindow = newWindow.createContent();
    const page = document.querySelector("html");
    if (page !== null) {
      page.append(modalWindow);
    }
  }

  render() {
    this.getData();
    const page = this.createPage(this.products);

    if (page instanceof HTMLDivElement) {
      if (Object.keys(this.products).length === 0) {
        page.innerHTML = "";
        const emptyMessage = document.createElement("p");
        emptyMessage.innerText = "Cart is Empty";
        emptyMessage.className = "cart__empty-message";
        page.append(emptyMessage);
        this.container.append(page);
        return this.container;
      } else {
        this.container.append(page);
        return this.container;
      }
    } else {
      throw new Error("PAGE CREATE FAILED!");
    }
  }
}

export default BascetPage;
