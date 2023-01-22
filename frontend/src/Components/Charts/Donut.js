import React, { PureComponent } from 'react';
import { PieChart, Legend, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import './charts.css'
const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default class Example extends PureComponent {
//   static demoUrl = 'https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o';

  render() {
    return (
    // <ResponsiveContainer width={700} height="80%">
      <PieChart width={400} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={this.props.data}
          cx={180}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          nameKey="name"
          label
        
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={36}/>
        
      </PieChart>
    //   </ResponsiveContainer>
    );
  }
}


