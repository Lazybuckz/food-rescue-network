import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { volunteersAPI } from "../services/api";

function Volunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentVolunteer, setCurrentVolunteer] = useState({
    volunteer_id: null,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    vehicle_type: "",
    availability: "",
  });

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await volunteersAPI.getAll();
      setVolunteers(response.data);
    } catch (error) {
      console.error("Error fetching volunteers:", error);
    }
  };

  const handleOpen = (volunteer = null) => {
    if (volunteer) {
      setCurrentVolunteer(volunteer);
      setEditMode(true);
    } else {
      setCurrentVolunteer({
        volunteer_id: null,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        vehicle_type: "",
        availability: "",
      });
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setCurrentVolunteer({
      ...currentVolunteer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await volunteersAPI.update(
          currentVolunteer.volunteer_id,
          currentVolunteer
        );
      } else {
        await volunteersAPI.create(currentVolunteer);
      }
      fetchVolunteers();
      handleClose();
    } catch (error) {
      console.error("Error saving volunteer:", error);
      alert(error.response?.data?.error || "Error saving volunteer");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this volunteer?")) {
      try {
        await volunteersAPI.delete(id);
        fetchVolunteers();
      } catch (error) {
        console.error("Error deleting volunteer:", error);
        alert("Error deleting volunteer");
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Volunteers</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Volunteer
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Vehicle Type</TableCell>
              <TableCell>Total Hours</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volunteers.map((volunteer) => (
              <TableRow key={volunteer.volunteer_id}>
                <TableCell>
                  {volunteer.first_name} {volunteer.last_name}
                </TableCell>
                <TableCell>{volunteer.email}</TableCell>
                <TableCell>{volunteer.phone}</TableCell>
                <TableCell>{volunteer.vehicle_type}</TableCell>
                <TableCell>{volunteer.total_hours}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(volunteer)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(volunteer.volunteer_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editMode ? "Edit Volunteer" : "Add Volunteer"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="First Name"
            name="first_name"
            value={currentVolunteer.first_name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            name="last_name"
            value={currentVolunteer.last_name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={currentVolunteer.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={currentVolunteer.phone}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Vehicle Type"
            name="vehicle_type"
            value={currentVolunteer.vehicle_type}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Availability"
            name="availability"
            value={currentVolunteer.availability}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editMode ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Volunteers;
