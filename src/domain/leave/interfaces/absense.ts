import { LeaveType } from "../constants/leave.enum";

export interface IPureAbsence {
  admitterId?: number;
  admitterNote?: number;
  confirmedAt?: Date;
  createdAt?: Date;
  crewId?: number;
  endDate?: Date;
  id?: number;
  memberNote?: string;
  rejectedAt?: Date;
  startDate?: Date;
  type?: LeaveType;
  userId?: number;
}

export interface IAbsence extends IPureAbsence {
  name: string;
  status: string;
}
