export const transformToUniqueProperties = (products: Product[]): UniqueProperty[] => {
  // Creating an object to store unique properties
  const propertiesMap: { [key: string]: Set<string> } = {};

  // Iterating through all products and their properties
  products.forEach(product => {
    product.properties.forEach(prop => {
      if (!propertiesMap[prop.name]) {
        propertiesMap[prop.name] = new Set();
      }
      propertiesMap[prop.name].add(prop.value);
    });
  });

  // Converting the object to an array, filtering properties with fewer than 2 unique values
  const uniqueProperties: UniqueProperty[] = Object.entries(propertiesMap)
    .filter(([_, values]) => values.size >= 2)
    .map(([name, values]) => ({
      name,
      values: Array.from(values).map(value => ({
        value,
        isSelected: false,
      })),
    }));

  return uniqueProperties;
};
