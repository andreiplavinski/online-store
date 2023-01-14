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
  const a: HTMLElement | null = document.querySelector(".catalog");
  const b: HTMLElement | null = document.querySelector(".filter");
  if (a instanceof HTMLElement && b instanceof HTMLElement) {
    const write = new SortProducts(a, b);
    write.writeResSearch(3);
  }
});
