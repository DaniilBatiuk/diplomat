import { axiosClassic } from "@/axios";

export const PropertiesService = {
  async getAllPropertyToSubcategory(subcategoryId: string): Promise<{ name: string }[]> {
    return (
      await axiosClassic.get<{ name: string }[]>(`/api/properties?subcategoryId=${subcategoryId}`)
    ).data;
  },
};
