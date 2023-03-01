import { IDualSlider } from "./types";

class DualSlider implements IDualSlider {
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

  controlFromSlider(val?: string): void {
    const [from, to] = this.getParsed();
    if (from > to) {
      this.fromSlider.value = String(to);
      this.fromParagraph.textContent = `${val} ${to}`;
    } else {
      this.fromParagraph.textContent = `${val} ${from}`;
    }
  }

  controlToSlider(val?: string): void {
    const [from, to] = this.getParsed();
    this.setToggleAccessible();
    if (from <= to) {
      this.toSlider.value = String(to);
      this.toParagraph.textContent = `${val} ${to}`;
    } else {
      this.toParagraph.textContent = `${val} ${from}`;
      this.toSlider.value = String(from);
    }
  }

  getParsed(): number[] {
    const from: number = parseInt(this.fromSlider.value, 10);
    const to: number = parseInt(this.toSlider.value, 10);
    return [from, to];
  }

  setToggleAccessible(): void {
    if (Number(this.toSlider.value) <= 0) {
      this.toSlider.style.zIndex = "2";
    } else {
      this.toSlider.style.zIndex = "0";
    }

    if (this.fromSlider.value === this.fromSlider.max) {
      this.fromSlider.style.zIndex = "3";
    } else {
      this.fromSlider.style.zIndex = "0";
    }

    if (this.toSlider.value === this.fromSlider.min) {
      this.toSlider.style.zIndex = "3";
    } else {
      this.toSlider.style.zIndex = "0";
    }
  }
}

export default DualSlider;
