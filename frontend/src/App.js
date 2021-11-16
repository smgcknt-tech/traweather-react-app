import { useContext } from 'react';
import { useLocation, Route, Switch } from 'react-router-dom';
import { AppContext, AppActions } from './AppStore';
import { hooks } from '../src/utils/custom_hooks';
import './styles/destyle.css';
import './styles/App.scss';
import Header from './components/common/Header';
import NavBar from './components/common/NavBar';
import Footer from './components/common/Footer';
import MarketPage from './pages/MarketPage';
import NotFoundPage from './pages/NotFoundPage';
import ReflectionPage from './pages/ReflectionPage';
import PlanPage from './pages/PlanPage';
import LoginPage from './pages/LoginPage';
import EntrancePage from './pages/EntrancePage';
import ResultPage from './pages/ResultPage';
import ScreeningPage from './pages/ScreeningPage';
import SearchResultPage from './pages/SearchResultPage';
import PickupDisplayPage from './pages/PickupDisplayPage';

export default function App() {
  const { state, dispatch } = useContext(AppContext);
  const { user } = state;
  hooks.useAuthentification(user, dispatch, AppActions);
  const location = useLocation();

  return (
    <div className="grid-container">
      {location.pathname !== '/' && (
        <>
          <header>
            <Header />
          </header>
          <nav>
            <NavBar />
          </nav>
        </>
      )}
      <main>
        <Switch>
          {location.pathname !== '/' && user.status === false && <LoginPage />}
          <Route exact path="/" component={EntrancePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/market" component={MarketPage} />
          <Route exact path="/plan" component={PlanPage} />
          <Route exact path="/result" component={ResultPage} />
          <Route exact path="/reflection" component={ReflectionPage} />
          <Route exact path="/screening" component={ScreeningPage} />
          <Route exact path="/search" component={SearchResultPage} />
          <Route exact path="/pickup" component={PickupDisplayPage} />
          <Route path="*" component={NotFoundPage} exact />
        </Switch>
      </main>
      {location.pathname !== '/' && (
        <footer>
          <Footer />
        </footer>
      )}
    </div>
  );
}
