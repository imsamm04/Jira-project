import React from "react";
import ContentMain from "../../components/Cyberbugs/Main/ContentMain";
import HeaderMain from "../../components/Cyberbugs/Main/HeaderMain";
import InfoMain from "../../components/Cyberbugs/Main/InfoMain";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

export default function IndexCyberBugs(props) {
  let { projectDetail } = useSelector((state) => state.ProjectReducer);
  const dispatch = useDispatch();
  console.log("projectDetail", projectDetail);
  useEffect(() => {
    const projectId = props.match.params.projectId;
    dispatch({
      type: "GET_PROJECT_DETAIL",
      projectId,
    });
  }, []);
  return (
    <div className="main">
      <HeaderMain projectDetail={projectDetail} />

      <InfoMain projectDetail={projectDetail} />

      <ContentMain projectDetail={projectDetail} />
    </div>
  );
}
