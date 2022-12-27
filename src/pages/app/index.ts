import Page from "../../scripts/templates/page";
import ProductsPage from "../products";
import BascetPage from "../bascet";
import CardsPage from "../cards";
import { pageIds } from "../../scripts/templates/enumPage";
import Header from "../../scripts/components/header";
import ErrorPage from "../error/error";
import Footer from "../../scripts/components/footer";

class App {
  private header: Header;
  private static container: HTMLElement = document.body;
  private static defauldPageClass = "current-page";
  private initPage: ProductsPage;
  private footer: Footer;

  constructor() {
    this.header = new Header("header", "header", "header");
    this.initPage = new ProductsPage("main", pageIds.product, "main");
    this.footer = new Footer("footer", "footer", "footer");
  }

  static RenderPage(idPage: string) {
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
    } else if (idPage === pageIds.cards) {
      page = new CardsPage("main", idPage, "main");
    } else {
      page = new ErrorPage("main", idPage, "main", "404");
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.className = this.defauldPageClass;
      if (App.container) {
        App.container.append(pageHTML);
      }
    }
  }

  private enableRoundChange() {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.slice(1);
      console.log(window.location.hash);
      console.log(hash);
      App.RenderPage(hash);
    });
  }
  private windowLoad() {
    window.addEventListener("load", () => {
      const hash = window.location.hash.slice(1);
      App.RenderPage(hash);
    });
  }

  async run() {
    App.container.append(this.header.render());
    this.enableRoundChange();
    this.windowLoad();
    App.container.append(this.footer.render());
  }
}

export default App;
