import React from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Box, Typography, Grid, Paper } from '@mui/material';
import './StaffAnalytics.css';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const StaffAnalytics = ({ data }) => {
  if (!data) return null;

  const { byType, byStatus, byGender } = data;

  // Prepare status data
  const statusData = byStatus.map(item => ({
    name: item.status,
    value: item.count
  }));

  // Prepare gender data
  const genderData = byGender.map(item => ({
    name: item._id,
    value: item.count
  }));

  return (
    <div className="staff-analytics">
      <Grid container spacing={3}>
        {/* Staff by Type - Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper className="analytics-card">
            <Typography variant="h6" className="card-title">
              Staff by Type
            </Typography>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={byType}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                    label={({ typeName, percent }) => 
                      `${typeName || 'Other'} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {byType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>

        {/* Staff Status - Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper className="analytics-card">
            <Typography variant="h6" className="card-title">
              Staff Status
            </Typography>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => 
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    <Cell fill="#10b981" /> {/* Active */}
                    <Cell fill="#ef4444" /> {/* Inactive */}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>

        {/* Gender Distribution - Bar Chart */}
        <Grid item xs={12} md={4}>
          <Paper className="analytics-card">
            <Typography variant="h6" className="card-title">
              Gender Distribution
            </Typography>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={genderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default StaffAnalytics;