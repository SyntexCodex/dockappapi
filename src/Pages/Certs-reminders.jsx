import React from 'react';
import { useState } from 'react';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  TableRow,
  Paper,
  Avatar,
  Button,
  Container,
  Box,
  Modal,
  TextField,
  TextareaAutosize,
} from '@mui/material';

import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation


const CertsRemainders = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [certs, setCerts] = useState({
        name: '',
        description: '',
        url: '',
        toDate: '',
        endDate: '',
    });


   
  const appointments = [
    {
      patientName: 'Elsie Gilley',
      avatarUrl: 'assets/img/patients/patient6.jpg',
      apptDate: '14 Nov 2019',
      apptTime: '6.00 PM',
      purpose: 'Fever',
      type: 'Old Patient',
      paidAmount: '$300',
    },
    // ... Add more appointments
  ];
  const handleModalOpen = () => {
    setIsModalOpen(true);
};

const handleModalClose = () => {
    setIsModalOpen(false);
    setCerts({
        name: '',
        description: '',
        url: '',
        toDate: '',
        endDate: '',
    });
};

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCerts((prevService) => ({
        ...prevService,
        [name]: value,
    }));
};

const handleSubmit = () => {
    // Handle saving the new service data
    console.log('New remainder:', certs);
    handleModalClose();
};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', }}>
  
     

          <Container maxWidth="lg" style={{ width: '90%', margin: '0 auto', marginTop: '100px' }}>
          <Box sx={{ display: 'flex', justifyContent: "flex-end", flexDirection: "flex-direction" }} >
                        <Button variant="contained" onClick={handleModalOpen} size="small" sx={{ padding: 1, marginLeft: 2, width: '15%' }}> Add New Remainder</Button>
                    </Box>
      <Card sx={{marginTop:2}}>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient Name</TableCell>
                  <TableCell>Appt Date</TableCell>
                  <TableCell>Purpose</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="center">Paid Amount</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((appointment, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={appointment.avatarUrl}
                          alt="User Image"
                          style={{ marginRight: 10 }}
                        />
                        <div>
                          <Link
                            to="patient-profile.html"
                            style={{ color: '#1976d2', textDecoration: 'none' }}
                          >
                            <Typography variant="subtitle1">
                              {appointment.patientName}{' '}
                              <span style={{ color: '#666' }}>#{`PT00${index + 6}`}</span>
                            </Typography>
                          </Link>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {appointment.apptDate}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {appointment.apptTime}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{appointment.purpose}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{appointment.type}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body1">{appointment.paidAmount}</Typography>
                    </TableCell>
                   
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      </Container>

      <Modal
                open={isModalOpen}
                onClose={handleModalClose}
                aria-labelledby="add-service-modal-title"
                aria-describedby="add-service-modal-description"
            >
                <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: 3, maxWidth: 600 }}>
                    <Typography variant="h6" id="add-service-modal-title" gutterBottom>
                        Add New Remainder
                    </Typography>
                    <TextField
                        label="Name"
                        name="name"
                        value={certs.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />

                    <TextareaAutosize
                        aria-label="Description"
                        name="description"
                        value={certs.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        minRows={7}
                        maxRows={100}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />

                    <TextField
                        label="URL"
                        name="url"
                        value={certs.url}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="To Date"
                        name="toDate"
                        type="date"
                        value={certs.toDate}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="End Date"
                        name="endDate"
                        type="date"
                        value={certs.endDate}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button onClick={handleModalClose} color="primary">
                            Close
                        </Button>
                        <Button onClick={handleSubmit} color="primary" variant="contained" sx={{ marginLeft: 2 }}>
                            Save
                        </Button>
                    </Box>
                </Paper>
            </Modal>
     
    </div>
  );
};

export default CertsRemainders;
