import { axiosClassic } from "@/axios";

export const CartItemService = {
  async createCartItem(data: CartItemCreate): Promise<Cart> {
    return await axiosClassic.post<CartItemCreate, Cart>("/api/cart", { data });
  },
  async deleteCartItem(id: string): Promise<Cart> {
    return await axiosClassic.delete<CartItemCreate, Cart>(`/api/cart/${id}`);
  },
  async patchCartItem({ id, quantity }: { id: string; quantity: number }): Promise<Cart> {
    return await axiosClassic.patch<CartItemCreate, Cart>(`/api/cart/${id}`, { quantity });
  },
};
