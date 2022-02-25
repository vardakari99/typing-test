import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tester from './Components/Tester';

function App() {
  return (
    <React.Fragment>
      <div style={{'backgroundColor': 'black', 'color':'white'}}>
        Navbar Here
      </div>
      <Tester/>
    </React.Fragment>
  );
}

export default App;
