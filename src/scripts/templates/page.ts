import { IPage } from "./interfaceData";

abstract class Page implements IPage {
  protected container: HTMLElement;
  static textObject = {};

  constructor(tagName: string, id: string, className: string) {
    this.container = document.createElement(tagName);
    this.container.id = id;
    this.container.className = className;
  }

  public render(): HTMLElement {
    return this.container;
  }
}

export default Page;
