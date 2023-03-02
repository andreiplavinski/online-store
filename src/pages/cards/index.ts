import Page from "../../scripts/templates/page";
import data from "../../data/data.json";
import "./cards.scss";
import { writeToTalPriceCount } from "../../pages/products/script";
import { IProducts } from "../bascet/types";
import { IDataProduct } from "../bascet/types";

class CardPage extends Page {
  dataBase: Array<IDataProduct> = data.products;
  dataIdBase: Array<number> = this.dataBase.map((x) => x.id);
  idN: number;
  products: IProducts = {};

  constructor(tagName: string, id: string, className: string, idN: number) {
    super(tagName, id, className);
    this.idN = idN;
  }

  private createContent(): HTMLDivElement {
    if (!localStorage.getItem("product")) {
      this.products = {};
    } else {
      this.products = JSON.parse(localStorage.getItem("product") || "{}");
    }

    const selectItem: IDataProduct = this.dataBase[this.idN - 1];

    const page = document.createElement("div");
    page.className = "description-page";

    const routes = document.createElement("div");
    routes.className = "description-page__routes";

    const areaStore = document.createElement("p");
    areaStore.innerText = "Store".toLocaleUpperCase();
    areaStore.className = "description-page__route";

    const areaCategory = document.createElement("p");
    areaCategory.innerText = selectItem.category.toLocaleUpperCase();
    areaCategory.className = "description-page__route";

    const areaBrand = document.createElement("p");
    areaBrand.textContent = selectItem.brand.toLocaleUpperCase();
    areaBrand.className = "description-page__route";

    const areaTitle = document.createElement("p");
    areaTitle.innerText = selectItem.title.toLocaleUpperCase();
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
      miniPhoto.alt = "product photo";

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
                  mainPhoto.alt = "product photo";
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

    const descriptions = this.getDescription(selectItem, "cards");

    for (const description of descriptions) {
      descriptionTable.append(description);
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
    buyButton.addEventListener("click", writeToTalPriceCount);
    routes.append(areaStore, areaCategory, areaBrand, areaTitle);
    priceWraper.append(price, buyButton, cartButton);
    descriptionCard.append(photoWraper, descriptionTable, priceWraper);
    page.append(routes, descriptionCard);

    return page;
  }

  public render(): HTMLElement {
    const page = this.createContent(); // id product put here
    if (page instanceof HTMLDivElement) {
      this.container.append(page);
      return this.container;
    } else {
      throw new Error("PAGE CREATE FAILED!");
    }
  }
}

export default CardPage;
