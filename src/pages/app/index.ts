import Page from "../../scripts/templates/page";
import ProductsPage from "../products";
import BascetPage from "../bascet";
import CardPage from "../cards";
import { PageIds } from "../../scripts/templates/enumPage";
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

  static renderPage(idPage: string) {
    const hash: string = window.location.hash.slice(1);
    const currenPageHtml = document.querySelector(`.${this.defauldPageClass}`);
    if (currenPageHtml) {
      currenPageHtml.remove();
    }
    let page: Page | null = null;

    if (idPage === PageIds.Product) {
      page = new ProductsPage("main", idPage, "main");
    } else if (idPage === "") {
      page = new ProductsPage("main", PageIds.Product, "main");
    } else if (idPage === PageIds.Basket) {
      page = new BascetPage("main", idPage, "main");
    } else if (
      new RegExp("^[1-9][0-9]?$|^100$").test(`${hash.split("/")[1]}`) &&
      idPage === `${PageIds.Cards}/${hash.split("/")[1]}`
    ) {
      page = new CardPage("main", idPage, "main", Number(hash.split("/")[1]));
    } else if (idPage === `${PageIds.Cards}/${100 || 99}`) {
      page = new CardPage("main", idPage, "main", 100 || 99);
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
      App.renderPage(hash);
    });
  }
  private windowLoad(): void {
    window.addEventListener("load", () => {
      const hash: string = window.location.hash.slice(1);
      App.renderPage(hash);
    });
  }

  public run(): void {
    App.container.append(this.header.render());
    this.enableRoundChange();
    this.windowLoad();
    App.container.append(this.footer.render());
  }
}

export default App;
