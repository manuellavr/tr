import './App.css';
import SwitchButton from './components/SwitchButton';
import Relogio from './components/RelogioClass';
import Cronometro from './components/CronometroClass';
import Timer from './components/Timer';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [current, setCurrent] = useState("Timer")

  const handleClick = () => {
    setCurrent(curr => curr === "Timer" ? "Cronômetro" : "Timer");
  }

  return (
    <div className="App">
      <Router>
        <Link className="switch" to={current === "Timer" ? "/timer" : "/"} onClick={handleClick}>
          <SwitchButton current={current} />
        </Link>
        <Relogio />
        <Switch>
          <Route exact path="/" component={Cronometro} />
          <Route exact path="/timer" component={Timer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;