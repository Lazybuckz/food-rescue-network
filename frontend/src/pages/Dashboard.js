import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { donationsAPI, donorsAPI, volunteersAPI } from "../services/api";
import PeopleIcon from "@mui/icons-material/People";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [donors, setDonors] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, donorsRes, volunteersRes, donationsRes] =
        await Promise.all([
          donationsAPI.getStats(),
          donorsAPI.getAll(),
          volunteersAPI.getAll(),
          donationsAPI.getAll(),
        ]);

      setStats(statsRes.data);
      setDonors(donorsRes.data);
      setVolunteers(volunteersRes.data);
      setDonations(donationsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const statusData = stats
    ? [
        { name: "Available", value: parseInt(stats.available_donations) },
        { name: "Claimed", value: parseInt(stats.claimed_donations) },
        { name: "Completed", value: parseInt(stats.completed_donations) },
      ]
    : [];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <RestaurantIcon color="primary" sx={{ mr: 1 }} />
                <Typography color="textSecondary" variant="h6">
                  Donors
                </Typography>
              </Box>
              <Typography variant="h4">{donors.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PeopleIcon color="primary" sx={{ mr: 1 }} />
                <Typography color="textSecondary" variant="h6">
                  Volunteers
                </Typography>
              </Box>
              <Typography variant="h4">{volunteers.length}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <LocalShippingIcon color="primary" sx={{ mr: 1 }} />
                <Typography color="textSecondary" variant="h6">
                  Donations
                </Typography>
              </Box>
              <Typography variant="h4">
                {stats?.total_donations || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <VolunteerActivismIcon color="primary" sx={{ mr: 1 }} />
                <Typography color="textSecondary" variant="h6">
                  Total Pounds
                </Typography>
              </Box>
              <Typography variant="h4">
                {stats?.total_pounds ? Math.round(stats.total_pounds) : 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Donation Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Donations
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={donations.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="food_type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantity_lbs" fill="#8884d8" name="Pounds" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
