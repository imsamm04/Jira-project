import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { Select, Slider } from "antd";
import { useEffect } from "react";
import { GET_ALL_PROJECT_SAGA } from "../../../redux/constants/Cyberbugs/ProjectCyberBugsConstants";
import { GET_ALL_TASK_TYPE_SAGA } from "../../../redux/constants/Cyberbugs/TaskTypeConstants";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/constants/Cyberbugs/PriorityConstants";

const { Option } = Select;

export default function FormCreateTask() {
  const children = [];
  const handleEditorChange = (value, editor) => {};
  const [size, setSize] = useState("middle");
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const dispatch = useDispatch();

  const { arrProject } = useSelector((state) => state.ProjectCyberBugsReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { userSearch } = useSelector(
    (state) => state.UserLoginCyberBugsReducer
  );

  const userOptions = userSearch.map((item, index) => {
    return { value: item.userId, label: item.name };
  });

  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }
  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
  };

  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  useEffect(() => {
    dispatch({
      type: GET_ALL_PROJECT_SAGA,
    });
    dispatch({
      type: GET_ALL_TASK_TYPE_SAGA,
    });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: "GET_USER_API", keyWord: "" });
  }, []);

  return (
    <div className="container">
      <div className="form-group">
        <p>Project</p>
        <select name="projectId" className="form-control">
          {arrProject?.map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item.projectName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Priority</p>
            <select name="priorityId" className="form-control">
              {arrPriority.map((priority, index) => {
                return (
                  <option key={index} value={priority.priorityId}>
                    {priority.priority}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-6">
            <p>Task type</p>
            <select className="form-control" name="typeId">
              {arrTaskType?.map((item, index) => {
                return <option key={index}>{item.taskType}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Assignees</p>
            <Select
              mode="multiple"
              size={size}
              options={userOptions}
              placeholder="Please select"
              optionFilterProp="label"
              onChange={(values) => {
                //set lại giá trị cho lstUserAsign
              }}
              onSelect={(value) => {
                console.log(value);
              }}
              style={{ width: "100%" }}
            >
              {children}
            </Select>
            <div className="row mt-5">
              <div className="col-12">
                <p>Original Estimate</p>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  defaultValue="0"
                  name="originalEstimate"
                ></input>
              </div>
            </div>
          </div>
          <div className="col-6 mt-4">
            <p>Time tracking</p>

            <Slider
              defaultValue={30}
              tooltip={{
                open: true,
              }}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
              value={timeTracking.timeTrackingSpent}
            />
            <div className="row">
              <div className="col-6 text-left font-weight-bold">
                {timeTracking.timeTrackingSpent}h logged
              </div>
              <div className="col-6 text-right font-weight-bold">
                {timeTracking.timeTrackingRemaining}h logged
              </div>
            </div>
            <div className="row" style={{ marginTop: "12px" }}>
              <div className="col-6">
                <p>Time spent</p>
                <input
                  min="0"
                  defaultValue="0"
                  type="number"
                  className="form-control"
                  name="timeTrackingSpent"
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                  }}
                ></input>
              </div>
              <div className="col-6">
                <p>Time remaining</p>
                <input
                  min="0"
                  defaultValue="0"
                  type="number"
                  className="form-control"
                  name="timeTrackingRemaining"
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                  }}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <p>Description</p>
        <Editor
          name="description"
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
          onEditorChange={handleEditorChange}
        />
      </div>
    </div>
  );
}
