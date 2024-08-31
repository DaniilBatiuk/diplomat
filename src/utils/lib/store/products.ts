import { create } from "zustand";

type ProductFilterState = {
  fullFilteredProducts: Product[];
  filteredProductsByCategoryAndSub: Product[];
  setFilteredProductsByCategoryAndSub: (products: Product[]) => void;
  setFullFilteredProducts: (products: Product[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const useProductFilterStore = create<ProductFilterState>(set => ({
  fullFilteredProducts: [],
  filteredProductsByCategoryAndSub: [],
  setFilteredProductsByCategoryAndSub: (filteredProductsByCategoryAndSub: Product[]) =>
    set({ filteredProductsByCategoryAndSub }),
  setFullFilteredProducts: (fullFilteredProducts: Product[]) => set({ fullFilteredProducts }),
  isLoading: true,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
