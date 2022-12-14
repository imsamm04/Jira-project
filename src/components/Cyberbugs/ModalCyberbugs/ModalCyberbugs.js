import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import Icon, { ExclamationCircleOutlined } from "@ant-design/icons";
import { GET_ALL_STATUS_SAGA } from "../../../redux/constants/Cyberbugs/StatusConstant";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/constants/Cyberbugs/PriorityConstants";

import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  DELETE_TASK_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  UPDATE_STATUS_TASK_SAGA,
} from "../../../redux/constants/Cyberbugs/TaskConstants";
import { GET_ALL_TASK_TYPE_SAGA } from "../../../redux/constants/Cyberbugs/TaskTypeConstants";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Input, message, Modal, Popconfirm, Select } from "antd";
import {
  CREATE_USER_COMMENT,
  DELETE_USER_COMMENT,
  GET_ALL_USER_COMMENT,
  GET_ALL_USER_COMMENT_SAGA,
} from "../../../redux/constants/Cyberbugs/Comment";
import { DELETE_TASK_API } from "../../../redux/constants/ToDoListConst";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const { Option } = Select;

export default function ModalCyberbugs(props) {
  const { taskDetailModal } = useSelector((state) => state.TaskReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const { arrComment } = useSelector((state) => state.CommentReducer);

  const [historyContent, setHistoryContent] = useState(
    taskDetailModal.description
  );
  const [content, setContent] = useState(taskDetailModal.description);
  const [visibleEditor, setVisibleEditor] = useState(false);

  const [openModal, setOpenModal] = useState(true);
  const [styleModal, setStyleModal] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    "Are you sure want to delete this task?"
  );

  console.log("arrComment-->>>", arrComment);

  const confirm = () =>
    new Promise((resolve) => {
      dispatch({
        type: DELETE_TASK_SAGA,
        taskId: taskDetailModal.taskId,
      });
      setOpenModal(false);
      // setStyleModal("hide");
      setTimeout(() => resolve(null), 1000);
    });

  const dispatch = useDispatch();
  // const { Option } = Select;
  const dayjs = require("dayjs");

  const [name, setName] = useState("");

  const addComment = (e) => {
    e.preventDefault();
    // const contentComment = state;
    dispatch({
      type: CREATE_USER_COMMENT,
      commentValue: {
        contentComment: name,
        taskId: taskDetailModal.taskId,
      },
    });
    setName("");
    // alert(`The name you entered was: ${name}`);
  };

  const confirmDeleteComment = (e) => {
    debugger;
    dispatch({
      type: DELETE_USER_COMMENT,
      id: e,
    });
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const renderDescription = () => {
    const jsxDescription = ReactHtmlParser(taskDetailModal.description);
    return (
      <div>
        {visibleEditor ? (
          <div>
            <Editor
              name="description"
              initialValue={taskDetailModal.description}
              init={{
                selector: "textarea#myTextArea",
                height: 500,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help",
              }}
              onEditorChange={(content, editor) => {
                setContent(content);
              }}
            />
            {/* <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch({
                  type: CHANGE_TASK_MODAL,
                  name: "description",
                  value: content,
                });
                setvisibleEditor(false);
              }}
            >
              Save
            </button> */}
            <button
              className="btn btn-primary ml-0"
              onClick={() => {
                dispatch({
                  type: HANDLE_CHANGE_POST_API_SAGA,
                  actionType: CHANGE_TASK_MODAL,
                  name: "description",
                  value: content,
                });
                setVisibleEditor(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                // dispatch({
                //   type: CHANGE_TASK_MODAL,
                //   name: "description",
                //   // value: historyContent,
                // });

                dispatch({
                  type: HANDLE_CHANGE_POST_API_SAGA,
                  actionType: CHANGE_TASK_MODAL,
                  name: "description",
                  value: historyContent,
                });

                setVisibleEditor(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div
            onClick={() => {
              setHistoryContent(taskDetailModal.description);
              setVisibleEditor(!visibleEditor);
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: HANDLE_CHANGE_POST_API_SAGA,
      actionType: CHANGE_TASK_MODAL,
      name,
      value,
    });
    // dispatch({
    //   type: CHANGE_TASK_MODAL,
    //   name,
    //   value,
    // });
  };
  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;
    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);
    const percent = Math.round(Number((timeTrackingSpent / max) * 100));

    return (
      <div>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={max}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p className="logged">{Number(timeTrackingSpent)}h logged</p>
              <p className="estimate-time">
                {Number(timeTrackingRemaining)}h remaining
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingSpent"
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingRemaining"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
    // dispatch({
    //   type: GET_ALL_USER_COMMENT_SAGA,
    //   taskId: taskDetailModal.taskId,
    // });
  }, []);

  return openModal ? (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="false"
    // style={{ backgroundColor: styleModal }}
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark" />
              <select
                className="form-select"
                onChange={(e) => {
                  handleChange(e);
                }}
                name="typeId"
                value={taskDetailModal.typeId}
              >
                {arrTaskType.map((tp, index) => {
                  return (
                    <option key={index} value={tp.id}>
                      {tp.taskType}
                    </option>
                  );
                })}
              </select>
              <span>{taskDetailModal.taskName}</span>
            </div>
            <div style={{ display: "flex" }} className="task-click">
              <div>
                <i className="fab fa-telegram-plane mr-2" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link mr-2" />
                <a
                  onClick={() => {
                    // navigator.clipboard.writeText(state.textToCopy);
                  }}
                  href="#"
                  style={{ paddingRight: 20 }}
                >
                  Copy link
                </a>
              </div>
              {/* <i
                //   onClick={() => {
                //     dispatch({
                //       type: DELETE_TASK_SAGA,
                //       taskId: taskDetailModal.taskId,
                //     });
                //   }
                // }

                onClick={showDeleteConfirm()}
                className="fa fa-trash-alt"
                style={{ cursor: "pointer" }}
              /> */}
              <Popconfirm
                title="Confirm delete"
                onConfirm={confirm}
                onOpenChange={() => console.log("open change")}
              // onChange={(e) => {
              //   handleChange(e);
              // }}
              >
                <Button type="danger">Delete task</Button>
              </Popconfirm>
              {/* <Modal
                title="Title"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
              >
                <p>{modalText}</p>
              </Modal> */}
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              // onClick={() => {
              //   setVisibleEditor(false);
              // }}
              >
                <span aria-hidden="true">??</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">This is an issue of type: Task.</p>
                  <div className="description">
                    <p>
                      Task Description - double click below to edit task
                      description
                    </p>
                    {renderDescription()}
                  </div>
                  <div style={{ fontWeight: 500, marginBottom: 10 }}>
                    Jira Software (software projects) issue types:
                  </div>
                  <div className="title">
                    <div className="title-item">
                      <h3>
                        BUG <i className="fa fa-bug" />
                      </h3>
                      <p>
                        A bug is a problem which impairs or prevents the
                        function of a product.
                      </p>
                    </div>
                    <div className="title-item">
                      <h3>
                        STORY <i className="fa fa-book-reader" />
                      </h3>
                      <p>
                        A user story is the smallest unit of work that needs to
                        be done.
                      </p>
                    </div>
                    <div className="title-item">
                      <h3>
                        TASK <i className="fa fa-tasks" />
                      </h3>
                      <p>A task represents work that needs to be done</p>
                    </div>
                  </div>
                  <div className="comment">
                    {/* <h6>Comments</h6> */}
                    {arrComment?.map((comment, index) => {
                      return (
                        <div key={index} className="lastest-comment">
                          <div className="comment-item">
                            <div
                              className="display-comment"
                              style={{ display: "flex" }}
                            >
                              <div className="avatar">
                                <img src={comment.user.avatar} alt="true" />
                              </div>
                              <div>
                                <p
                                  style={{
                                    marginBottom: 5,
                                    fontWeight: "bold",
                                  }}
                                >
                                  {comment.user.name}{" "}
                                  <span>
                                    {dayjs("2022-03-11").format("DD/MM/YYYY")}
                                  </span>
                                </p>
                                <p style={{ marginBottom: 5 }}>
                                  {comment.contentComment}
                                </p>
                                <div>
                                  <span style={{ color: "#929398" }}>Edit</span>
                                  <span> ??? </span>
                                  {/* <span
                                    style={{
                                      color: "#929398",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      dispatch({
                                        type: DELETE_USER_COMMENT,
                                        id: comment.id,
                                      });
                                    }}
                                  >
                                    Delete
                                  </span> */}
                                  <Popconfirm
                                    title="Are you sure to delete this comment?"
                                    onConfirm={() =>
                                      confirmDeleteComment(comment.id)
                                    }
                                    onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                  // onClick={() => {
                                  //   dispatch({
                                  //     type: DELETE_USER_COMMENT,
                                  //     id: comment.id,
                                  //   });
                                  // }}
                                  >
                                    <a href="#">Delete</a>
                                  </Popconfirm>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="block-comment" style={{ display: "flex" }}>
                      <div className="avatar">
                        <img
                          src={require("../../../assets/img/download (1).jfif")}
                          alt="true"
                        />
                      </div>
                      <div className="mt-2 input-comment">
                        <form onSubmit={addComment}>
                          <Input
                            name="contentComment"
                            placeholder="Basic usage"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                          />
                          <Button htmlType="submit" className="mt-3">
                            Submit Comment
                          </Button>
                        </form>
                        <p>
                          <span style={{ fontWeight: 500, color: "gray" }}>
                            Protip:
                          </span>
                          <span>
                            press
                            <span
                              style={{
                                fontWeight: "bold",
                                background: "#ecedf0",
                                color: "#b4bac6",
                              }}
                            ></span>
                            to comment
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6 className="status-title">STATUS</h6>

                    <select
                      name="statusId"
                      //change status call api one by one
                      onChange={(e) => {
                        //solution 1
                        // const action = {
                        //   type: UPDATE_STATUS_TASK_SAGA,
                        //   taskUpdateStatus: {
                        //     taskId: taskDetailModal.taskId,
                        //     statusId: e.target.value,
                        //     projectId: taskDetailModal.projectId,
                        //   },
                        // };
                        // dispatch(action);
                        //solution 2
                        handleChange(e);
                      }}
                      className="custom-select"
                      value={taskDetailModal.statusId}
                    >
                      {arrStatus?.map((status, index) => {
                        return (
                          <option key={index} value={status.statusId}>
                            {status.statusName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="assignees">
                    <h6 className="assignees-title">ASSIGNEES</h6>
                    <div className="row">
                      {taskDetailModal.assigness.map((user, index) => {
                        return (
                          <div
                            className="col-12 mt-2"
                          // style={{ padding: "0px" }}
                          >
                            <div
                              key={index}
                              style={{ display: "flex", alignItems: "center" }}
                              className="item"
                            >
                              <div className="avatar mr-2">
                                <img src={user.avatar} alt={user.avatar} />
                              </div>
                              <p className="name">
                                {user.name}
                                <i
                                  className="fa fa-times ml-3"
                                  style={{ marginLeft: 5, cursor: "pointer" }}
                                  onClick={() => {
                                    dispatch({
                                      type: HANDLE_CHANGE_POST_API_SAGA,
                                      actionType: "REMOVE_USER_ASSIGN",
                                      userId: user.id,
                                    });

                                    // dispatch({
                                    //   type: "REMOVE_USER_ASSIGN",
                                    //   userId: user.id,
                                    // });
                                  }}
                                />
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div
                        className="col-6 mt-4"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        {/* <select
                          name="lstUser"
                          className="form-control"
                          onChange={(e) => {
                            let { name, value } = e.target;
                            if (value == 0) {
                              return;
                            }
                            let userSelected = projectDetail.members.find(
                              (mem) => mem.userId == value
                            );

                            userSelected = {
                              ...userSelected,
                              id: userSelected.userId,
                            };
                            dispatch({
                              type: CHANGE_ASSIGNESS,
                              userSelected: userSelected,
                            });
                            console.log("userSelected----", userSelected);
                          }}
                        >
                          <option value={0} selected>
                            Select user assign
                          </option>
                          {projectDetail.members
                            ?.filter((mem) => {
                              let index = taskDetailModal.assigness?.findIndex(
                                (us) => us.id === mem.userId
                              );
                              if (index != -1) {
                                return false;
                              }
                              return true;
                            })
                            .map((mem, index) => {
                              return (
                                <option key={index} value={mem.userId}>
                                  {mem.name}
                                </option>
                              );
                            })}
                        </select> */}
                        <Select
                          // className="form-control"
                          name="lstUser"
                          showSearch
                          style={{ width: 200 }}
                          placeholder="Search to Select"
                          optionFilterProp="label"
                          value="+ Add more user"
                          onSelect={(value) => {
                            if (value == 0) {
                              return;
                            }
                            let userSelected = projectDetail.members.find(
                              (mem) => mem.userId == value
                            );

                            userSelected = {
                              ...userSelected,
                              id: userSelected.userId,
                            };
                            // dispatch({
                            //   type: CHANGE_ASSIGNESS,
                            //   userSelected: userSelected,
                            // });

                            dispatch({
                              type: "HANDLE_CHANGE_POST_API_SAGA",
                              actionType: CHANGE_ASSIGNESS,
                              userSelected: userSelected,
                            });
                            console.log("userSelected----", userSelected);
                          }}
                        >
                          {projectDetail.members
                            ?.filter((mem) => {
                              let index = taskDetailModal.assigness?.findIndex(
                                (us) => us.id === mem.userId
                              );
                              if (index != -1) {
                                return false;
                              }
                              return true;
                            })
                            .map((mem, index) => {
                              return (
                                <option key={index} value={mem.userId}>
                                  {mem.name}
                                </option>
                              );
                            })}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="reporter mt-4">
                    <h6 className="reporter-title">REPORTER</h6>
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                      className="item col-12"
                    >
                      <div className="avatar mr-2">
                        <img
                          src={require("../../../assets/img/download (1).jfif")}
                          alt="true"
                        />
                      </div>
                      <p className="name ml-2">
                        Pickle Rick
                        <i
                          className="fa fa-times ml-3"
                          style={{ marginLeft: 5 }}
                        />
                      </p>
                    </div>
                  </div>
                  <div className="priority" style={{ marginBottom: 20 }}>
                    <h6 className="priority-title">PRIORITY</h6>
                    <select
                      name="priorityId"
                      className="form-control"
                      value={taskDetailModal.priorityId}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      {arrPriority?.map((item, index) => {
                        return (
                          <option key={index} value={item.priorityId}>
                            {item.priority}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="estimate">
                    <h6 className="estimate-title">
                      ORIGINAL ESTIMATE (HOURS)
                    </h6>
                    <input
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      name="originalEstimate"
                      value={taskDetailModal.originalEstimate}
                      type="text"
                      className="estimate-hours"
                    />
                  </div>
                  <div className="">
                    <h6 className="time-tracking-title">TIME TRACKING</h6>
                    {renderTimeTracking()}
                  </div>
                  <div style={{ color: "#929398" }}>Create at a month ago</div>
                  <div style={{ color: "#929398" }}>
                    Update at a few seconds ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
