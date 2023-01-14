import Page from "../../scripts/templates/page";
import ProductsPage from "../products";
import BascetPage from "../bascet";
import CardsPage from "../cards";
import { pageIds } from "../../scripts/templates/enumPage";
import Header from "../../scripts/components/header";
import ErrorPage from "../error/error";
import Footer from "../../scripts/components/footer";

interface IApp {
  run(): void;
}

class App implements IApp {
  private header: Header;
  private static container: HTMLElement = document.body;
  private static defauldPageClass = "current-page";
  private footer: Footer;

  constructor() {
    this.header = new Header("header", "header", "header");
    this.footer = new Footer("footer", "footer", "footer");
  }

  static RenderPage(idPage: string) {
    const hash: string = window.location.hash.slice(1);
    const currenPageHtml = document.querySelector(`.${this.defauldPageClass}`);
    if (currenPageHtml) {
      currenPageHtml.remove();
    }
    let page: Page | null = null;

    if (idPage === pageIds.product) {
      page = new ProductsPage("main", idPage, "main");
    } else if (idPage === "") {
      page = new ProductsPage("main", pageIds.product, "main");
    } else if (idPage === pageIds.basket) {
      page = new BascetPage("main", idPage, "main");
    } else if (
      new RegExp("^[1-9][0-9]?$|^100$").test(`${hash.split("/")[1]}`) &&
      idPage === `${pageIds.cards}/${hash.split("/")[1]}`
    ) {
      page = new CardsPage("main", idPage, "main", Number(hash.split("/")[1]));
    } else if (idPage === `${pageIds.cards}/${100 || 99}`) {
      page = new CardsPage("main", idPage, "main", 100 || 99);
    } else {
      page = new ErrorPage("main", "error", "main", "404");
    }

    if (page) {
      const pageHTML: HTMLElement = page.render();
      pageHTML.className = this.defauldPageClass;
      if (App.container) {
        App.container.append(pageHTML);
      }
    }
  }

  private enableRoundChange(): void {
    window.addEventListener("hashchange", () => {
      const hash: string = window.location.hash.slice(1);

      let url: string = location.href;

      if (url.includes("?")) {
        url = url.slice(0, url.indexOf("?")) + url.slice(url.indexOf("#"));
        window.history.replaceState({}, "", url);
      }
      App.RenderPage(hash);
    });
  }
  private windowLoad(): void {
    window.addEventListener("load", () => {
      const hash: string = window.location.hash.slice(1);
      App.RenderPage(hash);
    });
  }

  run(): void {
    App.container.append(this.header.render());
    this.enableRoundChange();
    this.windowLoad();
    App.container.append(this.footer.render());
  }
}

export default App;
