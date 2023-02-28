import "./index.html";
import "./index.scss";
import "./pages/products/products.scss";
import "./assets/images/card.png";
import "./assets/images/visacard.png";
import "./assets/images/amexcard.png";
import "./assets/images/mastercard.png";
import App from "./pages/app";
import SortProducts from "./pages/products/sortProducts";

const app = new App();
app.run();

window.addEventListener("load", (): void => {
  const catalog: HTMLElement | null = document.querySelector(".catalog");
  const filter: HTMLElement | null = document.querySelector(".filter");
  if (catalog instanceof HTMLElement && filter instanceof HTMLElement) {
    const writer = new SortProducts(catalog, filter);
    writer.writeResSearch(3);
  }
});
