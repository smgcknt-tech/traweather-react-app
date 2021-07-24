import "./App.scss";
// eslint-disable-next-line no-unused-vars
import data from "./data"
import Indicator from "./components/Indicator"

function App() {
  return (
    <div className="grid-container">
      <header className="row center">
        <div className="logo">traweather</div>
        <p className="catch_copy">~market prediction for day traders~</p>
      </header>
      <main>
        <div>
          <div className="row center">
            {data.indicators.map((indicator)=>{
              return <Indicator indicator={indicator}></Indicator>
            })}
          </div>
        </div>

      </main>

    </div>

  );
}


export default App;
