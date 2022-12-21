import Page from "../../scripts/templates/page";

class ErrorPage extends Page {
  private errorType: string;
  static textObject: { [prop: string]: string } = {
    404: "Error 404! The page was not found",
  };

  constructor(
    tagName: string,
    id: string,
    className: string,
    errorType: string
  ) {
    super(tagName, id, className);
    this.errorType = errorType;
  }

  protected createTitle(text: string) {
    const productTitle = document.createElement("h1");
    productTitle.textContent = text;
    return productTitle;
  }

  render() {
    const title = this.createTitle(ErrorPage.textObject[this.errorType]);
    this.container.append(title);
    return this.container;
  }
}

export default ErrorPage;
