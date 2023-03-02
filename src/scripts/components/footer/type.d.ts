export type Author = {
  author: string;
  href: string;
}[];

export interface IFooter {
  render(): HTMLElement;
}
