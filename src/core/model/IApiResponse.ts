export interface IApiPagedResponse<T> {
    result: T | undefined;
    totalNumber: number;
    page: number;
    status: number;
    message: string;
}