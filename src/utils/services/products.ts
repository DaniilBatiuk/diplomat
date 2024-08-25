import { axiosClassic } from "@/axios";

export const ProductsService = {
  async getAllProducts(): Promise<Product[]> {
    return (await axiosClassic.get<Product[]>("/api/products")).data;
  },
  async getAllActiveProducts(): Promise<Product[]> {
    return (await axiosClassic.get<Product[]>("/api/activeProducts")).data;
  },
  async getOneProduct(productId: string): Promise<Product> {
    return (await axiosClassic.get<Product>(`/api/products?productId=${productId}`)).data;
  },
};
