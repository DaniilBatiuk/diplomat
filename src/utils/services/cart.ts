import { axiosClassic } from "@/axios";

export const CartService = {
  async getCart(): Promise<Cart> {
    return (await axiosClassic.get<Cart>("/api/cart")).data;
  },
};
