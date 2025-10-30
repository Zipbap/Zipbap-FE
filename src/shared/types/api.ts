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

export interface ApiResponse<T> {
  isSuccess: boolean;
  code?: string;
  message?: string;
  result: T;
}
