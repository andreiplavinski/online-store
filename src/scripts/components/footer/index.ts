import Page from "../../templates/page";

class Footer extends Page {
  static textObject = {
    pageTitle: "Здесь должен быть футер",
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
    const title = this.createTitle(Footer.textObject.pageTitle);
    this.container.append(title);
    return this.container;
  }
}

export default Footer;
