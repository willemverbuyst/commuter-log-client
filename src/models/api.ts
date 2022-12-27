export type ApiResponse<T> = {
  status: boolean;
  error: string | null;
  content: T[];
};
