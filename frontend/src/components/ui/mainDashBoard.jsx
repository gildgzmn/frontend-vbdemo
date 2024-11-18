import React, { useState, useEffect } from 'react';
import LocationService from '../../services/LocationService';
import LocStatService from '../../services/LocStatService';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Label,
} from "recharts";
import { color, px } from 'framer-motion';


const MainDashBoard = () => {
  const [mainGraphData, setmainGraphData] = useState("");

  const [graphData2, setGraphData2] = useState([]);

  useEffect(() => {
    console.log("useEffect");
    const fetchData = async () => {
      try {
        const response = await LocStatService.getStatsMain();
        console.log(response.data);

        const chartData = Object.entries(response.data).map(([municipality, stats]) => ({
          name: municipality,
          percentage: parseFloat(stats.percentage),
          fill: (
            parseFloat(stats.percentage) < 50 ? "orange" : "#8884d8"),
        }));
        setGraphData2(chartData);
        console.log(chartData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ResponsiveContainer width="90%" height={2000} >
        <BarChart layout='vertical' data={graphData2}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis  type='number' />
          <YAxis width={300} type='category' dataKey="name"
            tickLine={{ stroke: 'transparent' }} // Hide tick lines
            tickSize={20} // Increase the length of the ticks
            interval={0}
            tickFontSize={2}
          />
          <Tooltip />
          <Legend />
          <Bar layout='vertical' dataKey="percentage"
            barSize={20}
            label={{
              position: 'right',
              color:"black",
              fontSize: 12, // Customize label font size
            }}
            
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MainDashBoard;