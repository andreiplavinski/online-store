export function resFound(cardFound: HTMLElement, catalog: HTMLElement): void {
  cardFound.textContent = `Found: ${catalog.querySelectorAll(".card").length}`;
}

export function countProductView(
  filter: HTMLElement,
  category: string,
  array: string[]
): void {
  const filtcat: NodeListOf<Element> = filter.querySelectorAll(
    `input[name="${category}"]`
  );

  const writeCategCount: NodeListOf<Element> = filter.querySelectorAll(
    `input[name="${category}"] ~ .filter-block__count`
  );

  filtcat.forEach((el, i) => {
    const arr1: string[] = array.reduce((acc: string[], curr) => {
      if (el instanceof HTMLInputElement && curr === el.value) acc.push(curr);
      return acc;
    }, []);
    writeCategCount[i].textContent = ` ( ${arr1.length}/`;

    if (arr1.length === 0) {
      el.parentElement?.classList.add("filter-block__label_disabled");
    } else {
      el.parentElement?.classList.remove("filter-block__label_disabled");
    }
  });
}

export function clickSize(el: HTMLElement) {
  const cardBlock: NodeListOf<HTMLElement> = document.querySelectorAll(".card");
  const cardInfo: NodeListOf<HTMLElement> =
    document.querySelectorAll(".card__description");
  if (el.textContent === "4 elements") {
    cardBlock.forEach((elem, i) => {
      elem.style.width = "24%";
      elem.style.minHeight = "225px";
      cardInfo[i].style.display = "block";
    });
  } else if (el.textContent === "6 elements") {
    cardBlock.forEach((elem, i) => {
      elem.style.width = "15.66%";
      elem.style.minHeight = "100px";
      cardInfo[i].style.display = "none";
    });
  }
}

export function controlSliders(
  filter: HTMLElement,
  array: number[],
  arrayEl: Array<HTMLElement>,
  num: number,
  value?: string
): void {
  const writerResFromSlider: NodeListOf<HTMLInputElement> =
    filter.querySelectorAll(".fromSlider");
  const writerResToSlider: NodeListOf<HTMLInputElement> =
    filter.querySelectorAll(".toSlider");
  const textFrom: NodeListOf<HTMLElement> = filter.querySelectorAll(
    ".filter-block__min-value"
  );
  const textTo: NodeListOf<HTMLElement> = filter.querySelectorAll(
    ".filter-block__max-value"
  );
  const nonValue: NodeListOf<HTMLElement> = filter.querySelectorAll(
    ".filter-block__non-value"
  );

  array.sort((a, b) => a - b);
  if (arrayEl.length !== 0) {
    writerResFromSlider[num].value = String(array[0]);
    writerResToSlider[num].value = String(array[array.length - 1]);
    nonValue[num].textContent = " <-> ";
    textFrom[num].textContent = `${value} ${array[0]}`;
    textTo[num].textContent = `${value} ${array[array.length - 1]}`;
  } else {
    nonValue[num].textContent = "Нічога не знойдзена";
    textFrom[num].textContent = "";
    textTo[num].textContent = "";
  }
}

interface IProducts {
  [key: number]: number;
}
let prodIdCount: IProducts = {};

export function AddToCart(cardButtonAdd: HTMLElement) {
  cardButtonAdd.addEventListener("click", () => {
    if (
      !localStorage.getItem("product") ||
      !Object.keys(
        JSON.parse(localStorage.getItem("product") || "{}")
      ).includes(`${Number(cardButtonAdd.getAttribute("data-id"))}`)
    ) {
      cardButtonAdd.textContent = "Drop From Cart";

      prodIdCount = JSON.parse(localStorage.getItem("product") || "{}");
      prodIdCount[Number(cardButtonAdd.getAttribute("data-id"))] = 1;

      localStorage.setItem("product", JSON.stringify(prodIdCount));
    } else if (
      Object.keys(JSON.parse(localStorage.getItem("product") || "{}")).includes(
        `${Number(cardButtonAdd.getAttribute("data-id"))}`
      ) &&
      Object.keys(prodIdCount).includes(
        `${Number(cardButtonAdd.getAttribute("data-id"))}`
      )
    ) {
      delete prodIdCount[Number(cardButtonAdd.getAttribute("data-id"))];
      localStorage.setItem("product", JSON.stringify(prodIdCount));

      cardButtonAdd.textContent = "Add To Cart";
    } else if (
      Object.keys(JSON.parse(localStorage.getItem("product") || "{}")).includes(
        `${Number(cardButtonAdd.getAttribute("data-id"))}`
      ) &&
      !Object.keys(prodIdCount).includes(
        `${Number(cardButtonAdd.getAttribute("data-id"))}`
      )
    ) {
      prodIdCount = JSON.parse(localStorage.getItem("product") || "{}");
      delete prodIdCount[Number(cardButtonAdd.getAttribute("data-id"))];
      localStorage.setItem("product", JSON.stringify(prodIdCount));

      cardButtonAdd.textContent = "Add To Cart";
    }
  });
}
