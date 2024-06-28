import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
function BarChar({ budgetList }) {
  return (
    <div className="border rounded-lg pl-5">
      <h2 className="font-bold text-lg mt-7">Activity</h2>
      <ResponsiveContainer width={'80%'} height={300} >
        <BarChart
          data={budgetList}
          margin={{ top: 5 }}
        >
          <XAxis dataKey="name" className="text-xs"/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpend" stackId="a" fill="#4845d4" />
          <Bar dataKey="amount" stackId="a" fill="#C3C2FF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChar;
