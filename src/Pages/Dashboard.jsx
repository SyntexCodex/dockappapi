import React, { useState } from 'react';
import {
    Paper,
    List,
    ListItem,
    ListItemText,
    Typography,
    Button,
    Modal,
    Box,
    TextField,
   
    Grid,
    Divider,
} from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const Dashboard = () => {

    const websiteLinks = [
        { name: 'Facebook', url: 'https://facebook.com', },
        { name: 'Hiexpert', url: 'https://hiexpert.tech/', },
        { name: 'Microsoft', url: 'https://microsoft.com', },
        // Add more links as needed
    ];

    const [iframeSrc, setIframeSrc] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchedLinks, setSearchedLinks] = useState(websiteLinks);
    const [newService, setNewService] = useState({
        name: '',
        description: '',
        url: '',
       
    });


    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const filteredLinks = websiteLinks.filter((link) =>
            link.name.toLowerCase().includes(searchValue)
        );
        setSearchedLinks(filteredLinks);
    };

    const handleLinkClick = (event, src) => {
        event.preventDefault();
        setIframeSrc(src);
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setNewService({
            name: '',
            description: '',
            url: '',
            toDate: '',
            endDate: '',
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewService((prevService) => ({
            ...prevService,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        // Handle saving the new service data
        console.log('New Service:', newService);
        handleModalClose();
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh, ' }}>
          
         

            <Grid container sx={{marginTop: "62px"}}>


                <Grid item xs={2} sx={{ borderRight: '1px solid #ccc', padding:  '20px', display: 'flex', flexDirection: 'column', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        onChange={handleSearch}
                        sx={{ marginLeft: 'auto', backgroundColor: 'white' }}
                    />
                    <div style={{ marginBottom: '20px' }}>
                    </div>
                    <Paper elevation={2} sx={{ padding: 2, flexGrow: 1, display: "flex", justifyContent: 'space-evenly', }}>
                        <List>
                            {searchedLinks.map((link, index) => (
                                <React.Fragment key={index}>
                                    <ListItem
                                        key={index}
                                        button
                                        onClick={(e) => handleLinkClick(e, link.url)}
                                        sx={{
                                            borderRadius: 4,
                                            // marginBottom: 1,
                                            paddingX: 5,
                                            textAlign: 'center',
                                            '&:hover': { cursor: 'pointer', backgroundColor: "#1976d2", color: 'white', },
                                        }}
                                    >
                                        <ListItemText primary={link.name} />
                                    </ListItem>
                                    <Divider variant="middle" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }} />
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={10} sx={{ padding: '20px', display: 'flex', flexDirection: 'column', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                    <Box sx={{ display: 'flex', justifyContent: "flex-end", flexDirection: "flex-direction" }} >
                        <Button variant="contained" color="primary" component={Link} to="/certs-and-remainders" sx={{ padding: 1, marginLeft: 1, width: '20%' }}>Certs and Reminders</Button>
                        <Button variant="contained" onClick={handleModalOpen} sx={{ padding: 1, marginLeft: 1, width: '20%' }}> Add New Service</Button>
                    </Box>


                    <Box sx={{ flexGrow: 1, display: 'flex', marginTop: 2, alignItems: 'center', justifyContent: 'center' }}>
                        <Paper elevation={3} sx={{ padding: 2, height: '500px', width: '100%', position: 'sticky', top: '100px', zIndex: 1, boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.9)' }}>
                            <iframe title='website-Preview' src={iframeSrc} style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
            <Modal
                open={isModalOpen}
                onClose={handleModalClose}
                aria-labelledby="add-service-modal-title"
                aria-describedby="add-service-modal-description"
            >
                <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: 3, maxWidth: 600 }}>
                    <Typography variant="h6" id="add-service-modal-title" gutterBottom>
                        Add New Service
                    </Typography>
                    <TextField
                        label="Name"
                        name="name"
                        value={newService.name}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />

                    <TextareaAutosize
                        aria-label="Description"
                        name="description"
                        value={newService.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        minRows={7}
                        maxRows={100}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />

                    <TextField
                        label="URL"
                        name="url"
                        value={newService.url}
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

export default Dashboard;
