import Page from "../../scripts/templates/page";
import { IErrorPage } from "./type";

class ErrorPage extends Page implements IErrorPage {
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

  private createTitle(text: string): HTMLHeadingElement {
    const productTitle = document.createElement("h1");
    productTitle.textContent = text;
    return productTitle;
  }

  public render(): HTMLElement {
    const title = this.createTitle(ErrorPage.textObject[this.errorType]);
    this.container.append(title);
    return this.container;
  }
}

export default ErrorPage;
