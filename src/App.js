import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, useHistory } from "react-router-dom";
import LoadingComponent from "./components/GlobalSetting/LoadingComponent/LoadingComponent";
import About from "./pages/About/About";
import BaiTapToDoListSaga from "./pages/BaiTapToDoListSaga/BaiTapToDoListSaga";
import Contact from "./pages/Contact/Contact";
import Demo from "./pages/Demo/Demo";
import DemoDragDrop from "./pages/DemoDragDrop/DemoDragDrop";
import DemoHOCModal from "./pages/DemoHOCModal/DemoHOCModal";
import Detail from "./pages/Detail/Detail";
import DragAndDropDnD from "./pages/DragAndDropDnD/DragAndDropDnD";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import Todolist from "./pages/Todolist/Todolist";
import ToDoListRedux from "./pages/Todolist/ToDoListRedux";
import TodolistRFC from "./pages/Todolist/TodolistRFC";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "ADD_HISTORY", history: history });
  }, []);

  return (
    <div>
      {/* <Modal /> */}
      <LoadingComponent />
      <Switch>
        {/* <Route exact path='/home'  render={(propsRoute)=>{
          return <div>
                <Header />
                <Home {...propsRoute} />
          </div>
        }}/> */}
        <HomeTemplate path="/" exact Component={Home} />
        <HomeTemplate path="/home" exact Component={Home} />
        <HomeTemplate exact path="/contact" Component={Contact} />
        <HomeTemplate exact path="/about" Component={About} />
        <HomeTemplate exact path="/dragdrop" Component={DemoDragDrop} />
        <HomeTemplate exact path="/detail/:id" Component={Detail} />
        <HomeTemplate exact path="/profile" Component={Profile} />
        <HomeTemplate exact path="/todolistrfc" Component={TodolistRFC} />
        <HomeTemplate exact path="/todolistrcc" Component={Todolist} />
        <HomeTemplate exact path="/todolistredux" Component={ToDoListRedux} />
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
        <HomeTemplate path="*" component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
