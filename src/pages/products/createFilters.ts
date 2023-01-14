import { ICreateFilters } from "./types";

class CreateFilters implements ICreateFilters {
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

  renderContainer(): HTMLElement {
    const filterProduct = document.createElement("div");

    this.container.append(filterProduct);
    const filterProductHeader: HTMLElement = document.createElement("div");
    filterProductHeader.textContent = this.headerName;
    filterProductHeader.className = "filter-block__header";
    filterProduct.append(filterProductHeader);
    return filterProduct;
  }

  renderFilterCheckbox(array: Array<string>): HTMLElement {
    const filterBlock = this.renderContainer();
    filterBlock.className = "filter-block";
    const filterBlockContent: HTMLElement = document.createElement("div");
    filterBlockContent.className = "filter-block__content";
    filterBlock.append(filterBlockContent);
    for (let i = 0; i < this.data.length; i++) {
      const checkBoxContent: HTMLLabelElement = document.createElement("label");
      checkBoxContent.className = "filter-block__label";
      filterBlockContent.append(checkBoxContent);
      const checkBox: HTMLInputElement = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.name = this.headerName;
      checkBox.value = `${this.data[i]}`;
      const nameChoose: HTMLElement = document.createElement("span");
      nameChoose.textContent = `${this.data[i]}`;
      const viewProdField = document.createElement("span");

      const prodAll: HTMLElement = document.createElement("span");
      const arr2 = array.reduce((acc: string[], el) => {
        if (el === this.data[i]) acc.push(el);
        return acc;
      }, []);

      prodAll.textContent = `${arr2.length})`;

      viewProdField.textContent = ` (${arr2.length}/`;
      viewProdField.className = "filter-block__count";
      checkBoxContent.append(checkBox, nameChoose, viewProdField, prodAll);
    }
    return this.container;
  }

  renderFilterRange(value: string): void {
    const filterBlock: HTMLElement = this.renderContainer();
    filterBlock.className = "filter-block-range";

    const dualSliderBlock: HTMLElement = document.createElement("div");
    dualSliderBlock.className = "filter-block__block";
    filterBlock.append(dualSliderBlock);

    const blockSliders: HTMLElement = document.createElement("div");
    const dataSort: (string | number)[] = this.data.sort(
      (a, b) => Number(a) - Number(b)
    );
    blockSliders.className = "filter-block__slider";
    dualSliderBlock.append(blockSliders);
    const fromSlider: HTMLInputElement = document.createElement("input");

    fromSlider.className = "fromSlider";
    fromSlider.type = "range";

    fromSlider.min = String(dataSort[0]);
    fromSlider.max = String(dataSort[dataSort.length - 1]);
    fromSlider.value = String(dataSort[0]);
    const toSlider: HTMLInputElement = document.createElement("input");
    toSlider.className = "toSlider";
    toSlider.type = "range";
    toSlider.min = String(dataSort[0]);
    toSlider.max = String(dataSort[dataSort.length - 1]);
    toSlider.value = String(dataSort[dataSort.length - 1]);

    blockSliders.append(fromSlider, toSlider);

    const blockSliderValue: HTMLElement = document.createElement("div");
    blockSliderValue.className = "filter-block__value";
    dualSliderBlock.append(blockSliderValue);

    const minValue: HTMLElement = document.createElement("p");
    minValue.className = "filter-block__min-value";
    minValue.textContent = `${value} ${dataSort[0]}`;
    const maxValue = document.createElement("p");
    maxValue.className = "filter-block__max-value";
    maxValue.textContent = `${value} ${dataSort[dataSort.length - 1]}`;
    const nonValue: HTMLElement = document.createElement("p");
    nonValue.className = "filter-block__non-value";
    nonValue.textContent = " <-> ";
    blockSliderValue.append(minValue, nonValue, maxValue);
  }
}

export default CreateFilters;
