//import { Card } from "../../scripts/templates/interfaceData";
import { writeRes } from "./function";

class CreateFilters {
  data: Array<string | number>;
  container: HTMLElement;
  headerName: string;
  constructor(
    data: Array<string | number>,
    container: HTMLElement,
    headerName: string
  ) {
    this.data = data;
    this.container = container;
    this.headerName = headerName;
  }

  renderContainer() {
    const filterProduct = document.createElement("div");
    //filterProduct.className = "filter-block";
    this.container.append(filterProduct);
    const filterProductHeader = document.createElement("div");
    filterProductHeader.textContent = this.headerName;
    filterProductHeader.className = "filter-block__header";
    filterProduct.append(filterProductHeader);
    return filterProduct;
  }

  renderFilterCheckbox(): HTMLElement {
    const filterBlock = this.renderContainer();
    filterBlock.className = "filter-block";
    const filterBlockContent = document.createElement("div");
    filterBlockContent.className = "filter-block__content";
    filterBlock.append(filterBlockContent);
    for (let i = 0; i < this.data.length; i++) {
      const checkBoxContent = document.createElement("label");
      checkBoxContent.className = "filter-block__label";
      filterBlockContent.append(checkBoxContent);
      const checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.name = this.headerName;
      checkBox.value = `${this.data[i]}`;
      const nameChoose = document.createElement("span");
      nameChoose.textContent = `${this.data[i]}`;
      const viewProdField = document.createElement("span");

      const qualitiProd = writeRes("card__category");
      viewProdField.textContent = ` (${qualitiProd}/`;
      //}

      const prodAll = document.createElement("span");
      prodAll.textContent = "0)";
      checkBoxContent.append(checkBox, nameChoose, viewProdField, prodAll);
    }
    return this.container;
  }

  renderFilterRange(value: string) {
    const filterBlock = this.renderContainer();
    filterBlock.className = "filter-block-range";

    const dualSliderBlock = document.createElement("div");
    dualSliderBlock.className = "filter-block__block";
    filterBlock.append(dualSliderBlock);

    const blockSliders = document.createElement("div");
    const dataSort = this.data.sort((a, b) => Number(a) - Number(b));
    blockSliders.className = "filter-block__slider";
    dualSliderBlock.append(blockSliders);
    const fromSlider = document.createElement("input");
    fromSlider.setAttribute("id", "fromSlider");
    fromSlider.type = "range";

    fromSlider.min = String(dataSort[0]);
    fromSlider.max = String(dataSort[dataSort.length - 1]);
    fromSlider.value = String(dataSort[0]);
    //fromSlider.min;
    const toSlider = document.createElement("input");
    toSlider.setAttribute("id", "toslider");
    toSlider.type = "range";
    toSlider.min = String(dataSort[0]);
    toSlider.max = String(dataSort[dataSort.length - 1]);
    toSlider.value = String(dataSort[dataSort.length - 1]);
    //toSlider.max;
    blockSliders.append(fromSlider, toSlider);

    const blockSliderValue = document.createElement("div");
    blockSliderValue.className = "filter-block__value";
    dualSliderBlock.append(blockSliderValue);

    const minValue = document.createElement("p");
    minValue.textContent = `${value} ${dataSort[0]}`;
    const maxValue = document.createElement("p");
    maxValue.textContent = `${value} ${dataSort[dataSort.length - 1]}`;
    blockSliderValue.append(minValue, maxValue);
    // fromSlider.addEventListener("input", () => {
    //   //let currentValue =
    //   minValue.textContent = toSlider.value;
    // });
  }
}

export default CreateFilters;
