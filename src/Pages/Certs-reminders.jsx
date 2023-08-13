import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
    const [certs, setCerts]  = useState ([])

    useEffect(()=>{
      axios.get("https://mocki.io/v1/b9eaa918-704d-49e3-9180-142367bae413").then((res)=>{
        setCerts(res.data)
      }).catch((error)=>{
          console.log(error)
      })
  
  },[])


  const handleModalOpen = () => {
    setIsModalOpen(true);
};
const [name, setName] = useState ("")
    const [description, setDescription] = useState ("")
    const [url, setUrl] = useState ("")
    const [toDate, setToDate] = useState ("")
    const [endDate, setEndDate] = useState ("")


    const handleSubmit = () => {
     
      console.log(name, description, toDate, endDate);
      const data = {name, description, toDate, endDate}
      
      axios.post("http://localhost:8080/api/remainder" , data).then((res)=>{
          toast.success("Operation completed successfully!");
      }).catch((error)=>{
          console.log(error)
      })
      
      handleModalClose();
  };

const handleModalClose = () => {
    setIsModalOpen(false);
    setDescription("")
        setUrl("")
        setName("")
        setToDate("")
        setEndDate("")
};



  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor : "#fff"}}>
  
     

          <Container maxWidth="lg" style={{ width: '90%', margin: '0 auto', marginTop: '100px' }}>
          <Box sx={{ display: 'flex', justifyContent: "flex-end", flexDirection: "flex-direction" }} >
                        <Button variant="outlined" onClick={handleModalOpen} size="small" sx={{ padding: 1, marginLeft: 2, width: '15%', color: "#000000", border: "1px solid #000000" }}> Add New Remainder</Button>
                    </Box>
      <Card sx={{marginTop:2}}>
        <CardContent>
          <TableContainer component={Paper} sx={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>To Date</TableCell>
                  <TableCell>End Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {certs.map((cert, index) => (
                  <TableRow key={index}>
                    <TableCell>
                    
                      
                        <div>
                            <Typography variant="subtitle1"> {cert.name} </Typography>
                       
                        </div>
                      
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">
                        {cert.description}
                      </Typography>
                      
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{cert.toDate}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{cert.endDate}</Typography>
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
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        fullWidth
                        margin="normal"
                    />

                    <TextareaAutosize
                        aria-label="Description"
                        name="description"
                        value={description}
                        onChange={(e)=>{setDescription(e.target.value)}}
                        placeholder="Description"
                        minRows={7}
                        maxRows={100}
                        style={{ width: '100%', backgroundColor: "#1e1e1e" ,padding: '8px', borderRadius: '4px',color : "#fff" , border:  '1px solid #ccc' }}
                    />

                    <TextField
                        label="To Date"
                        name="toDate"
                        type="date"
                        value={toDate}
                        onChange={(e)=>{setToDate(e.target.value)}}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="End Date"
                        name="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e)=>{setEndDate(e.target.value)}}
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
