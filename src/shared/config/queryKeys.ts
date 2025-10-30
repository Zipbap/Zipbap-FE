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
} as const;
