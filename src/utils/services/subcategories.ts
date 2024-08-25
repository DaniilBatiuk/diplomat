import { axiosClassic } from "@/axios";

export const SubcategoriesService = {
  async getAllSubcategories(categoryId: string): Promise<Subcategory[]> {
    return (await axiosClassic.get<Subcategory[]>(`/api/subCategories?categoryId=${categoryId}`))
      .data;
  },
};
