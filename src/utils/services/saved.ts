import { axiosClassic } from "@/axios";

export const SavedService = {
  async getSaved(): Promise<Saved> {
    return (await axiosClassic.get<Saved>("/api/saved")).data;
  },
  async createSaved(productId: string): Promise<Saved> {
    return (await axiosClassic.post<Saved>("/api/saved", { data: { productId: productId } })).data;
  },
};
