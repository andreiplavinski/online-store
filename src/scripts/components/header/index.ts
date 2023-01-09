import Page from "../../templates/page";
import { pageIds } from "../../templates/enumPage";
import { writeToTalPriceCount } from "../../../pages/products/script";

class Header extends Page {
  constructor(tagName: string, id: string, className: string) {
    super(tagName, id, className);
  }

  renderClickContent(): void {
    const headerLogo = document.createElement("h1");
    this.container.append(headerLogo);
    const linkLogo: HTMLAnchorElement = document.createElement("a");
    linkLogo.className = "header__logo";

    // headerLogo.addEventListener("click", () => {
    //   const url = location.href;
    //   window.history.replaceState({}, "", `${url}#change`);
    //   location.reload();
    // });
    // linkLogo.href = `#${pageIds.product}`;

    linkLogo.href = `#${pageIds.product}`;
    headerLogo.append(linkLogo);
    linkLogo.textContent = "Online Store";

    const totalPrice: HTMLElement = document.createElement("p");
    totalPrice.className = "header__price";
    totalPrice.textContent = "Cart Total: € ";
    this.container.append(totalPrice);
    const totalPriceResult = document.createElement("span");
    totalPriceResult.className = "header__price-result";

    totalPrice.append(totalPriceResult);

    const basket = document.createElement("a");
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

  render() {
    this.renderClickContent();
    return this.container;
  }
}

export default Header;
