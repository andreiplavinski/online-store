export function resFound(cardFound: HTMLElement, catalog: HTMLElement): void {
  cardFound.textContent = `Found: ${catalog.querySelectorAll(".card").length}`;
}

export function writeRes(selectorName: string): number {
  return document.getElementsByClassName(selectorName).length;
}

// export function writeResFound() {
//   const cardFound: HTMLElement | null =
//     document.querySelector(".catalog__found");
//   const catalog: HTMLElement | null = document.querySelector(".catalog");
//   if (cardFound !== null && catalog !== null) return cardFound, catalog;
// }
