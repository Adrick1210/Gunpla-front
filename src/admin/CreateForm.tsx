import React from "react";
import { TextField, Paper } from "@mui/material";

function CreateForm() {

  return (
    <div>
      <h1>Add to Inventory </h1>
      <Paper elevation={3} className="form-paper">
        <TextField sx={{ width: "500px" }} id="name" name="name" label="Name" />
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
          id="address"
          name="address"
          label="Address"
        />
      </Paper>
    </div>
  );
}
export default CreateForm;
