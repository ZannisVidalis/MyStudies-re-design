import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function Bar({ averageGrade }) {
  // Ensure that the maximum value is 10
  const maxGrade = 10;
  const data = [{ data: [Math.min(averageGrade, maxGrade)] }];

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['Μεσος Ορος'] }]}
      series={data}
      yAxis={[{ type: 'linear', max: maxGrade }]}
      width={150}
      height={300}
    />
  );
}