import React, {useState} from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Toolbar, AppBar, Typography, Collapse } from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ReportIcon from '@mui/icons-material/Summarize';
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function DashboardLayout() {
    const [openReports, setOpenReports] = useState(false);

    const handleReportsClick = () => {
        setOpenReports(!openReports);
    };

    const handleLogout = () => {
        console.log("Logout Succesfull")
    }

    const username = "Suhas Patil";

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                    <Typography variant="body1" sx={{ mr: 1 }}>
                        {username}
                    </Typography>
                    <AccountCircleIcon />
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: 250,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 250, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" },
                }}
            >
                <Toolbar />
                <Box sx={{flexGrow: 1}}>
                    <List>
                        <ListItem button component="a" href="/feedback">
                            <ListItemIcon>
                                <FeedbackIcon />
                            </ListItemIcon>
                            Feedback
                        </ListItem>
                        <ListItem button onClick={handleReportsClick}>
                            <ListItemIcon>
                                <ReportIcon />
                            </ListItemIcon>
                            Reports
                            {openReports ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openReports}>
                            <List >
                                <ListItem button component="a" href="/feedback-reports" sx={{ pl: 8 }}>
                                Feedback Report
                                </ListItem>
                                <ListItem button component="a" href="/coursewise-reports" sx={{ pl: 8 }}>
                                Coursewise Report
                                </ListItem>
                            </List>
                        </Collapse>
                    </List>
                </Box>
                <Box>
                    <List>
                        <ListItem button onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            Logout
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Box>
                
            </Box>
        </Box>
    );
}

export default DashboardLayout;