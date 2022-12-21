import Page from "../../scripts/templates/page";

class CardsPage extends Page {
  static textObject = {
    pageTitle: "Это страница описания товара",
  };

  constructor(tagName: string, id: string, className: string) {
    super(tagName, id, className);
  }

  protected createTitle(text: string) {
    const productTitle = document.createElement("h1");
    productTitle.textContent = text;
    return productTitle;
  }

  render() {
    const title = this.createTitle(CardsPage.textObject.pageTitle);
    this.container.append(title);
    return this.container;
  }
}

export default CardsPage;
