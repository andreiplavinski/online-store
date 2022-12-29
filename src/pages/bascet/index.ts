import Page from "../../scripts/templates/page";
import data from "../../data/data.json";
import "./bascet.scss";

interface IProducts {
  [key: number]: number;
}

class BascetPage extends Page {
  dataBase = data.products;
  dataIdBase = this.dataBase.map((x) => x.id);

  products: IProducts;
  totalPrice = 0;
  totalProduct = 0;
  cardsLimit = 3;
  pageCounter = 1;

  constructor(
    tagName: string,
    id: string,
    className: string,
    products: IProducts
  ) {
    super(tagName, id, className);
    this.products = products;
  }

  protected changeProducts(id: number, operation: string) {
    if (id in this.products) {
      if (operation === "+") {
        this.products[id] = this.products[id] + 1;
      }
      if (operation === "-") {
        if (this.products[id] === 1) {
          delete this.products[id];
          const cartWraper = document.querySelector(".cart__wraper");
          if (cartWraper instanceof HTMLElement) {
            cartWraper.innerHTML = "";
            cartWraper.append(this.createCards(this.products));
          }
        } else {
          this.products[id] = this.products[id] - 1;
        }
      }
    }
  }

  protected createCards(products: IProducts) {
    this.totalPrice = 0;
    this.totalProduct = 0;

    const cartWraper = document.createElement("div");
    cartWraper.className = "cart__wraper";

    let cardCounter = 1;
    let viewFlag = false;

    for (const [id, quantity] of Object.entries(products)) {
      let quantityProduct: number = quantity;
      this.totalProduct += quantityProduct;
      if (id in this.dataIdBase) {
        const selectItem = this.dataBase[Number(id) - 1];

        const card = document.createElement("div");
        card.className = "cart__card";

        const cartCounter = document.createElement("p");
        cartCounter.innerText = String(cardCounter);
        card.classList.add("hide");

        cardCounter += 1;
        if (
          cardCounter <= this.cardsLimit * this.pageCounter + 1 &&
          cardCounter > this.cardsLimit * this.pageCounter - this.cardsLimit + 1
        ) {
          card.classList.add("view");
          viewFlag = true;
        }
        cartCounter.className = "cart__counter";

        const photo = document.createElement("div");
        photo.style.backgroundImage = `url(${selectItem.images[1]})`;
        photo.className = "cart__photo";

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
            const sumCounter = document.querySelector(".summary__counter");
            if (sumCounter instanceof HTMLElement) {
              sumCounter.innerText = `Products: ${this.totalProduct}`;
            }
            const totalPrice = document.querySelector(".summary__price");
            if (totalPrice instanceof HTMLElement) {
              totalPrice.innerText = `Total: €${this.totalPrice}`;
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
            const sumCounter = document.querySelector(".summary__counter");
            if (sumCounter instanceof HTMLElement) {
              sumCounter.innerText = `Products: ${this.totalProduct}`;
            }
            const totalPrice = document.querySelector(".summary__price");
            if (totalPrice instanceof HTMLElement) {
              totalPrice.innerText = `Total: €${this.totalPrice}`;
            }
          }
        });
      }
    }

    if (viewFlag === false && this.pageCounter > 1) {
      this.pageCounter -= 1;

      const cartPageCounter = document.querySelector(".page-counter__value");
      if (cartPageCounter instanceof HTMLElement) {
        cartPageCounter.innerText = String(this.pageCounter);
      }

      const cartWraper = document.querySelector(".cart__wraper");
      if (cartWraper instanceof HTMLElement) {
        cartWraper.innerHTML = "";
        cartWraper.append(this.createCards(this.products));
      }
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

  protected createSummary() {
    const summary = document.createElement("div");
    summary.className = "basket-page__summary summary";

    const summaryTitle = document.createElement("p");
    summaryTitle.innerText = "Summary";
    summaryTitle.className = "summary__title";

    const sumWraper = document.createElement("div");
    sumWraper.className = "summary__wraper";

    const sumCounter = document.createElement("p");
    sumCounter.innerText = `Products: ${this.totalProduct}`;
    sumCounter.className = "summary__counter";

    const totalPrice = document.createElement("p");
    totalPrice.innerText = `Total: €${this.totalPrice}`;
    totalPrice.className = "summary__price";

    const promoInner = document.createElement("input");
    promoInner.type = "text";
    promoInner.className = "summary__promo";

    const buyButton = document.createElement("button");
    buyButton.innerText = "BUY NOW";
    buyButton.className = "summary__button";

    sumWraper.append(sumCounter, totalPrice, promoInner, buyButton);
    summary.append(summaryTitle, sumWraper);

    return summary;
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
    cartLimitInput.value = String(3);
    cartLimitInput.min = String(1);
    cartLimitInput.className = "cart__input-limit";

    cartLimitInput?.addEventListener("change", (event) => {
      const value = (event.target as HTMLInputElement).value;
      this.cardsLimit = Number(value);
      const cartWraper = document.querySelector(".cart__wraper");
      if (cartWraper instanceof HTMLElement) {
        cartWraper.innerHTML = "";
        cartWraper.append(this.createCards(this.products));
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
          cartWraper.innerHTML = "";
          cartWraper.append(this.createCards(this.products));
        }
      }
    });

    cartLeftButton?.addEventListener("click", () => {
      if (this.pageCounter - 1 > 0) {
        this.pageCounter -= 1;
        cartPageCounter.innerText = String(this.pageCounter);
        const cartWraper = document.querySelector(".cart__wraper");
        if (cartWraper instanceof HTMLElement) {
          cartWraper.innerHTML = "";
          cartWraper.append(this.createCards(this.products));
        }
      }
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

    const cartHeader = this.createCartHeader();

    const cards = this.createCards(products);

    const summary = this.createSummary();

    cart.append(cartHeader, cards);
    page.append(cart, summary);

    return page;
  }

  render() {
    const page = this.createPage(this.products);
    if (page instanceof HTMLDivElement) {
      this.container.append(page);
      return this.container;
    } else {
      throw new Error("PAGE CREATE FAILED!");
    }
  }
}

export default BascetPage;
