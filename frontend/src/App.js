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
            <Route exact path="/">
              <TopProvider><TopPage /></TopProvider>
            </Route>
            <Route exact path="/plan" >
              <PlanProvider><PlanPage /></PlanProvider>
            </Route>
            <Route path="*" component={NotFoundPage} exact ></Route>
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
