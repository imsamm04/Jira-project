import Modal from "antd/lib/modal/Modal";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, useHistory } from "react-router-dom";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import DrawerCyberBugs from "./HOC/CyberbugsHOC/DrawerCyberBugs";
import About from "./pages/About/About";
import BaiTapToDoListSaga from "./pages/BaiTapToDoListSaga/BaiTapToDoListSaga";
import Contact from "./pages/Contact/Contact";
import CreateProject from "./pages/CyberBugs/CreateProject/CreateProject";
import IndexCyberBugs from "./pages/CyberBugs/IndexCyberBugs";
import LoginCyberBugs from "./pages/CyberBugs/LoginCyberBugs/LoginCyberBugs";
import ProjectManagement from "./pages/CyberBugs/ProjectManagement/ProjectManagement";
import Demo from "./pages/Demo/Demo";
import DemoDragDrop from "./pages/DemoDragDrop/DemoDragDrop";
import DemoHOCModal from "./pages/DemoHOCModal/DemoHOCModal";
import Detail from "./pages/Detail/Detail";
import DragAndDropDnD from "./pages/DragAndDropDnD/DragAndDropDnD";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import Todolist from "./pages/Todolist/Todolist";
import ToDoListRedux from "./pages/Todolist/ToDoListRedux";
import TodolistRFC from "./pages/Todolist/TodolistRFC";
import { CyberbugsTemplate } from "./templates/HomeTemplate/CyberbugsTemplate";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";

function App() {
  return (
    <div>
      <Modal />
      <DrawerCyberBugs />
      <LoadingComponent />
      <Switch>
        {/* <Route exact path='/home'  render={(propsRoute)=>{
          return <div>
                <Header />
                <Home {...propsRoute} />
          </div>
        }}/> */}
        <CyberbugsTemplate path="/" exact Component={IndexCyberBugs} />
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate exact path="/contact" Component={Contact} />
        <HomeTemplate exact path="/about" Component={About} />
        <HomeTemplate exact path="/dragdrop" Component={DemoDragDrop} />
        <HomeTemplate exact path="/detail/:id" Component={Detail} />
        <HomeTemplate exact path="/profile" Component={Profile} />
        <HomeTemplate exact path="/todolistrfc" Component={TodolistRFC} />
        <HomeTemplate exact path="/todolistrcc" Component={Todolist} />
        <HomeTemplate exact path="/todolistredux" Component={ToDoListRedux} />
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs} />

        <HomeTemplate
          exact
          path="/todolistsaga"
          Component={BaiTapToDoListSaga}
        />
        <HomeTemplate exact path="/demohocmodal" Component={DemoHOCModal} />
        <HomeTemplate exact path="/demo" Component={Demo} />
        <HomeTemplate
          exact
          path="/demodragdropdnd"
          Component={DragAndDropDnD}
        />
        <CyberbugsTemplate exact path="/cyberbugs" Component={IndexCyberBugs} />
        <CyberbugsTemplate
          exact
          path="/createproject"
          Component={CreateProject}
        />
        <CyberbugsTemplate
          exact
          path="/projectmanagement"
          Component={ProjectManagement}
        />

        <HomeTemplate path="*" component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
