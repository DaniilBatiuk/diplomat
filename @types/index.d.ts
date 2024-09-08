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

type PatchProductStatus = {
  id: string;
  status: Status;
};

type PatchProduct = {
  id: string;
} & CreateProduct;

type CreateProperty = {
  name: string;
  value: string;
  productId: string;
  subcategoryId: string;
};

type Category = {
  id: string;
  name: string;
  subcategories: {
    id: string;
    name: string;
  }[];
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

type SubcategorySearch = {
  id: string;
  name: string;
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
    categoryId: string;
  };
  createdAt: Date;
  savedItem: {
    id: string;
    saved: {
      id: string;
      token: string;
    };
  }[];
};

type UniqueProperty = {
  name: string;
  values: {
    value: string;
    isSelected: boolean;
  }[];
};

type Cart = {
  id: string;
  token: string;
  totalPrice: number;
  items: Item[];
};

type Item = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    count: number;
    imageUrls: string[];
  };
};

type CartItemCreate = {
  quantity: number;
  productId: string;
  cartId?: string;
};

type IsReadyPriceState = {
  fetchingCart: boolean;
  patchCartItem: boolean;
};

type UserAuth = {
  id: string;
  role: UserRole;
  name: string;
} | null;

type User = {
  id: string;
  role: UserRole;
  fullName: string;
  cartId: string | null;
  cart: {
    id: string;
    token: true;
  };
};

type Saved = {
  id: string;
  token: string;
  savedItems: SavedItem[];
};

type SavedItem = {
  id: string;
  product: Product;
};
