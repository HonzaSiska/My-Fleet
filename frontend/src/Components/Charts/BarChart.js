import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { PureComponent } from 'react';
  
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