import { axiosClassic } from "@/axios";

export const UserService = {
  async updateUser(id: string): Promise<User> {
    return (await axiosClassic.patch<User>(`/api/user/${id}`)).data;
  },
};
