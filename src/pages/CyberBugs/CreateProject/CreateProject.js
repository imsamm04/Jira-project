import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import { connect, useSelector, useDispatch } from "react-redux";
import { GET_ALL_PROJECT_CATEGORY_SAGA } from "../../../redux/constants/Cyberbugs/Cyberbugs";

function CreateProject(props) {
  const dispatch = useDispatch();
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );

  console.log("arrProjectCategory", arrProjectCategory);

  useEffect(() => {
    // call data from api to binding select tag
    dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });
  }, []);

  const editorRef = useRef(null);

  const onEditorChange = (content, editor) => {
    console.log("content, content");
  };
  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };

  const handleEditorChange = (content) => {
    console.log("Content was update", content);
  };
  return (
    <div className="container m-5">
      <h3>CreateProject</h3>
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        className="container"
      >
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" name="projectName"></input>
        </div>
        <div className="form-group">
          <p>Description</p>
          <Editor
            name="description"
            onInit={(evt, editor) => (editorRef.current = editor)}
            onEditorChange={handleEditorChange}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
        <div className="form-group">
          <p>Project Category</p>
          <select
            name="categoryId"
            onChange={handleChange}
            className="form-control"
          >
            {arrProjectCategory?.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-outline-primary" type="submit">
          Create Project
        </button>
      </form>
    </div>
  );
}

const createProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    projectName: "",
    description: "",
    categoryId: props.arrProjectCategory[0]?.id,
  }),

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log("values data submit", values);
  },

  displayName: "BasicForm",
})(CreateProject);

const mapStateToProps = (state) => ({
  arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
});

export default connect(mapStateToProps)(createProjectForm);
