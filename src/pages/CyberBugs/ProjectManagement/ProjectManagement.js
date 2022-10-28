import { Button, Popconfirm, Popover, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { useEffect } from "react";
import Icon, {
  DeleteOutlined,
  FormOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import FormEditProject from "../../../components/Forms/FormEditProject.js/FormEditProject";
import Avatar from "antd/lib/avatar/avatar";
import { AutoComplete } from "antd";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import confirm from "antd/lib/modal/confirm";

export default function ProjectManagement(props) {
  const projectList = useSelector(
    (state) => state.ProjectCyberBugsReducer.projectList
  );

  const { userSearch } = useSelector(
    (state) => state.UserLoginCyberBugsReducer
  );

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const dispatch = useDispatch();
  const searchRef = useRef(null);

  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch({ type: "GET_LIST_PROJECT_SAGA" });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
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
      render: (text, record, index) => {
        return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;
      },
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
              return (
                <Popover
                  key={index}
                  placement="top"
                  title={"Members List"}
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>avatar</th>
                            <th>name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.userId}</td>
                                <td>
                                  <img
                                    src={item.avatar}
                                    width="30"
                                    height="30"
                                    style={{ borderRadius: "15px" }}
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  <button
                                    className="btn btn-danger"
                                    style={{ borderRadius: "30px" }}
                                    onClick={() => {
                                      dispatch({
                                        type: "REMOVE_USER_PROJECT_API",
                                        userProject: {
                                          userId: item.userId,
                                          projectId: record.id,
                                        },
                                      });
                                    }}
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar key={index} src={member.avatar} />
                </Popover>
              );
            })}
            {record.members?.length >= 3 ? <Avatar>...</Avatar> : <></>}
            <Popover
              placement="rightTop"
              title={"Add user"}
              content={() => {
                return (
                  <AutoComplete
                    options={userSearch?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    style={{ width: 200 }}
                    // onSelect={onSelect}
                    value={value}
                    onSelect={(valueSelect, option) => {
                      // set gia tri
                      setValue(option.label);
                      // call api create user
                      dispatch({
                        type: "ADD_USER_PROJECT_API",
                        userProject: {
                          projectId: record.id,
                          userId: valueSelect,
                        },
                      });
                    }}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    onSearch={(value) => {
                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispatch({
                          type: "GET_USER_API",
                          keyWord: value,
                        });
                      }, 300);
                    }}
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
        const showDeleteConfirm = () => {
          confirm({
            title: "Are you sure delete this Project?",
            icon: <ExclamationCircleOutlined />,
            // content: "Some descriptions",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
              const actionDeleteProject = {
                type: "DELETE_PROJECT_SAGA",
                projectId: record.id,
              };
              dispatch(actionDeleteProject);
            },
            onCancel() {
              console.log("Cancel");
            },
          });
        };
        return (
          <div>
            <button
              className="btn mr-2 btn-primary"
              onClick={() => {
                const action = {
                  type: "OPEN_FORM_EDIT_PROJECT",
                  Component: <FormEditProject />,
                  title: "Edit project",
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
            <Button onClick={showDeleteConfirm} type="danger">
              Delete
            </Button>
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
