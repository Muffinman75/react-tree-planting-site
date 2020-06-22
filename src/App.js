import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from "axios";
import './App.css';

function App() {

  const [numberOfTreesPlanted, setnumberOfTreesPlanted] = useState([]);
  const [labels, setLabels] = useState([]);

  async function getTrees() {
    await axios.get("https://api.offset.earth/trees")
    .then(result => {
      if (result.status === 200) {
        const dates = result.data.map((planting, index) => new Date(planting.createdAt).toLocaleDateString());
        const sortedDates = dates.reverse();
        setLabels(sortedDates);
        setnumberOfTreesPlanted(result.data.map((planting, index) => planting.value))
      } else {
        console.log('error');
      }
    }).catch(e => {
      console.log('catch error', e);
    });
  }

  const treeData = {
    labels: labels,
    datasets: [
      {
        label: 'No. of Trees Planted',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: numberOfTreesPlanted
      }
    ]
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Number of trees planted by OffsetEarth since day 1
        </p>
        <button type="button" className="submit" onClick={getTrees}>
          Get Trees
        </button>

        {
          treeData &&
          <Line
            data={treeData}
            options={{
              title: {
                display: true,
                text: 'No. of Trees planted each day',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          />
        }

      </header>
    </div>
  );
}
export default App;
