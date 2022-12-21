import Page from "../../scripts/templates/page";

class ProductsPage extends Page {
  static textObject = {
    pageTitle: "products  page page 789",
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
    const title = this.createTitle(ProductsPage.textObject.pageTitle);
    this.container.append(title);
    return this.container;
  }
}

export default ProductsPage;
