import React from 'react';
import { Pie } from 'react-chartjs-2';

const DynamicPieChart = ({ grades }) => {
  const countGrades = () => {
    const counts = { greaterThan5: 0, lessThan5: 0, equalTo0: 0 };

    grades.forEach((grade) => {
      if (grade > 5) {
        counts.greaterThan5++;
      } else if (grade < 5) {
        counts.lessThan5++;
      } else {
        counts.equalTo0++;
      }
    });

    return counts;
  };

  const data = {
    labels: ['Grades > 5', 'Grades < 5', 'Grades = 0'],
    datasets: [
      {
        data: Object.values(countGrades()),
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  return (
    <div>
      <h2>Grade Distribution</h2>
      <Pie data={data} />
    </div>
  );
};

export { DynamicPieChart };
