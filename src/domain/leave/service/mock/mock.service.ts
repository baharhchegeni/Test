import { IApiPagedResponse } from "../../../../core/model/IApiResponse";
import { LeaveStaus } from "../../constants/leave.enum";
import { IAbsence, IPureAbsence } from "../../interfaces/absense";
import { ILeaveSearchFilter } from "../../interfaces/general";
import { IMember } from "../../interfaces/member";

export const resolveData = (resolve: any, data: any, timeOut?: number) => {
  return setTimeout(() => {
    resolve(data);
  }, timeOut);
};

export const getMembers = () => {
  const data = require("./data/members.json");

  return new Promise((resolve) => {
    resolveData(resolve, data.payload, 1000);
  });
};

export const getAbsences = () => {};

export const getAbsentList = (
  pageSize: number,
  pageIndex: number,
  searchFilter: ILeaveSearchFilter
): Promise<IApiPagedResponse<IAbsence[]>> => {
  var members: { payload: IMember[] } = require("./data/members.json");
  let absences: { payload: IPureAbsence[] } = {
    ...require("./data/absences.json"),
  };

  absences.payload = absences?.payload
    .filter((x) => !searchFilter.type || x.type == searchFilter.type)
    .filter(
      (s) => !searchFilter.startDate || s.startDate == searchFilter?.startDate
    );

  const totalNumber = absences?.payload?.length ?? 0;

  const startRow = pageSize * pageIndex;
  const endRow = startRow + pageSize;

  var pagedAbsents = absences.payload.slice(startRow, endRow);
  const distinictUserIds = pagedAbsents
    .map((x) => x.userId)
    .filter((y, i, arr) => arr.indexOf(y) == i);
  const filteredMembers = members.payload.filter((x) =>
    distinictUserIds.some((y) => x.userId == y)
  );
  const absentList: IAbsence[] = pagedAbsents.map((x) => ({
    ...x,
    name: filteredMembers.find((m) => m.userId === x.userId)?.name ?? "",
    status: x.confirmedAt
      ? LeaveStaus.Confirmed
      : x.rejectedAt
      ? LeaveStaus.Rejected
      : LeaveStaus.Requested,
  }));

  const response: IApiPagedResponse<IAbsence[]> = {
    result: absentList,
    page: 0,
    status: 200,
    totalNumber: totalNumber,
    message: "",
  };

  return new Promise((resolve) => {
    resolveData(resolve, response, 1000);
  });

  // return new Promise((resolve, reject) => {
  //   return reject("something went wrong"); // <-- HERE IS THE REJECT
  //  //return new Error('Errrrr')
  // });
};
