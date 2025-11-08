export const queryKeys = {
  myCategories: {
    key: 'myCategories',
    all: ['myCategories'] as const,
    list: () => [...queryKeys.myCategories.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.myCategories.all, 'detail', id] as const,
  },
  categories: {
    key: 'categories',
    all: ['categories'] as const,
    list: () => [...queryKeys.categories.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.categories.all, 'detail', id] as const,
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
    detail: (id: string) => [...queryKeys.recipes.all, 'detail', id] as const,
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

  // NOTE : 김기수 작업
  feed: {
    key: 'feed',
    all: ['feed'] as const,
    list: () => [...queryKeys.feed.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.feed.all, 'detail', id] as const,
  },
  bookmark: {
    key: 'bookmark',
    all: ['bookmark'] as const,
    list: () => [...queryKeys.bookmark.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.bookmark.all, 'detail', id] as const,
  },
  user: {
    key: 'user',
    all: ['user'] as const,
    me: ['users', 'me'] as const,
  },
} as const;
