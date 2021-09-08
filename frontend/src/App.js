import "./styles/destyle.css"
import "./styles/App.scss";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TopPage from "./pages/TopPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import PlanPage from "./pages/PlanPage";
import { TopProvider } from './stores/TopPage'
import { PlanProvider } from './stores/PlanPage'
import LogInPage from "./pages/LogInPage";
import { useContext, useEffect } from "react";
import { AppContext, AppActions } from "./stores/App";
import axios from "axios";

function App() {
  const { state, dispatch } = useContext(AppContext);
  const { auth,user } = state
  useEffect(() => {
    axios.get('/user/auth', {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    }).then((res) => {
      console.log(auth,user)
      dispatch({ type: AppActions.SET_AUTH, payload: true });
      dispatch({ type: AppActions.SET_USER, payload: res.data });
    }).catch((err) => {
      console.log(err.message)
    })
  }, [auth,user.id])



  return (
    <BrowserRouter>
      <div className="grid-container">
        <header>
          <Header />
        </header>
        <nav>
          <NavBar />
        </nav>
        <main>
          <Switch>
            <Route path="/user/login" component={LogInPage} exact />
            <Route exact path="/">
              <TopProvider><TopPage /></TopProvider>
            </Route>
            <Route exact path="/plan" >
              <PlanProvider><PlanPage /></PlanProvider>
            </Route>
            <Route path="*" component={NotFoundPage} exact />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter >
  );
}
export default App;
