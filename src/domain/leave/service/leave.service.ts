import * as mockService from "./mock/mock.service";

export const getMembers = (pageSize: number, pageNumber?: number) => {
  return mockService.getMembers();
};
