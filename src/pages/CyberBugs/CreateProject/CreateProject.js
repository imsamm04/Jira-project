import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import { connect, useSelector, useDispatch } from "react-redux";

function CreateProject(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
  console.log("arrProjectCategory", arrProjectCategory);
  const editorRef = useRef(null);
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
      <form onSubmit={handleSubmit} className="container">
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
          <select name="categoryId" className="form-control">
            <option>Software</option>
            <option>Web App</option>
            <option>Mobile App</option>
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
  mapPropsToValues: () => ({}),

  // Custom sync validation
  // validationSchema: Yup.object().shape({
  //   email: Yup.string()
  //     .required("Email is required")
  //     .email("Email is invalid!"),

  //   password: Yup.string()
  //     .required("Password is required")
  //     .min(6, "Password must have in 6 characters")
  //     .max(32, "Password must have max 32 characters"),
  // }),

  handleSubmit: ({ email, password }, { props }) => {
    // let action = {
    //   type: USER_SIGNIN_API,
    //   userLogin: {
    //     email: values.email,
    //     password: values.password,
    //   },
    // };

    // props.dispatch(singinCyberbugAction(email, password));
    console.log("props redux", props);
  },

  displayName: "BasicForm",
})(CreateProject);

export default connect()(createProjectForm);
