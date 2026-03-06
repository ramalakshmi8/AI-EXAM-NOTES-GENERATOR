import React from "react";
// import ResponsiveContainer from "recharts";
import {
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RechartSetUp = ({ charts }) => {
  if (!charts || charts.length === 0) {
    return null;
  }
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="space-y-8">
      {charts.map((chart, index) => (
        <div
          className="border border-gray-200 rounded-xl p-4 bg-white"
          key={index}
        >
          <h4 className="font-semibold text-gray-800 mb-3">{chart.title}</h4>
          <div style={{ width: "100%", height: 300 }} className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              {chart.type == "bar" && (
                <BarChart data={chart.data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {chart.data.map((_, i) => (
                      <Cell key={i} fill={colors[i % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              )}
              {chart.type == "line" && (
                <LineChart data={chart.data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={colors[0]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              )}
              {chart.type == "pie" && (
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={chart.data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {chart.data.map((_, i) => (
                      <Cell key={i} fill={colors[i % colors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RechartSetUp;
