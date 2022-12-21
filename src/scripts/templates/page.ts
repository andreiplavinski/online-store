abstract class Page {
  protected container: HTMLElement;
  static textObject = {};

  constructor(tagName: string, id: string, className: string) {
    this.container = document.createElement(tagName);
    this.container.id = id;
    this.container.className = className;
  }

  render() {
    return this.container;
  }
}

export default Page;
