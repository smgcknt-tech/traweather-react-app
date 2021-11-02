import { useContext } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContext, AppActions } from "./AppStore";
import { hooks } from '../src/utils/custom_hooks';
import "./styles/destyle.css";
import "./styles/App.scss";
import Header from "./components/common/Header";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import MarketPage from "./pages/MarketPage";
import NotFoundPage from "./pages/NotFoundPage";
import ReflectionPage from "./pages/ReflectionPage";
import PlanPage from "./pages/PlanPage";
import LoginPage from "./pages/LoginPage";
import EntrancePage from "./pages/EntrancePage";
import ResultPage from "./pages/ResultPage";

function App() {
  const { state, dispatch } = useContext(AppContext);
  const { user } = state;
  hooks.useAuthentification(user, dispatch, AppActions);
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
            <Route exact path="/" component={EntrancePage } />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/market" component={MarketPage}/>
            <Route exact path="/plan" component={PlanPage} />
            <Route exact path="/result" component={ResultPage} />
            <Route exact path="/reflection" component={ReflectionPage} />
            <Route path="*" component={NotFoundPage} exact />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter >
  );
};
export default App;
