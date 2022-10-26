import { Button, Popover, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { useEffect } from "react";
import Icon, { DeleteOutlined, FormOutlined } from "@ant-design/icons";
import FormEditProject from "../../../components/Forms/FormEditProject.js/FormEditProject";
import Avatar from "antd/lib/avatar/avatar";
import { AutoComplete } from "antd";

export default function ProjectManagement(props) {
  const projectList = useSelector(
    (state) => state.ProjectCyberBugsReducer.projectList
  );
  console.log("projectList", projectList);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_LIST_PROJECT_SAGA" });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (item2, item1) => item1.id - item2.id,
      // sortDirections: ["descend"],
      // sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName1?.trim().toLowerCase();
        let projectName2 = item2.projectName2?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
      sortDirections: ["descend"],
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Creator",
      // dataIndex: "creator",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Members",
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return <Avatar key={index} src={member.avatar} />;
            })}
            {record.members?.length >= 3 ? <Avatar>...</Avatar> : <></>}
            <Popover
              placement="rightTop"
              title={"add user"}
              content={() => {
                return (
                  <AutoComplete
                    // options={options}
                    style={{ width: 200 }}
                    // onSelect={onSelect}
                    // onSearch={onSearch}
                    placeholder="input here"
                  />
                );
              }}
              trigger="click"
            >
              <Button shape="circle" size="medium" style={{ top: "2px" }}>
                +
              </Button>
            </Popover>
          </div>
        );
      },
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text, record, index) => {
    //     const jsxDescription = ReactHtmlParser(text);
    //     return <div>{jsxDescription}</div>;
    //   },
    // },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record, index) => {
        return (
          <div>
            <button
              className="btn mr-2 btn-primary"
              onClick={() => {
                const action = {
                  type: "OPEN_FORM_EDIT_PROJECT",
                  Component: <FormEditProject />,
                };
                dispatch(action);
                const actionEditProject = {
                  type: "EDIT_PROJECT",
                  projectEditModal: record,
                };
                dispatch(actionEditProject);
              }}
            >
              <FormOutlined />
            </button>
            <button className="btn btn-danger">
              <DeleteOutlined />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container-fluid mt-5">
      <h3>Project Management</h3>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={projectList}
        onChange={handleChange}
      />
    </div>
  );
}
