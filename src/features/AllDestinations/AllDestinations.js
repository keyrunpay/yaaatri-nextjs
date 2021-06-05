import React from "react";
import styled from "styled-components";
import KLoader from "../../core/components/KLoader";
import decodeApiMessage from "../../core/helpers/decodeApiMessage";
import SubPageHeader from "../../core/ui/SubPageHeader";
import DataTable from "react-data-table-component";
import tableCustomStyles from "../../core/helpers/tableCustomStyles";
import tableColumn from "./destinations.table";
import { onReadAllDestinations } from "../../services/destination.service";

export default function AllDestinations() {
  const [destinations, setDestinations] = React.useState({
    status: "idle",
    data: null,
  });

  const fetchDestinations = async () => {
    setDestinations({ status: "loading", data: null });
    try {
      const res = await onReadAllDestinations();
      setDestinations({ status: "data", data: res });
    } catch (err) {
      setDestinations({ status: "error", data: err });
    }
  };

  React.useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/");
    else fetchDestinations();
  }, []);

  return (
    <MyStoryWrapper>
      <SubPageHeader title="All Destinations" orange_line />
      <div className="container">
        <div className="flex story-head jcsb">
          <h1 className="title">All Destinations</h1>
        </div>

        {destinations.status === "loading" && <KLoader />}
        {destinations.status === "error" && (
          <div className="text-red">{decodeApiMessage(destinations.data)}</div>
        )}

        {destinations.status === "data" && (
          <DataTable
            customStyles={tableCustomStyles}
            className="data-table"
            pagination={true}
            onRowClicked={(row) => {}}
            noHeader
            highlightOnHover
            responsive={true}
            data={destinations.data}
            columns={tableColumn()}
          />
        )}
      </div>
      <br />
    </MyStoryWrapper>
  );
}

const MyStoryWrapper = styled.div`
  .story-head {
    margin-bottom: 12px;

    .display-mode {
      span {
        font-size: 24px;
        cursor: pointer;
        margin-left: 16px;
        padding: 2px;

        &:hover {
          svg {
            color: var(--secondary) !important;
          }
        }
      }
    }
  }
`;
