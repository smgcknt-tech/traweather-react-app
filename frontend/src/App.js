import "./styles/destyle.css"
import "./styles/App.scss";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TopPage from "./pages/TopPage";
import ResearchPage from "./pages/ResearchPage";
import NotFoundPage from "./pages/NotFoundPage";
import ResearchResultPage from "./pages/ResearchResultPage";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import PlanPage from "./pages/PlanPage";

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
            <Route path="/research/:code" component={ResearchResultPage} exact />
            <Route path="/research" component={ResearchPage} exact />
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
