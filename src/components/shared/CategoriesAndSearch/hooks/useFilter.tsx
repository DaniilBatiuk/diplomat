import { useDebounceCallback } from "@siberiacancode/reactuse";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";
import { useEffect, useLayoutEffect, useState } from "react";

import { transformToUniqueProperties } from "../components/Aside/helpers/transformToUniqueProperties";

import { usePriceStore } from "@/utils/lib/store/price";
import { useProductFilterStore } from "@/utils/lib/store/products";
import { ProductsService } from "@/utils/services/products";

type useFilterProp = {
  category: Category | null;
  categoriesList: Category[];
};

export const useFilter = ({ category, categoriesList }: useFilterProp) => {
  const [categorySelected, setCategorySelected] = useState<Category | null>(category ?? null);
  const [subCategorySelected, setSubCategorySelected] = useState<SubcategorySearch | null>(null);
  const [properties, setProperties] = useState<UniqueProperty[]>([]);
  const [sort, setSort] = useState("Новинки");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [isLoadingProducts, seIsLoadingProducts] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search_text");
  const subcategoryName = searchParams.get("subcategory");
  const priceFrom = searchParams.get("priceFrom");
  const priceTo = searchParams.get("priceTo");
  const sortFromQuery = searchParams.get("sort");
  const subcategory = searchParams.get("subcategory");

  const setFullFilteredProducts = useProductFilterStore(state => state.setFullFilteredProducts);
  const setIsLoading = useProductFilterStore(state => state.setIsLoading);

  const price = usePriceStore(state => state.price);
  const setPrice = usePriceStore(state => state.setPrice);

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: ProductsService.getAllActiveProducts,
  });

  useLayoutEffect(() => {
    if (category) {
      setCategorySelected(category);
    }
    if (subcategoryName) {
      categoriesList.forEach(category => {
        const foundSubCategory = category.subcategories.find(
          subcategory => subcategory.name === subcategoryName,
        );
        if (foundSubCategory) {
          setSubCategorySelected(foundSubCategory);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (products) {
      let productsFilter: Product[] = [];

      let subcategoryFind: SubcategorySearch | null = null;
      categoriesList.forEach(category => {
        const foundSubCategory = category.subcategories.find(
          subcategory => subcategory.name === subcategoryName,
        );
        if (foundSubCategory) {
          subcategoryFind = foundSubCategory;
        }
      });

      if (search) {
        productsFilter = products.filter(product =>
          product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        );
      } else if (subcategoryFind) {
        productsFilter = products.filter(product => product.subcategory.id === subcategoryFind?.id);
      } else if (categorySelected) {
        productsFilter = products.filter(
          product => product.subcategory.categoryId === categorySelected.id,
        );
      } else {
        productsFilter = products;
      }

      setMinPrice(
        productsFilter.length > 0 ? Math.min(...productsFilter.map(product => product.price)) : 0,
      );
      setMaxPrice(
        productsFilter.length > 0 ? Math.max(...productsFilter.map(product => product.price)) : 0,
      );

      const resProp = transformToUniqueProperties(productsFilter).map(property => {
        const selectedValues = searchParams
          .getAll(property.name)
          .flatMap(value => value.split(","));

        return {
          ...property,
          values: property.values.map(v => ({
            ...v,
            isSelected: selectedValues.includes(v.value),
          })),
        };
      });
      setProperties(resProp);

      productsFilter = productsFilter.filter(product => {
        // Filter by price range
        let isWithinPriceRange = true;
        if (priceFrom && priceTo) {
          isWithinPriceRange = product.price >= +priceFrom && product.price <= +priceTo;
        }
        // Filter by selected properties
        const isMatchingProperties = resProp.every(property => {
          // Get selected values for the property
          const selectedValues = property.values
            .filter(value => value.isSelected)
            .map(value => value.value);

          // If no values are selected, skip this property in filtering
          if (selectedValues.length === 0) return true;

          // Check if the product has a matching property with a selected value
          return product.properties.some(
            prodProp => prodProp.name === property.name && selectedValues.includes(prodProp.value),
          );
        });

        return isWithinPriceRange && isMatchingProperties;
      });

      setSort(sortFromQuery ? sortFromQuery : "Новинки");
      if (sortFromQuery) {
        if (sortFromQuery === "Новинки") {
          productsFilter.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
        } else if (sortFromQuery === "Дешевше") {
          productsFilter.sort((a, b) => a.price - b.price);
        } else if (sortFromQuery === "Дорожче") {
          productsFilter.sort((a, b) => b.price - a.price);
        }
      } else {
        productsFilter.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      }

      if (!priceFrom && !priceTo) {
        setPrice([
          productsFilter.length > 0 ? Math.min(...productsFilter.map(product => product.price)) : 0,
          productsFilter.length > 0 ? Math.max(...productsFilter.map(product => product.price)) : 0,
        ]);
      } else if (priceFrom && priceTo) {
        setPrice([+priceFrom, +priceTo]);
      }

      setFullFilteredProducts(productsFilter);
    }

    if (products !== undefined) {
      debouncedLoading();
    }
  }, [products, searchParams]);

  const redirect = () => {
    const propertiesForQuery = properties
      .map(property => ({
        name: property.name,
        values: property.values.filter(value => value.isSelected).map(value => value.value),
      }))
      .filter(property => property.values.length > 0)
      .reduce(
        (acc, property) => {
          acc[property.name] = property.values;
          return acc;
        },
        {} as Record<string, string[]>,
      );

    const params = {
      subcategory: subcategory,
      priceFrom: price[0],
      priceTo: price[1],
      ...propertiesForQuery,
      sort: sort,
      search_text: subcategory ? "" : search,
    };

    const query = qs.stringify(params, {
      arrayFormat: "comma",
    });

    router.push(`?${query}`, {
      scroll: false,
    });
  };

  const debounced = useDebounceCallback(redirect, 200);
  const debouncedLoading = useDebounceCallback(() => {
    setIsLoading(false);
    seIsLoadingProducts(false);
  }, 200);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return {
    properties,
    categorySelected,
    setCategorySelected,
    subCategorySelected,
    setSubCategorySelected,
    setSort,
    sort,
    setProperties,
    minPrice,
    maxPrice,
    debounced,
    isLoadingProducts,
    seIsLoadingProducts,
  };
};
