type CreateProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  count: number;
  imageUrls: string[];
  orderStatus: OrderStatus;
  properties: {
    name: string;
    value: string;
  }[];
};

type Category = {
  id: string;
  name: string;
  subcategories: Subcategory[];
  createdAt: Date;
  updatedAt: Date;
};
