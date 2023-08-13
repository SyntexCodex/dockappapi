import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { ToastContainer, toast } from 'react-toastify';
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

} from '@mui/material';


import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
const [websiteLinks , setWebsiteLinks] = useState([])
const [search , setSearch] = useState([])

useEffect(()=>{
    axios.get("https://mocki.io/v1/60a6aae8-d96a-493a-99f6-3a2c29f8b39f").then((res)=>{
        setWebsiteLinks(res.data)
        setSearch(res.data);
    }).catch((error)=>{
        console.log(error)
    })

},[])
console.log(websiteLinks)
        
    const StyledAppBar = styled(AppBar)(({ theme }) => ({
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        position: 'fixed',
        width: '100%',
        zIndex: theme.zIndex.drawer + 1,
      }));

    const [iframeSrc, setIframeSrc] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [name, setName] = useState ("")
    const [description, setDescription] = useState ("")
    const [url, setUrl] = useState ("")
    


    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const filteredLinks = websiteLinks.filter((link) =>
            link.name.toLowerCase().includes(searchValue)
        );
        setSearch(filteredLinks);
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
        setDescription("")
        setUrl("")
        setName("")
        
    };

 

    const handleSubmit = () => {
     
        console.log(name, description, url);
        const data = {name, description, url}
        
        axios.post("http://localhost:8080/api/services" , data).then((res)=>{
            toast.success("Operation completed successfully!");
        }).catch((error)=>{
            console.log(error)
        })
        
        handleModalClose();
    };


    return (
    
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh, ' }}>
       

            <Grid container sx={{marginTop: "62px" , }}>


                <Grid item xs={2} sx={{ borderRight: '1px solid #ccc', display: 'flex', flexDirection: 'column', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)' }}>
                    <TextField
                   
                        label="Search"
                        variant="outlined"
                        size="small"
                        
                        onChange={handleSearch}
                        sx={{ marginLeft: '10px', marginTop:"30px", marginRight : "10px"}}
                    />
                    <div style={{ marginBottom: '20px' }}>
                    </div>

                        <List>
                            {search?.map((link, index) => (
                                <React.Fragment key={index}>
                                    <ListItem
                                        key={index}
                                        button
                                        onClick={(e) => handleLinkClick(e, link.url)}
                                        sx={{
            
                                          paddingRight : "80px",
                                            
                                            '&:hover': { cursor: 'pointer' ,  },
                                        }}
                                    >
                                        <ListItemText primary={link.name} />
                                    </ListItem>
                                </React.Fragment>
                            ))}
                        </List>
                    
                </Grid>
         
                <Grid item xs={10} sx={{ padding: '20px', display: 'flex', flexDirection: 'column', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', backgroundColor:"#fff" }}>
                    
                    <Box sx={{ display: 'flex', justifyContent: "flex-end", flexDirection: "flex-direction" }} >
                    
                        <Button variant="outlined" color="primary" component={Link} to="/certs-and-remainders" sx={{ padding: 1, marginLeft: 1, width: '20%'  ,color: "#000000", border: "1px solid #000000" }}>Certs and Reminders</Button>
                        <Button variant="outlined" color="primary" onClick={handleModalOpen} sx={{ padding: 1, marginLeft: 1, width: '20%' ,color: "#000000", border: "1px solid #000000" }}> Add New Service</Button>
                    </Box>


                    <Box sx={{ flexGrow: 1, display: 'flex', marginTop: 2, alignItems: 'center', justifyContent: 'center' }}>
                 <Paper elevation={3} sx={{ padding: 2, height: '500px', width: '100%', position: 'sticky', top: '100px', zIndex: 1, boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.9)', backgroundColor:"#fff"}}>
                 <Typography  variant="h6">Website Preview</Typography>

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
                <ToastContainer/>
         
                    <Typography variant="h6" id="add-service-modal-title" gutterBottom>
                        Add New Service
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
                        style={{ width: '100%', backgroundColor: "#1e1e1e", padding: '8px', borderRadius: '4px', border: '1px solid #ccc', color:"#fff" }}
                    />

                    <TextField
                        label="URL"
                        name="url"
                        value={url}
                        onChange={(e)=>{setUrl(e.target.value)}}
                        fullWidth
                        margin="normal"
                    />
                 
                   
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
                        <Button onClick={handleModalClose} color="primary">
                            Close
                        </Button>
                        <Button onClick={handleSubmit}  variant="outlined" sx={{ marginLeft: 2 }}>
                            Save
                        </Button>
                    </Box>
                </Paper>
            </Modal>
        </div>
       
    );
};

export default Dashboard;
