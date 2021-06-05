import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import moment from "moment";
import React from "react";
import { computeColor } from "../../core/helpers/file_helper";

const tableColumn = (gotoRead, gotoEdit) => {
  const renderMenu = (row) => (
    <Menu>
      <Menu.Item onClick={() => {}} key="0">
        <span style={{ color: "var(--text-black)" }}>View Destination</span>
      </Menu.Item>
      <Menu.Item onClick={() => {}} key="0">
        <span style={{ color: "var(--text-black)" }}>Edit Destination</span>
      </Menu.Item>
    </Menu>
  );

  return [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      cell: (row) => <div>{row?.name}</div>,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      cell: (row) => (
        <div style={{ color: computeColor(row?.status) }}>{row?.status}</div>
      ),
    },
    {
      name: "Views",
      selector: "views",
      sortable: true,
      hide: "md",
    },
    {
      name: "Created At",
      selector: "created_at",
      sortable: true,
      hide: "md",
      cell: (row) => (
        <div>
          <div>{moment(row?.created_at).format("Do MMM YYYY, hh:mm A")}</div>
        </div>
      ),
    },
    {
      name: "Actions",
      selector: "actions",
      cell: (row) => (
        <div>
          <Dropdown overlay={renderMenu(row)} trigger={["click"]}>
            <Button
              style={{ border: 0 }}
              shape="circle"
              icon={<MoreOutlined />}
            ></Button>
          </Dropdown>
        </div>
      ),
    },
  ];
};

export default tableColumn;
