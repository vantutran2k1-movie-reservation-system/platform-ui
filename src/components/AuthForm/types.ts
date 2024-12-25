export interface FormFieldState<T> {
    value: T;
    isValid: boolean;
    touched: boolean;
    isLoading?: boolean;
    errorMessage?: string;
}
