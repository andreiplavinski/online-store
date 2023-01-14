import Page from "../../templates/page";
import { pageIds } from "../../templates/enumPage";
import { writeToTalPriceCount } from "../../../pages/products/script";
import { IHeader } from "./type";

class Header extends Page implements IHeader {
  constructor(tagName: string, id: string, className: string) {
    super(tagName, id, className);
  }

  renderClickContent(): void {
    const headerLogo: HTMLElement = document.createElement("h1");
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
    const totalPriceResult: HTMLElement = document.createElement("span");
    totalPriceResult.className = "header__price-result";

    totalPrice.append(totalPriceResult);

    const basket: HTMLAnchorElement = document.createElement("a");
    basket.textContent = "🛒";
    basket.className = "header__basket";
    basket.href = `#${pageIds.basket}`;
    this.container.append(basket);
    const writeCountProd = document.createElement("span");

    if (!localStorage.getItem("product")) {
      totalPriceResult.textContent = "0";
      writeCountProd.textContent = "0";
    } else {
      window.addEventListener("load", writeToTalPriceCount);
    }

    writeCountProd.className = "header__basket-count";
    basket.append(writeCountProd);
  }

  render(): HTMLElement {
    this.renderClickContent();
    return this.container;
  }
}

export default Header;
