import "./App.scss";
import {BrowserRouter, Route} from 'react-router-dom';
import top_page from "./pages/top_page";

function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row center">
        <div className="logo">traweather</div>
        <p className="catch_copy">~market prediction for day traders~</p>
      </header>
      <main>
        <Route path="/" component={top_page} exact></Route>
      </main>
    </div>
    </BrowserRouter>

  );
}


export default App;
