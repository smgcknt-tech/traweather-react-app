import "./styles/destyle.css"
import "./styles/App.scss";
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { MarketProvider } from './stores/MarketPage'
import { PlanProvider } from './stores/PlanPage'
import { ResultProvider } from "./stores/ResultPage";
import { useContext } from "react";
import { AppContext, AppActions } from "./stores/App";
import { hooks } from '../src/utils/custom_hooks'
import MarketPage from "./pages/MarketPage";
import NotFoundPage from "./pages/NotFoundPage";
import ReflectionPage from "./pages/ReflectionPage";
import Header from "./components/common/Header";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import PlanPage from "./pages/PlanPage";
import LoginPage from "./pages/LoginPage";
import EntrancePage from "./pages/EntrancePage";
import ResultPage from "./pages/ResultPage";
import { ReflectionProvider } from "./stores/ReflectionPage";

function App() {
  const { state, dispatch } = useContext(AppContext);
  const { user } = state
  hooks.useAuthentification(user, dispatch, AppActions)
  return (
    <BrowserRouter forceRefresh={true}>
      <div className="grid-container">
        <header>
          <Header />
        </header>
        <nav>
          <NavBar />
        </nav>
        <main>
          <Switch>
            {(user.status === false) && <LoginPage />}
            <Route exact path="/">
              <EntrancePage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/market">
              <MarketProvider><MarketPage /></MarketProvider>
            </Route>
            <Route exact path="/plan" >
              <PlanProvider><PlanPage /></PlanProvider>
            </Route>
            <Route exact path="/result">
              <ResultProvider><ResultPage /></ResultProvider>
            </Route>
            <Route exact path="/reflection">
              <ReflectionProvider><ReflectionPage /></ReflectionProvider>
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
