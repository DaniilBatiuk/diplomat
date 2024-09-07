import { axiosClassic } from "@/axios";

export const CartService = {
  async getCart(): Promise<Cart> {
    return (await axiosClassic.get<Cart>("/api/cart")).data;
  },
  async createCart(): Promise<Cart> {
    return (await axiosClassic.post<Cart>("/api/cart")).data;
  },
};
