import {
  CaretRightOutlined,
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  FastForwardFilled,
} from "@ant-design/icons";
import { Table, Tooltip } from "antd";
import React, { useState } from "react";

const AppTable = ({ datasource, onEditClickHandler, onDeleteClickHandler }) => {
  const [status, setStatus] = useState("pending");

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
    },

    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },

    {
      title: "DueDate",
      dataIndex: "DueDate",
      key: "DueDate",
    },

    {
      title: "Tags",
      dataIndex: "Tag",
      key: "Tag",
    },

    {
      title: "Actions",
      key: "Actions",
      render: (record) => {
        console.log("record", record);
        return (
          <>
            <EditOutlined
              style={{ color: "blue", marginRight: "25px", fontSize: "20px" }}
              onClick={() =>
                onEditClickHandler(
                  record.title,
                  record.Description,
                  record.DueDate,
                  record.Tag
                )
              }
            />
            <DeleteOutlined
              style={{ color: "red", marginRight: "25px", fontSize: "20px" }}
              onClick={() => onDeleteClickHandler(record)}
            />
            {status == "pending" ? (
              <Tooltip title={"pending"}>
                <CaretRightOutlined
                  onClick={() => setStatus("progress")}
                  style={{ fontSize: "20px" }}
                />
              </Tooltip>
            ) : status === "progress" ? (
              <Tooltip title={"Progress"}>
                <FastForwardFilled
                  onClick={() => setStatus("Done")}
                  style={{ fontSize: "20px" }}
                />
              </Tooltip>
            ) : status === "Done" ? (
              <Tooltip title={"Done"}>
                <CheckOutlined style={{ fontSize: "20px" }} />
              </Tooltip>
            ) : null}
          </>
        );
      },
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={datasource}
        pagination={true}
      />
    </>
  );
};

export default AppTable;
