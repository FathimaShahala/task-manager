import React, { useState } from "react";
import "./chart.css";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Calendar from "../../components/Calender";

const COLORS = ["#8e44ad", "#3498db", "#f1c40f", "#2ecc71"];

const Charts = ({ tasks = [] }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (!Array.isArray(tasks) || tasks.length === 0) {
    return (
      <div className="charts-container">
        <p>No task data available to display Charts.</p>
      </div>
    );
  }

  // Tasks by status (Pie chart)
  const statusCounts = tasks.map(group => ({
    name: group.category,
    value: group.items.length,
  }));

  // Task completion trend over time (Line chart)
  const completionTrendRaw = (() => {
    const completedTasks =
      tasks.find(t => t.category === "Completed")?.items || [];
    const groupedByDate = {};

    completedTasks.forEach(task => {
      const rawDate = task.updatedAt || task.deadline;
      if (!rawDate) return;
      const date = new Date(rawDate);
      if (isNaN(date)) return;

      const formattedDate = date.toLocaleDateString("en-CA");
      groupedByDate[formattedDate] = (groupedByDate[formattedDate] || 0) + 1;
    });

    return Object.entries(groupedByDate).map(([date, count]) => ({
      date,
      count,
    }));
  })();

  const filteredTrend = completionTrendRaw.filter(item => {
    const itemDate = new Date(item.date);
    const from = startDate ? new Date(startDate) : null;
    const to = endDate ? new Date(endDate) : null;
    return (!from || itemDate >= from) && (!to || itemDate <= to);
  });

  // Tasks by priority (Bar chart)
  const priorityCounts = (() => {
    const priorities = { Low: 0, Normal: 0, High: 0 };
    tasks.forEach(group => {
      group.items.forEach(task => {
        const p = task.priority || "Normal";
        if (priorities[p] !== undefined) {
          priorities[p]++;
        }
      });
    });

    return Object.entries(priorities).map(([priority, count]) => ({
      priority,
      count,
    }));
  })();

  return (
    <div className="charts-container">
      {/* Pie Chart */}
      <div className="chart-box">
        <h3>Tasks by Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusCounts}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {statusCounts.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="chart-box">
        <h3>Task Completion Trend</h3>
        <div className="filter-form">
          <label>
            From:{" "}
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
            />
          </label>
          <label>
            To:{" "}
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
            />
          </label>
        </div>

        {filteredTrend.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            No task completion data for the selected range.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#2ecc71" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Bar Chart */}
      <div className="chart-box">
        <h3>Tasks by Priority</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={priorityCounts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="priority" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count">
              {priorityCounts.map((entry, index) => {
                let fillColor = "#ccc";
                if (entry.priority === "Low") fillColor = "#2ecc71"; // green
                else if (entry.priority === "Normal")
                  fillColor = "#f1c40f"; // yellow
                else if (entry.priority === "High") fillColor = "#e74c3c"; // red

                return <Cell key={`bar-cell-${index}`} fill={fillColor} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
