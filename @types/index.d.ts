type CreateProduct = {
  name: string;
  description: string;
  price: number;
  count: number;
  imageUrls: string[];
  subcategoryId: string;
  orderStatus: OrderStatus;
  properties: {
    name: string;
    value: string;
  }[];
};

type CreateProperty = {
  name: string;
  value: string;
  productId: string;
  subcategoryId: string;
};

type Category = {
  id: string;
  name: string;
  subcategories: Subcategory[];
  createdAt: Date;
  updatedAt: Date;
};

type Subcategory = {
  id: string;
  name: string;
  products: Product[];
  category: Category;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
};

type CreateSubCategory = {
  name: string;
  categoryId: string;
};

type Property = {
  id: string;
  name: string;
  value: string;
  product: Product;
  createdAt: Date;
  updatedAt: Date;
};

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  count: number;
  imageUrls: string[];
  orderStatus: OrderStatus;
  status: Status;
  properties: {
    id: string;
    name: string;
    value: string;
  }[];
  subcategory: {
    id: string;
    name: string;
  };
};
