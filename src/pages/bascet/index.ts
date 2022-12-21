import Page from "../../scripts/templates/page";

class BascetPage extends Page {
  static textObject = {
    pageTitle: "Это ваша корзина",
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
    const title = this.createTitle(BascetPage.textObject.pageTitle);
    this.container.append(title);
    return this.container;
  }
}

export default BascetPage;
