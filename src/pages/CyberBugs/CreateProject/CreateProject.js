// import React, { useEffect, useRef } from "react";
// import { Editor } from "@tinymce/tinymce-react";
// import { withFormik } from "formik";
// import { connect, useSelector, useDispatch } from "react-redux";
// import { GET_ALL_PROJECT_CATEGORY_SAGA } from "../../../redux/constants/Cyberbugs/Cyberbugs";

// function CreateProject(props) {
//   const arrProjectCategory = useSelector(
//     (state) => state.ProjectCategoryReducer.arrProjectCategory
//   );
//   const dispatch = useDispatch();
//   const {
//     values,
//     touched,
//     errors,
//     handleChange,
//     handleBlur,
//     handleSubmit,
//     setFieldValue,
//   } = props;

//   useEffect(() => {
//     // call data from api to binding select tag
//     dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });
//   }, []);

//   const editorRef = useRef(null);

//   const onEditorChange = (content, editor) => {
//     console.log("content, content");
//   };

//   const handleEditorChange = (content) => {
//     setFieldValue("description", content);
//   };
//   return (
//     <div className="container m-5">
//       <h3>CreateProject</h3>
//       <form
//         onSubmit={handleSubmit}
//         onChange={handleChange}
//         className="container"
//       >
//         <div className="form-group">
//           <p>Name</p>
//           <input className="form-control" name="projectName"></input>
//         </div>
//         <div className="form-group">
//           <p>Description</p>
//           <Editor
//             name="description"
//             onInit={(evt, editor) => (editorRef.current = editor)}
//             onEditorChange={handleEditorChange}
//             initialValue="<p>This is the initial content of the editor.</p>"
//             init={{
//               height: 500,
//               menubar: false,
//               plugins: [
//                 "advlist autolink lists link image charmap print preview anchor",
//                 "searchreplace visualblocks code fullscreen",
//                 "insertdatetime media table paste code help wordcount",
//               ],
//               toolbar:
//                 "undo redo | formatselect | " +
//                 "bold italic backcolor | alignleft aligncenter " +
//                 "alignright alignjustify | bullist numlist outdent indent | " +
//                 "removeformat | help",
//               content_style:
//                 "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
//             }}
//           />
//         </div>
//         <div className="form-group">
//           <select
//             name="categoryId"
//             className="form-control"
//             onChange={handleChange}
//           >
//             {arrProjectCategory.map((item, index) => {
//               return (
//                 <option value={item.id} key={index}>
//                   {item.projectCategoryName}
//                 </option>
//               );
//             })}
//           </select>
//         </div>
//         <button className="btn btn-outline-primary" type="submit">
//           Create Project
//         </button>
//       </form>
//     </div>
//   );
// }

// const createProjectForm = withFormik({
//   enableReinitialize: true,
//   mapPropsToValues: (props) => ({
//     projectName: "",
//     description: "",
//     categoryId: props.arrProjectCategory[0]?.id,
//   }),

//   handleSubmit: (values, { props, setSubmitting }) => {
//     props.dispatch({
//       type: "CREATE_PROJECT_SAGA",
//       newProject: values,
//     });
//     console.log("values data submit", values);
//   },

//   displayName: "BasicForm",
// })(CreateProject);

// const mapStateToProps = (state) => ({
//   arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
// });

// export default connect(mapStateToProps)(createProjectForm);

import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";
import * as Yup from "yup";
import { connect, useSelector, useDispatch } from "react-redux";

function CreateProject(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
  const dispatch = useDispatch();

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue,
  } = props;

  useEffect(() => {
    //Gọi api để lấy dữ liệu thẻ select
    dispatch({ type: "GET_ALL_PROJECT_CATEGORY_SAGA" });
  }, []);
  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  };

  return (
    <div className="container m-5">
      <h3>CreateProject</h3>
      <form
        className="container"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" name="projectName" />
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
        <div className="form-group">
          <select
            name="categoryId"
            className="form-control"
            onChange={handleChange}
          >
            {arrProjectCategory.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-outline-primary" type="submit">
          Create project
        </button>
      </form>
    </div>
  );
}

const createProjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    console.log("propvalue", props);
    return {
      projectName: "",
      description: "",
      categoryId: props.arrProjectCategory[0]?.id,
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: "CREATE_PROJECT_SAGA",
      newProject: values,
    });
  },
  displayName: "CreateProjectFormik",
})(CreateProject);

const mapStateToProps = (state) => ({
  arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
});

export default connect(mapStateToProps)(createProjectForm);
