import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, Tooltip, Legend, Bar, YAxis } from 'recharts';

import './Dashboard.scss'

function Dashboard() {
  const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300
    }
  ]

  return (
    <div className='dashboard-container'>
      <h1 className='title'>Analytics Dashboard</h1>
      <div className='content'>
        <div className='statistical'>
          <div className='item'>
            <span>Total user</span>
            <span>100</span>
          </div>
          <div className='item'>
            <span>Total quiz</span>
            <span>100</span>
          </div>
          <div className='item'>
            <span>Total Questions</span>
            <span>100</span>
          </div>
          <div className='item'>
            <span>Total Answer</span>
            <span>100</span>
          </div>
        </div>
        <div className='chart'>
          <ResponsiveContainer width='90%' height={'100%'}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard