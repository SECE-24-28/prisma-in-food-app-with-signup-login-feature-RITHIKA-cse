export type FoodItem = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  available: boolean;
};

export type Category = {
  _id: string;
  name: string;
  image: string;
};

