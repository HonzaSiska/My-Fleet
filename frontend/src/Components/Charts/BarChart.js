import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { PureComponent } from 'react';
import { useState } from 'react';
// const data = [
//     {
//       "name": "Page A",
//       "uv": 4000,
//       "pv": 2400,
//     },
//     {
//       "name": "Page B",
//       "uv": 3000,
//       "pv": 1398
//     },
//     {
//       "name": "Page C",
//       "uv": 2000,
//       "pv": 9800
//     },
//     {
//       "name": "Page D",
//       "uv": 2780,
//       "pv": 3908
//     },
//     {
//       "name": "Page E",
//       "uv": 1890,
//       "pv": 4800
//     },
//     {
//       "name": "Page F",
//       "uv": 2390,
//       "pv": 3800
//     },
//     {
//       "name": "Page G",
//       "uv": 3490,
//       "pv": 4300
//     }
//   ]
  
                              
  export default class MyBarChart extends PureComponent {
    render(){

        return(
            // <ResponsiveContainer width="80%" height={300}>
                <BarChart 
                    width={this.props.windowWidth} 
                    height={400} 
                    data={this.props.data}
                    margin={{top: 60, right: 30, left: 30, bottom:100}}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="name" 
                        angle='90' 
                        textAnchor='start'
                        scaleToFit
                        />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36}/>
                    <Bar dataKey='maintenance'  fill="#909090" />
                    <Bar dataKey='fuel' fill="#D1C9BE" />
                </BarChart>
            //  </ResponsiveContainer>
        )
    }
  }