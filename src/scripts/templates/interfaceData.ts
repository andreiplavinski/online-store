export interface Card {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
}
interface CardProd {
  products: Array<Card>;
  total: number;
  skip: number;
  limit: number;
}
export default CardProd;

export interface IPage {
  render(): HTMLElement;
}
