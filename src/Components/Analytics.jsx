import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Analytics.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const Analytics = ({ nodes, onNodeHighlight }) => {
  const [executionTimes, setExecutionTimes] = useState([]);
  const [cumulativeTimes, setCumulativeTimes] = useState([]);
  const [typeDistribution, setTypeDistribution] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!nodes || nodes.length === 0) return;

    const times = nodes.map((node) => ({
      label: node.data.label || `Node ${node.id}`,
      time: node.data.executionTime || 0,
      type: node.data.type || 'default',
    }));

    let total = 0;
    const cumulative = times.map((node) => {
      total += node.time;
      return total;
    });

    const distribution = times.reduce((acc, node) => {
      acc[node.type] = (acc[node.type] || 0) + node.time;
      return acc;
    }, {});

    setExecutionTimes(times);
    setCumulativeTimes(cumulative);
    setTypeDistribution(distribution);
  }, [nodes]);

  const barData = {
    labels: executionTimes.map((node) => node.label),
    datasets: [
      {
        label: 'Execution Time (ms)',
        data: executionTimes.map((node) => node.time),
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: executionTimes.map((node) => node.label),
    datasets: [
      {
        label: 'Cumulative Execution Time (ms)',
        data: cumulativeTimes,
        fill: false,
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
        tension: 0.1,
      },
    ],
  };

  const handleBarHover = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      if (executionTimes[index]) {
        onNodeHighlight(executionTimes[index].label);
      }
    } else {
      onNodeHighlight(null);
    }
  };

  return (
    <div className={`analytics-container ${isCollapsed ? 'collapsed' : ''}`}>
      <div
        className="collapse-toggle"
        onClick={() => setIsCollapsed((prev) => !prev)}
        title={isCollapsed ? 'Open Analytics' : 'Close Analytics'}
      >
        {isCollapsed ? (
          <div className="vertical-label">
            <FaChevronRight />
            <span>Analytics</span>
          </div>
        ) : (
          <FaChevronLeft />
        )}
      </div>
      {!isCollapsed && (
        <div className="analytics-content">
          <h3>Workflow Analytics</h3>
          <div className="chart-grid">
            <div className="chart-card">
              <h4>Execution Time Per Node</h4>
              <Bar
                data={barData}
                options={{
                  onHover: handleBarHover,
                  plugins: {
                    tooltip: { enabled: true },
                  },
                }}
              />
            </div>
            <div className="chart-card">
              <h4>Cumulative Execution Time</h4>
              <Line
                data={lineData}
                options={{
                  plugins: {
                    tooltip: { enabled: true },
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
