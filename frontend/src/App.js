import "./App.scss";
import { BrowserRouter, Route } from 'react-router-dom';
import TopPage from "./views/TopPage";
import PlanPage from "./views/PlanPage";
import Header from "./components/Header";
import NavBar from "./components/NavBar";

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
        </main>
      </div>
    </BrowserRouter>
  );
}


export default App;
