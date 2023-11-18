export interface HttpResponse<T> {
  status: string;
  message: string;
  error: unknown;
  data: T;
}

interface PaginatedResponse<T> {
  total: number;
  content: T;
}

export interface PaginatedHttpResponseData<T>
  extends HttpResponse<PaginatedResponse<T>> {}
