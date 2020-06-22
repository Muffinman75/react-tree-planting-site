import React, { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {

  const [treeData, setTreeData] = useState(false);

  async function getTrees() {
    await axios.get("https://api.offset.earth/trees")
    .then(result => {
      if (result.status === 200) {
        console.log("result", result);
        setTreeData(result.data);
      } else {
        console.log('error');
      }
    }).catch(e => {
      console.log('catch error');
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button type="button" className="submit" onClick={getTrees}>
          Get Trees
        </button>
        {treeData &&
          treeData.map((tree, index) => (
              <div key={index}>
                <h2>
                  {tree.value}
                </h2>
                <p>
                  {tree.createdAt}
                </p>
              </div>
            ))
        }
      </header>
    </div>
  );
}
export default App;
