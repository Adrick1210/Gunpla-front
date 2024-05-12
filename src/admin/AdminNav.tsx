import React from 'react'
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

 function AdminNav() {
  return (
    <Box display="flex" justifyContent="center" gap={3} marginTop={5} marginBottom={5}>
      <Link to="/admin">
        <Button
          variant="contained"
          color="success"
        >
          Home
        </Button>
      </Link>
      <Link to="/admin/create">
        <Button
          variant="contained"
          color="success"
        >
          Add
        </Button>
      </Link>
    </Box>
  )
}
export default AdminNav;