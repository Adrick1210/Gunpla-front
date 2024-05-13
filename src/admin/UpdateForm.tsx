import React from 'react'
import { TextField, Paper, Button, Box } from "@mui/material";
import AdminNav from './AdminNav';

 function UpdateForm() {
  return (
    <div>
      <AdminNav />
      <h1>Edit Form</h1>
      <div className="word-input">
        <Paper elevation={3} className="form-paper">
          <TextField
            sx={{ width: "500px" }}
            id="name"
            name="name"
            label="Name"
          />
        </Paper>
        <Paper elevation={3} className="form-paper">
          <TextField
            sx={{ width: "500px" }}
            id="brand"
            name="brand"
            label="Brand"
          />
        </Paper>
        <Paper elevation={3} className="form-paper">
          <TextField
            sx={{ width: "500px" }}
            id="boxArt"
            name="boxArt"
            label="Box Art URL"
          />
        </Paper>
        <Paper elevation={3} className="form-paper">
          <TextField
            sx={{ width: "500px" }}
            id="price"
            name="price"
            label="Price"
          />
        </Paper>
        <Paper elevation={3} className="form-paper">
          <TextField
            sx={{ width: "500px" }}
            id="inventory"
            name="inventory"
            label="Inventory"
          />
        </Paper>
        <Paper elevation={3} className="form-paper">
          <TextField
            sx={{ width: "500px" }}
            id="description"
            name="description"
            label="Description"
          />
        </Paper>
        <Paper elevation={3} className="form-paper">
          <TextField
            sx={{ width: "500px" }}
            id="grade"
            name="grade"
            label="Grade"
          />
        </Paper>
        <Paper elevation={3} className="form-paper">
          <TextField
            sx={{ width: "500px" }}
            id="scale"
            name="scale"
            label="Scale"
          />
        </Paper>
        <Box>
          <Button
            sx={{ marginTop: "20px", marginBottom: "20px" }}
            color="success"
            variant="contained"
            type="submit"
          >
            Update Product
          </Button>
        </Box>
      </div>
    </div>
  )
}
export default UpdateForm;