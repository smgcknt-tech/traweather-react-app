import "./App.scss";
import { BrowserRouter, Route} from 'react-router-dom';
import TopPage from "./views/TopPage";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header>
          <Header/>
        </header>
        <main>
          <Route path="/" component={TopPage} exact/>
        </main>
      </div>
    </BrowserRouter>
  );
}


export default App;
