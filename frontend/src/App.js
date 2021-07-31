import "./App.scss";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import TopPage from "./views/TopPage";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row center">
          <Link className="logo" to="/">traweather</Link>
          <p className="catch_copy">~market prediction for day traders~</p>
        </header>
        <main>
          <Route path="/" component={TopPage} exact/>

        </main>
      </div>
    </BrowserRouter>
  );
}


export default App;
