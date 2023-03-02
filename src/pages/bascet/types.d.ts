export interface IProducts {
  [key: number]: number;
}

export interface IDiscounts {
  [key: string]: number;
}

export interface IDataProduct {
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
  images: string[];
}
