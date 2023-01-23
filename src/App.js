import logo from './logo.svg';
import './App.css';
import {Route, Switch} from "react-router";
import Categories from "./Compounents/Categories";
import Quiz from "./Compounents/Quiz";
import Header from "./Compounents/Header";
import Login from "./Compounents/Login";
import Signup from "./Compounents/Signup";

function App() {
    console.log("BACKEND URL=", process.env.REACT_APP_BACKEND_URL)
  return (
      <>
          <Header/>
          <Switch>
              <Route exact path={"/"} component={()=><Categories/>} />
              <Route exact path={"/signup"} component={()=><Signup/>} />
              <Route exact path={"/login"} component={()=><Login/>} />
              <Route exact path={"/categories"} component={()=><Categories/>} />
              <Route exact path={"/categories/:categoryId/quiz/:quizIndex"} component={()=><Quiz/>} />
          </Switch>
      </>

  );
}

export default App;
