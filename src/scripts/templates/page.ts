import { IPage } from "./interfaceData";
import { IDataProduct } from "../../pages/bascet/types";

abstract class Page implements IPage {
  protected container: HTMLElement;
  static textObject = {};

  constructor(tagName: string, id: string, className: string) {
    this.container = document.createElement(tagName);
    this.container.id = id;
    this.container.className = className;
  }

  abstract render(): HTMLElement;

  protected getDescription(
    selectItem: IDataProduct,
    page: string
  ): HTMLDivElement[] {
    const cellNames = [
      "Description:",
      "Discount Percentage:",
      "Rating:",
      "Stock:",
      "Brand:",
      "Category:",
    ];

    const descriptions: HTMLDivElement[] = [];

    for (let i = 0; i < cellNames.length; i++) {
      const descriptionCell = document.createElement("div");
      const descriptionCellTitle = document.createElement("p");
      const descriptionCellValue = document.createElement("p");

      descriptionCellTitle.innerText = cellNames[i];
      descriptionCell.append(descriptionCellTitle);

      switch (i) {
        case 0:
          descriptionCellValue.innerText = selectItem.description;
          if (page === "cards") {
            descriptionCell.append(descriptionCellValue);
            descriptions.push(descriptionCell);
          } else {
            descriptions.push(descriptionCellValue);
          }

          break;
        case 1:
          if (page === "cards") {
            descriptionCellValue.innerText = String(
              selectItem.discountPercentage
            );
            descriptionCell.append(descriptionCellValue);
            descriptions.push(descriptionCell);
          } else {
            descriptionCellValue.innerText = `Discount: ${String(
              selectItem.discountPercentage
            )}%`;
            descriptions.push(descriptionCellValue);
          }
          break;
        case 2:
          if (page === "cards") {
            descriptionCellValue.innerText = String(selectItem.rating);
            descriptionCell.append(descriptionCellValue);
            descriptions.push(descriptionCell);
          } else {
            descriptionCellValue.innerText = `Rating: ${(descriptionCellValue.innerText =
              String(selectItem.rating))}`;
          }
          descriptions.push(descriptionCellValue);
          break;
        case 3:
          if (page === "cards") {
            descriptionCellValue.innerText = String(selectItem.stock);

            descriptionCell.append(descriptionCellValue);
            descriptions.push(descriptionCell);
          }
          break;
        case 4:
          if (page === "cards") {
            descriptionCellValue.innerText =
              selectItem.brand.toLocaleUpperCase();

            descriptionCell.append(descriptionCellValue);
            descriptions.push(descriptionCell);
          }
          break;
        case 5:
          if (page === "cards") {
            descriptionCellValue.innerText =
              selectItem.category.toLocaleUpperCase();

            descriptionCell.append(descriptionCellValue);
            descriptions.push(descriptionCell);
          }
          break;
      }

      if (page === "cards") {
        descriptionCell.className = "description-card__cell";
        descriptionCellTitle.className = "description-card__cell-title";
        descriptionCellValue.className = "description-card__cell-value";
      } else {
        descriptionCellValue.className = "cart__description";
      }
    }
    return descriptions;
  }
}

export default Page;
