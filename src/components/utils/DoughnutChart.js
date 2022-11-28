import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart(props) {
const{totalClicks,createdUrlsPerDay,createdUrlsPerMonth,urlCount,noVisits}=props.data;
  const data = {
  labels: [
    'Total Clicks',
    'Total Url',
    'Total URL per day',
    'Total URL per month',
    'Not visits count',
    ],
  datasets: [{
    data: [totalClicks,urlCount,createdUrlsPerDay,createdUrlsPerMonth,noVisits],
    backgroundColor: [
      '#0CC062',
      '#FFCE56',
      '#F08080',
      '#78C2C2',
      "#F2645C",
    ],
    hoverBackgroundColor: [
      '#0CC062',
      '#FFCE56',
      '#F08080',
      '#78C2C2',
      '#F2645C',
    ]
  }]
};
  return <Doughnut data={data}/>;
}
