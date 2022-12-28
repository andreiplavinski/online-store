import Page from "../../scripts/templates/page";
import data from "../../data/data.json";
import "./bascet.scss";

class BascetPage extends Page {
  dataBase = data.products;
  dataIdBase = this.dataBase.map((x) => x.id);

  constructor(tagName: string, id: string, className: string) {
    super(tagName, id, className);
  }

  protected createContent(products: object) {
    const page = document.createElement("div");
    page.className = "basket-page";
    const cart = document.createElement("div");
    cart.className = "basket-page__cart cart";
    const cartTitle = document.createElement("div");
    cartTitle.innerText = "Products In Cart:";
    cartTitle.className = "cart__title";
    const cartWraper = document.createElement("div");
    cartWraper.className = "cart__wraper";
    let counter = 1;
    for (const [id, quantity] of Object.entries(products)) {
      if (id in this.dataIdBase) {
        const selectItem = this.dataBase[Number(id) - 1];
        const card = document.createElement("div");
        card.className = "cart__card";
        const cartCounter = document.createElement("p");
        cartCounter.innerText = String(counter);
        counter += 1;
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
        price.innerText = `€${String(selectItem.price)}`;
        price.className = "amount__price";
        const wraper = document.createElement("div");
        wraper.className = "amount__wraper";
        const addButton = document.createElement("button");
        addButton.className = "amount__button";
        addButton.innerText = "+";
        const removeButton = document.createElement("button");
        removeButton.innerText = "-";
        removeButton.className = "amount__button";
        const amountCounter = document.createElement("p");
        amountCounter.innerText = String(quantity);
        amountCounter.className = "amount__counter";
        wraper.append(addButton, amountCounter, removeButton);
        amount.append(stock, wraper, price);
        card.append(cartCounter, photo, descriptions, amount);
        cartWraper.append(card);
      }
    }
    const summary = document.createElement("div");
    summary.className = "basket-page__summary summary";
    const summaryTitle = document.createElement("p");
    summaryTitle.innerText = "Summary";
    summaryTitle.className = "summary__title";
    const sumWraper = document.createElement("div");
    sumWraper.className = "summary__wraper";
    const sumCounter = document.createElement("p");
    sumCounter.innerText = "Products:";
    sumCounter.className = "summary__counter";
    const totalPrice = document.createElement("p");
    totalPrice.innerText = "Total:";
    totalPrice.className = "summary__price";
    const promoInner = document.createElement("input");
    promoInner.type = "text";
    promoInner.className = "summary__promo";
    const buyButton = document.createElement("button");
    buyButton.innerText = "BUY NOW";
    buyButton.className = "summary__button";
    sumWraper.append(sumCounter, totalPrice, promoInner, buyButton);
    summary.append(summaryTitle, sumWraper);
    cart.append(cartTitle, cartWraper);
    page.append(cart);
    page.append(summary);
    return page;
  }

  render() {
    const page = this.createContent({ 42: 3, 54: 1, 91: 4 }); // object with id and quantity product put here - { id: q, 55: 1, 46: 4 }
    if (page instanceof HTMLDivElement) {
      this.container.append(page);
      return this.container;
    } else {
      throw new Error("PAGE CREATE FAILED!");
    }
  }
}

export default BascetPage;
