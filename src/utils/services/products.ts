import { axiosClassic } from "@/axios";

export const ProductsService = {
  async getAllProducts(): Promise<Product[]> {
    return (await axiosClassic.get<Product[]>("/api/products")).data;
  },
  async getAllActiveProducts(): Promise<Product[]> {
    return (await axiosClassic.get<Product[]>("/api/activeProducts")).data;
  },
  async getOneProduct(productId: string): Promise<Product> {
    return (await axiosClassic.get<Product>(`/api/oneProduct?productId=${productId}`)).data;
  },
  async getSimilarProducts(id: string): Promise<Product[]> {
    return (await axiosClassic.get<Product[]>(`/api/similarProducts/${id}`)).data;
  },
  async deleteOneProduct(productId: string): Promise<Product> {
    return (
      await axiosClassic.delete<Product>(`/api/products`, {
        params: { productId },
      })
    ).data;
  },
};
