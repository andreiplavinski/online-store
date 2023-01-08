import Page from "../../templates/page";
import { pageIds } from "../../templates/enumPage";
//import data from "../../../data/data.json";

class Header extends Page {
  constructor(tagName: string, id: string, className: string) {
    super(tagName, id, className);
  }

  renderClickContent() {
    const headerLogo = document.createElement("h1");
    this.container.append(headerLogo);
    const linkLogo: HTMLAnchorElement = document.createElement("a");
    linkLogo.className = "header__logo";
    linkLogo.href = `#${pageIds.product}`;
    headerLogo.append(linkLogo);
    linkLogo.textContent = "Online Store";

    const totalPrice: HTMLElement = document.createElement("p");
    totalPrice.className = "header__price";
    totalPrice.textContent = "Cart Total: € ";
    this.container.append(totalPrice);
    const totalPriceResult = document.createElement("span");
    totalPriceResult.className = "header__price-result";

    totalPriceResult.textContent = "0";
    //console.log(a, b);
    document.addEventListener("storage", (e) => {
      let i = 0;
      console.log(i++);
      const storage = JSON.parse(localStorage.getItem("product") || "{}");
      totalPriceResult.textContent = "hui tebe";
      console.log(e);
      console.log(storage);
    });

    totalPrice.append(totalPriceResult);

    const basket = document.createElement("a");
    basket.textContent = "🛒";
    basket.className = "header__basket";
    basket.href = `#${pageIds.basket}`;
    this.container.append(basket);
    const writeCountProd = document.createElement("span");
    writeCountProd.textContent = "999";
    writeCountProd.className = "header__basket-count";
    basket.append(writeCountProd);
  }

  render() {
    this.renderClickContent();
    return this.container;
  }
}

export default Header;
