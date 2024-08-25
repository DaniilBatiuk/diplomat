import { axiosClassic } from "@/axios";

export const CategoriesService = {
  async getAllCategories(): Promise<Category[]> {
    return (await axiosClassic.get<Category[]>("/api/categories")).data;
  },
};
