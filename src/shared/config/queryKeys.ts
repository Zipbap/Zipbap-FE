export const queryKeys = {
  myCategories: {
    key: 'myCategories',
    all: ['myCategories'] as const,
    list: () => [...queryKeys.myCategories.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.myCategories.all, 'detail', id] as const,
  },

  products: {
    key: 'products',
    all: ['products'] as const,
    list: () => [...queryKeys.products.all, 'list'] as const,
    detail: (id: number) => [...queryKeys.products.all, 'detail', id] as const,
  },
  recipes: {
    key: 'recipes',
    all: ['recipes'] as const,
    list: () => [...queryKeys.recipes.all, 'list'] as const,
    detail: (id: number) => [...queryKeys.recipes.all, 'detail', id] as const,
  },
  recipeTemp: {
    key: 'recipeTemp',
    all: ['recipeTemp'] as const,
    list: () => [...queryKeys.recipeTemp.all, 'list'] as const,
    detail: (id: number) => [...queryKeys.recipeTemp.all, 'detail', id] as const,
  },
  recipeFinal: {
    key: 'recipeFinal',
    all: ['recipeFinal'] as const,
    list: () => [...queryKeys.recipeFinal.all, 'list'] as const,
    detail: (id: number) => [...queryKeys.recipeFinal.all, 'detail', id] as const,
  },
} as const;
