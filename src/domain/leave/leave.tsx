import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "../../core/components/table";
import { IApiPagedResponse } from "../../core/model/IApiResponse";
import { responceInterceptor } from "../../core/utils/interceptor";
import { IAbsence } from "./interfaces/absense";
import { ILeaveSearchFilter } from "./interfaces/general";
import LeavesFilter from "./leave-filter";
import * as mockService from "./service/mock/mock.service";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

function Leave() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "EndDate",
        accessor: "endDate",
      },
      {
        Header: "Admitter Note",
        accessor: "admitterNote",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Member Note",
        accessor: "memberNote",
      },
    ],
    []
  );

  // We'll start our table without any data
  const [data, $data] = React.useState<IAbsence[]>([]);
  const [loading, $loading] = React.useState(false);
  const [pageCount, $pageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);
  const [totalNumber, $totalNumber] = useState<number>(0);

  const onFilterChanged = (e: ILeaveSearchFilter) => {
    const pageIndex = 0;
    const pageSize = 10;
    fetchData({ pageIndex, pageSize }, e);
  };

  const fetchData = React.useCallback(
    ({ pageSize, pageIndex }, leaveSearchFilter?: ILeaveSearchFilter) => {
      // Give this fetch an ID
      const fetchId = ++fetchIdRef.current;

      // Set the loading state
      $loading(true);

      // Only update the data if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        if (!pageSize) {
          pageSize = 3;
        }
        if (!pageIndex) {
          pageIndex = 0;
        }

        mockService
          .getAbsentList(pageSize, pageIndex, leaveSearchFilter ?? {})
          .then((response: IApiPagedResponse<IAbsence[]>) => {
            responceInterceptor<IAbsence[]>(
              response,
              (response) => {
                $data([...(response?.result as IAbsence[])]);
                $totalNumber(response?.totalNumber);
                $pageCount(Math.ceil(response?.totalNumber / pageSize));
                $loading(false);
              },
              (response: IApiPagedResponse<IAbsence[]>) => {
                alert(response.message);
              }
            );
          })
          .catch((e) => {});
      }
    },
    []
  );

  return (
    <Styles>
      <LeavesFilter filterChanged={onFilterChanged} />
      <div>
        {" "}
        <span>Total Number:</span> {totalNumber}
      </div>
      <Table
        columns={columns}
        data={data}
        fetchData={fetchData}
        loading={loading}
        pageCount={pageCount}
        totalNumber={totalNumber}
      />
    </Styles>
  );
}

export default Leave;
