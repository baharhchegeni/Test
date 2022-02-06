import { useState } from "react";
import { LeaveType } from "./constants/leave.enum";
import { ILeaveSearchFilter } from "./interfaces/general";

export interface ILeaveFilterProps {
  filterChanged: (filter: ILeaveSearchFilter) => void;
}
const LeavesFilter: React.FC<ILeaveFilterProps> = (
  props: ILeaveFilterProps
) => {
  const [state, $state] = useState<ILeaveSearchFilter>({
    startDate: undefined,
    type: "",
  });
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    e.persist();
    const { id, name, value, type } = e.target;
    const newState: ILeaveSearchFilter = { ...state, [name]: value };
    $state({ ...state, [name]: value });
    props.filterChanged(newState);
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}>
          <span>Type:</span>
        </div>
        <div style={{ flexGrow: 2 }}>
          {" "}
          <select name="type" onChange={handleChange}>
            <option value={""}>{"---"}</option>
            <option value={LeaveType.SICKNESS}>{LeaveType.SICKNESS}</option>
            <option value={LeaveType.VACATION}>{LeaveType.VACATION}</option>
          </select>
        </div>
        <div style={{ flexGrow: 1 }}>
          <span>StartDate:</span>
        </div>
        <div style={{ flexGrow: 2 }}>
          <input type={"date"} name="startDate" onChange={handleChange}></input>
        </div>
        <div style={{ flexGrow: 6 }}></div>
      </div>{" "}
    </>
  );
};

export default LeavesFilter;
