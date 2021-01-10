import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = React.useState(0);
  const [showError, setShowError] = React.useState(false)

  const increment = () => { 
    setCount(count + 1)
    setShowError(false)
  }

  const decrement = () => { 
    if (count > 0) {
      setCount(count - 1)
      setShowError(false)
    } else {
      setShowError(true)
    }
  }

  return (
    <div data-test="component-app" className="App">
      <h1 data-test="counter-display">
        The counter is currently&nbsp; 
        <span data-test="count">{count}</span>
      </h1>
      <button
        data-test="increment-button"
        onClick={increment}
      >
        Increment counter
      </button>
      <button
        data-test="decrement-button"
        onClick={decrement}
      >
        Decrement counter
      </button>

      {showError && (
        <p className="error-msg" data-test="error-msg">
          Error: Counter can't go below 0
        </p>
      )}
      
    </div>
  );
}

export default App;
