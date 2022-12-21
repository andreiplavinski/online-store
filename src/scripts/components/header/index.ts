import Page from "../../templates/page";
import { pageIds } from "../../templates/enumPage";

const links = [
  {
    id: pageIds.product,
    text: "product",
  },

  {
    id: pageIds.basket,
    text: "basket",
  },

  {
    id: pageIds.cards,
    text: "cards",
  },
];

class Header extends Page {
  constructor(tagName: string, id: string, className: string) {
    super(tagName, id, className);
  }

  renderClickContent() {
    links.forEach((link) => {
      const linkHTML = document.createElement("a");
      linkHTML.href = `#${link.id}`;
      linkHTML.textContent = link.text;
      this.container.append(linkHTML);
    });
  }

  render() {
    this.renderClickContent();
    return this.container;
  }
}

export default Header;
