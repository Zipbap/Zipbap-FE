export interface MyCategory {
  id: string;
  name: string;
}

export interface CreateMyCategoryRequest {
  name: string;
}

export interface UpdateMyCategoryRequest {
  name: string;
}

export interface CategoryItem {
  id: number | string;
  name: string;
}

export interface CategoriesResult {
  cookingTimes: CategoryItem[];
  cookingTypes: CategoryItem[];
  headcounts: CategoryItem[];
  levels: CategoryItem[];
  mainIngredients: CategoryItem[];
  methods: CategoryItem[];
  situations: CategoryItem[];
  myCategories: CategoryItem[];
}

export interface CategoriesResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: CategoriesResult;
}
