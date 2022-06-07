import logo from './logo.svg';
import './App.css';
import * as all from 'colors.css'

function App() {

  const color = "orange"

  const bg = `linear-gradient(to bottom left, #FCFCFC, ${color})`

  return (
    <div backgroundColor="grey" className="App">
      <div className="App-header">
        <div style={{borderRadius: "5px", 
                      backgroundImage: bg,
                      padding: "20px",
                      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2);",
                      transition: "0.3s",
                    }}
        >
          <div style={{backgroundColor: "555"}}>Hello, this is {color}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
