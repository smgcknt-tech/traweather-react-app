import "./styles/App.scss";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TopPage from "./views/TopPage";
import PlanPage from "./views/PlanPage";
import ResultPage from "./views/ResultPage";
import FeedbackPage from "./views/FeedbackPage";
import SettingPage from "./views/SettingPage";
import ResearchPage from "./views/ResearchPage";
import NotFoundPage from "./views/NotFoundPage";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ResearchResultPage from "./views/ResearchResultPage";

function App() {
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
            <Route path="/" component={TopPage} exact />
            <Route path="/plan" component={PlanPage} exact />
            <Route path="/result" component={ResultPage} exact />
            <Route path="/feedback" component={FeedbackPage} exact />
            <Route path="/research/:code" component={ResearchResultPage} exact />
            <Route path="/research" component={ResearchPage} exact />
            <Route path="/Setting" component={SettingPage} exact />
            <Route path="*" component={NotFoundPage} exact />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
