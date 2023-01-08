import Page from "../../scripts/templates/page";
import data from "../../data/data.json";
import "./cards.scss";
import { writeToTalPriceCount } from "../../pages/products/script";

interface IProducts {
  [key: number]: number;
}

class CardsPage extends Page {
  dataBase = data.products;
  dataIdBase = this.dataBase.map((x) => x.id);
  idN: number;
  products: IProducts = {};

  constructor(tagName: string, id: string, className: string, idN: number) {
    super(tagName, id, className);
    this.idN = idN;
  }

  protected createContent() {
    if (!localStorage.getItem("product")) {
      this.products = {};
    } else {
      this.products = JSON.parse(localStorage.getItem("product") || "{}");
    }

    const selectItem = this.dataBase[this.idN - 1];
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
    const photoWeight: number[] = [];
    let mainPhotoFlag = false;

    for (let i = 0; i < photoLinks.length; i++) {
      const miniPhoto = document.createElement("img");
      miniPhoto.className = "description-card__mini-photo";

      if (miniPhoto instanceof HTMLImageElement) {
        miniPhoto.src = `${photoLinks[i]}`;
        miniPhoto.onload = () => {
          fetch(miniPhoto.src)
            .then((resp) => resp.blob())
            .then((blob) => {
              if (!photoWeight.includes(blob.size)) {
                if (!mainPhotoFlag) {
                  const mainPhoto = document.createElement("img");
                  mainPhoto.className = "description-card__main-photo";
                  mainPhoto.src = miniPhoto.src;
                  photoWraper.append(mainPhoto);
                  mainPhotoFlag = true;
                }
                photoWeight.push(blob.size);
                photoMiniWraper.append(miniPhoto);
              }
            });
        };
      }

      miniPhoto.addEventListener("click", (event) => {
        if (event.target instanceof HTMLImageElement) {
          const selectPhotoSrc = event.target.src;
          const mainPhoto = document.querySelector(
            ".description-card__main-photo"
          );
          if (mainPhoto instanceof HTMLImageElement) {
            mainPhoto.src = selectPhotoSrc;
          }
        }
      });
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
        descriptionCellValue.innerText = String(selectItem.discountPercentage);
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
    if (Object.keys(this.products).includes(String(this.idN))) {
      cartButton.innerText = "DROP FROM CART";
    } else {
      cartButton.innerText = "ADD TO CART";
    }
    cartButton.className = "description-card__cart-button";

    cartButton.addEventListener("click", () => {
      if (Object.keys(this.products).includes(String(this.idN))) {
        cartButton.innerText = "ADD TO CART";
        delete this.products[this.idN];
        localStorage.setItem("product", JSON.stringify(this.products));
      } else {
        cartButton.innerText = "DROP FROM CART";
        this.products[this.idN] = 1;
        localStorage.setItem("product", JSON.stringify(this.products));
      }
    });

    cartButton.addEventListener("click", writeToTalPriceCount);

    const buyButton = document.createElement("button");
    buyButton.innerText = "BUY NOW";
    buyButton.className = "description-card__buy-button";

    buyButton.addEventListener("click", () => {
      if (!Object.keys(this.products).includes(String(this.idN))) {
        this.products[this.idN] = 1;
        localStorage.setItem("product", JSON.stringify(this.products));
      }
      localStorage.setItem("windowFlag", JSON.stringify(true));
      location.href = "#basket";
    });
    routes.append(areaStore, areaCategory, areaBrand, areaTitle);
    priceWraper.append(price, buyButton, cartButton);
    descriptionCard.append(photoWraper, descriptionTable, priceWraper);
    page.append(routes, descriptionCard);

    return page;
  }

  render() {
    const page = this.createContent(); // id product put here
    if (page instanceof HTMLDivElement) {
      this.container.append(page);
      return this.container;
    } else {
      throw new Error("PAGE CREATE FAILED!");
    }
  }
}

export default CardsPage;
