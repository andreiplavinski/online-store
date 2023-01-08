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

    this.container.append(filterProduct);
    const filterProductHeader = document.createElement("div");
    filterProductHeader.textContent = this.headerName;
    filterProductHeader.className = "filter-block__header";
    filterProduct.append(filterProductHeader);
    return filterProduct;
  }

  renderFilterCheckbox(array: Array<string>): HTMLElement {
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

      const prodAll = document.createElement("span");
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
    //fromSlider.setAttribute("id", "fromSlider");
    fromSlider.className = "fromSlider";
    fromSlider.type = "range";

    fromSlider.min = String(dataSort[0]);
    fromSlider.max = String(dataSort[dataSort.length - 1]);
    fromSlider.value = String(dataSort[0]);
    const toSlider = document.createElement("input");
    toSlider.className = "toSlider";
    toSlider.type = "range";
    toSlider.min = String(dataSort[0]);
    toSlider.max = String(dataSort[dataSort.length - 1]);
    toSlider.value = String(dataSort[dataSort.length - 1]);

    blockSliders.append(fromSlider, toSlider);

    const blockSliderValue = document.createElement("div");
    blockSliderValue.className = "filter-block__value";
    dualSliderBlock.append(blockSliderValue);

    const minValue = document.createElement("p");
    minValue.className = "filter-block__min-value";
    minValue.textContent = `${value} ${dataSort[0]}`;
    const maxValue = document.createElement("p");
    maxValue.className = "filter-block__max-value";
    maxValue.textContent = `${value} ${dataSort[dataSort.length - 1]}`;
    const nonValue = document.createElement("p");
    nonValue.className = "filter-block__non-value";
    nonValue.textContent = " <-> ";
    blockSliderValue.append(minValue, nonValue, maxValue);
  }
}

export default CreateFilters;
