import "./styles/destyle.css"
import "./styles/App.scss";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { MarketProvider } from './stores/MarketPage'
import { PlanProvider } from './stores/PlanPage'
import { useContext } from "react";
import { AppContext, AppActions } from "./stores/App";
import { hooks } from '../src/utils/custom_hooks'
import MarketPage from "./pages/MarketPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/common/Header";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import PlanPage from "./pages/PlanPage";
import LoginPage from "./pages/LoginPage";
import EntrancePage from "./pages/EntrancePage";
import ResultPage from "./pages/ResultPage";
import { ResultProvider } from "./stores/ResultPage";

function App() {
  const { state, dispatch } = useContext(AppContext);
  const { user } = state
  hooks.useAuthentification(user, dispatch, AppActions)
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
            <Route exact path="/">
              {(!user.id || !user.status) ? <Redirect to="/login" /> : <EntrancePage />}
            </Route>
            <Route exact path="/login">
              {(!user.id || !user.status) ? <LoginPage />: <Redirect to="/" />}
            </Route>
            <Route exact path="/market">
              {(!user.id || !user.status) ? <Redirect to="/login" /> : <MarketProvider><MarketPage /></MarketProvider>}
            </Route>
            <Route exact path="/plan" >
              {(!user.id || !user.status) ? <Redirect to="/login" /> : <PlanProvider><PlanPage /></PlanProvider>}
            </Route>
            <Route exact path="/result">
              {(!user.id || !user.status) ? <Redirect to="/login" /> : <ResultProvider><ResultPage /></ResultProvider>}
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
