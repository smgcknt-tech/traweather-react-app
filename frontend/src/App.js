import "./styles/destyle.css"
import "./styles/App.scss";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { TopProvider } from './stores/TopPage'
import { PlanProvider } from './stores/PlanPage'
import { useContext, useEffect } from "react";
import { AppContext, AppActions } from "./stores/App";
import { hooks } from '../src/utils/custom_hooks'
import TopPage from "./pages/TopPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/common/Header";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import PlanPage from "./pages/PlanPage";
import EntrancePage from "./pages/EntrancePage";
import ResultPage from "./pages/ResultPage";
import { ResultProvider } from "./stores/ResultPage";
import { helper } from "./utils/helper";

function App() {
  const { state, dispatch } = useContext(AppContext);
  const { user } = state
  hooks.useAuthentification(user, dispatch, AppActions)
  return (
    <BrowserRouter>
      {!user.status ? (<EntrancePage />) : (
        <div className="grid-container">
          <header>
            <Header />
          </header>
          <nav>
            <NavBar />
          </nav>
          <main>
            <Switch>
              <Route path="/user/login" component={EntrancePage} exact />
              <Route exact path="/">
                <TopProvider><TopPage /></TopProvider>
              </Route>
              <Route exact path="/plan" >
                <PlanProvider><PlanPage /></PlanProvider>
              </Route>
              <Route exact path="/result">
                <ResultProvider><ResultPage /></ResultProvider>
              </Route>
              <Route path="*" component={NotFoundPage} exact />
            </Switch>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      )}
    </BrowserRouter >
  );
}
export default App;
