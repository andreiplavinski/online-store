import Page from "../../scripts/templates/page";
import data from "../../data/data.json";
class CardsPage extends Page {
  dataBase = data.products;
  dataIdBase = this.dataBase.map((x) => x.id);
  constructor(tagName: string, id: string, className: string) {
    super(tagName, id, className);
  }

  protected createContent(id: number) {
    if (id in this.dataIdBase) {
      const selectItem = this.dataBase[id - 1];
      const page = document.createElement("div");
      page.className = "description-page";
      const routes = document.createElement("div");
      routes.className = "description-page__routes";
      const areaStore = document.createElement("p");
      areaStore.innerText = "Store";
      areaStore.className = "description-page__route";
      const areaCategory = document.createElement("p");
      areaCategory.innerText = selectItem.category;
      areaCategory.className = "description-page__route";
      const areaBrand = document.createElement("p");
      areaBrand.textContent = selectItem.brand;
      areaBrand.className = "description-page__route";
      const areaTitle = document.createElement("p");
      areaTitle.innerText = selectItem.title;
      areaTitle.className = "description-page__route";
      const descriptionCard = document.createElement("div");
      descriptionCard.className =
        "description-page__description-card description-card";
      const photoWraper = document.createElement("div");
      photoWraper.className = "description-card__photo-wraper";
      const photoMiniWraper = document.createElement("div");
      photoMiniWraper.className = "description-card__photo-miniwraper";
      const photoLinks = selectItem.images;

      for (let i = 0; i < photoLinks.length; i++) {
        if (i === 0) {
          const mainPhoto = document.createElement("div");
          mainPhoto.className = "description-card__main-photo";
          mainPhoto.style.backgroundImage = `url(${photoLinks[0]})`;
          photoWraper.append(mainPhoto);
        } else {
          const miniPhoto = document.createElement("div");
          miniPhoto.className = "description-card__mini-photo";
          miniPhoto.style.backgroundImage = `url(${photoLinks[i]})`;
          photoMiniWraper.append(miniPhoto);
        }
      }

      photoWraper.append(photoMiniWraper);
      const descriptionTable = document.createElement("div");
      descriptionTable.className = "description-card__table";
      const descriptionTableTitle = document.createElement("p");
      descriptionTableTitle.className = "description-card__table-title";
      descriptionTableTitle.innerText = selectItem.title;
      descriptionTable.append(descriptionTableTitle);

      const cellNames = [
        "Description:",
        "Discount Percentage:",
        "Rating:",
        "Stock:",
        "Brand:",
        "Category:",
      ];

      for (let i = 0; i < cellNames.length; i++) {
        const descriptionCell = document.createElement("div");
        descriptionCell.className = "description-card__cell";
        const descriptionCellTitle = document.createElement("p");
        descriptionCellTitle.innerText = cellNames[i];
        descriptionCellTitle.className = "description-card__cell-title";
        const descriptionCellValue = document.createElement("p");

        if (i === 0) {
          descriptionCellValue.innerText = selectItem.description;
        } else if (i === 1) {
          descriptionCellValue.innerText = String(
            selectItem.discountPercentage
          );
        } else if (i === 2) {
          descriptionCellValue.innerText = String(selectItem.rating);
        } else if (i === 3) {
          descriptionCellValue.innerText = String(selectItem.stock);
        } else if (i === 4) {
          descriptionCellValue.innerText = selectItem.brand;
        } else if (i === 5) {
          descriptionCellValue.innerText = selectItem.category;
        }
        descriptionCellValue.className = "description-card__cell-value";
        descriptionCell.append(descriptionCellTitle);
        descriptionCell.append(descriptionCellValue);
        descriptionTable.append(descriptionCell);
      }

      const priceWraper = document.createElement("div");
      priceWraper.className = "description-card__price-wraper";
      const price = document.createElement("p");
      price.innerText = String(`€${selectItem.price}`);
      price.className = "description-card__price";
      const cartButton = document.createElement("button");
      cartButton.innerText = "ADD TO CART";
      cartButton.className = "description-card__cart-button";
      const buyButton = document.createElement("button");
      buyButton.innerText = "BUY NOW";
      buyButton.className = "description-card__buy-button";
      routes.append(areaStore, areaCategory, areaBrand, areaTitle);
      priceWraper.append(price, buyButton, cartButton);
      descriptionCard.append(photoWraper, descriptionTable, priceWraper);
      page.append(routes, descriptionCard);
      return page;
    }
  }

  render() {
    const page = this.createContent(55);
    if (page instanceof HTMLDivElement) {
      this.container.append(page);
      return this.container;
    } else {
      throw new Error("PAGE CREATE FAILED!");
    }
  }
}

export default CardsPage;
