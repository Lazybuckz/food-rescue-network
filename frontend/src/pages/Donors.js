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
import { donorsAPI } from "../services/api";

function Donors() {
  const [donors, setDonors] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentDonor, setCurrentDonor] = useState({
    donor_id: null,
    business_name: "",
    business_type: "",
    address: "",
    contact_person: "",
    email: "",
    phone: "",
    operating_hours: "",
  });

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const response = await donorsAPI.getAll();
      setDonors(response.data);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  const handleOpen = (donor = null) => {
    if (donor) {
      setCurrentDonor(donor);
      setEditMode(true);
    } else {
      setCurrentDonor({
        donor_id: null,
        business_name: "",
        business_type: "",
        address: "",
        contact_person: "",
        email: "",
        phone: "",
        operating_hours: "",
      });
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setCurrentDonor({
      ...currentDonor,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await donorsAPI.update(currentDonor.donor_id, currentDonor);
      } else {
        await donorsAPI.create(currentDonor);
      }
      fetchDonors();
      handleClose();
    } catch (error) {
      console.error("Error saving donor:", error);
      alert(error.response?.data?.error || "Error saving donor");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      try {
        await donorsAPI.delete(id);
        fetchDonors();
      } catch (error) {
        console.error("Error deleting donor:", error);
        alert("Error deleting donor");
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Donors</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Donor
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Business Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {donors.map((donor) => (
              <TableRow key={donor.donor_id}>
                <TableCell>{donor.business_name}</TableCell>
                <TableCell>{donor.business_type}</TableCell>
                <TableCell>{donor.contact_person}</TableCell>
                <TableCell>{donor.email}</TableCell>
                <TableCell>{donor.phone}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(donor)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(donor.donor_id)}
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
        <DialogTitle>{editMode ? "Edit Donor" : "Add Donor"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Business Name"
            name="business_name"
            value={currentDonor.business_name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Business Type"
            name="business_type"
            value={currentDonor.business_type}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={currentDonor.address}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Contact Person"
            name="contact_person"
            value={currentDonor.contact_person}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={currentDonor.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={currentDonor.phone}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Operating Hours"
            name="operating_hours"
            value={currentDonor.operating_hours}
            onChange={handleChange}
            margin="normal"
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

export default Donors;
