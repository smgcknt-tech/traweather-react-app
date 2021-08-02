import "./styles/App.scss";
import { BrowserRouter, Route } from 'react-router-dom';
import TopPage from "./views/TopPage";
import PlanPage from "./views/PlanPage";
import ResultPage from "./views/ResultPage";
import FeedbackPage from "./views/FeedbackPage";
import SettingPage from "./views/SettingPage";
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
          <NavBar/>
        </nav>
        <main>
          <Route path="/" component={TopPage} exact />
          <Route path="/plan" component={PlanPage} exact />
          <Route path="/result" component={ResultPage} exact />
          <Route path="/Feedback" component={FeedbackPage} exact />
          <Route path="/Setting" component={SettingPage} exact />
        </main>
        <footer><Footer/></footer>
      </div>
    </BrowserRouter>
  );
}


export default App;
