class DualSlider {
  fromSlider: HTMLInputElement;
  toSlider: HTMLInputElement;
  fromParagraph: HTMLElement;
  toParagraph: HTMLElement;

  constructor(
    fromSlider: HTMLInputElement,
    toSlider: HTMLInputElement,
    fromParagraph: HTMLElement,
    toParagraph: HTMLElement
  ) {
    this.fromSlider = fromSlider;
    this.toSlider = toSlider;
    this.fromParagraph = fromParagraph;
    this.toParagraph = toParagraph;
  }

  controlFromSlider(value?: string) {
    const [from, to] = this.getParsed();
    this.fillSlider("#C6C6C6", "#0bd63a");
    if (from > to) {
      this.fromSlider.value = String(to);
      this.fromParagraph.textContent = `${value} ${to}`;
    } else {
      this.fromParagraph.textContent = `${value} ${from}`;
    }
  }

  controlToSlider(value?: string) {
    const [from, to] = this.getParsed();
    this.fillSlider("#C6C6C6", "#0bd63a");
    this.setToggleAccessible();
    if (from <= to) {
      this.toSlider.value = String(to);
      this.toParagraph.textContent = `${value} ${to}`;
    } else {
      this.toParagraph.textContent = `${value} ${from}`;
      this.toSlider.value = String(from);
    }
  }

  getParsed() {
    const from: number = parseInt(this.fromSlider.value, 10);
    const to: number = parseInt(this.toSlider.value, 10);
    return [from, to];
  }

  fillSlider(sliderColor: string, rangeColor: string) {
    const rangeDistance: number = +this.toSlider.max - +this.toSlider.min;
    const fromPosition: number = +this.fromSlider.value - +this.toSlider.min;
    const toPosition: number = +this.toSlider.value - +this.toSlider.min;
    this.toSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
  }

  setToggleAccessible() {
    // const toSlider = document.querySelector("#toSlider");
    if (Number(this.toSlider.value) <= 0) {
      this.toSlider.style.zIndex = "2";
    } else {
      this.toSlider.style.zIndex = "0";
    }
  }
}

export default DualSlider;
