import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Select, Slider } from "antd";
const { Option } = Select;

export default function FormCreateTask() {
  const children = [];
  const handleEditorChange = (value, editor) => {};
  const [size, setSize] = useState("middle");
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
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

  return (
    <div className="container">
      <div className="form-group">
        <p>Project</p>
        <select name="projectId" className="form-control">
          <option value="54">Project A</option>
          <option value="55">Project B</option>
        </select>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Priority</p>
            <select name="priorityId" className="form-control">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div className="col-6">
            <p>Task type</p>
            <select className="form-control" name="typeId">
              <option>New task</option>
              <option>Bugs</option>
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Assignees</p>
            <Select
              mode="tags"
              size={size}
              placeholder="Please select"
              defaultValue={["a10", "c12"]}
              onChange={handleChange}
              style={{
                width: "100%",
              }}
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
