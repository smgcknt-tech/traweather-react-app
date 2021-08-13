import "./styles/App.scss";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TopPage from "./views/TopPage";
import ResearchPage from "./views/ResearchPage";
import NotFoundPage from "./views/NotFoundPage";
import ResearchResultPage from "./views/ResearchResultPage";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

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
