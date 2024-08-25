import axios, { CreateAxiosDefaults } from "axios";

const options: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

export const axiosClassic = axios.create(options);
