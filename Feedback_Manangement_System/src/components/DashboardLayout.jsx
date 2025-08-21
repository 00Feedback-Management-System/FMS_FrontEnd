import React, {useState} from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Toolbar, AppBar, Typography, Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
    const [openReports, setOpenReports] = useState(false);
    const [openFeedbackSummary, setOpenFeedbackSummary] = useState(false);
    const navigate = useNavigate();

    const handleFeedbackClick = () => {
        navigate("/app/feedback-dashboard");
    };

    const handleScheduleFeedbackClick = () => {
        navigate("/app/schedule-Feedback-List");
    };

    const handleReportsClick = () => {
        setOpenReports(!openReports);
    };

    const handleFeedbackSummaryClick = () => {
        setOpenFeedbackSummary(!openFeedbackSummary);
    }

    const handleLogout = () => {
        console.log("Logout Succesfull")
        navigate("/");
    }

    const username = "Suhas Patil";
    const drawerWidth = 250;

    return (
        <Box sx={{ display: "flex" }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth },
                }}
            >
                <Box
                    sx={{
                        bgcolor: (theme) => theme.palette.primary.main,
                        color: (theme) => theme.palette.primary.contrastText,
                        display: "flex",
                        alignItems: "center",
                        height: 64,
                        px: 2,
                        fontWeight: 600,
                        fontSize: 22,
                        letterSpacing: 1.2
                    }}
                >
                    <AccountCircleIcon sx={{mr: 2}}/>
                    {username}
                </Box>
                <Box sx={{flexGrow: 1}}>
                    <List>
                        <ListItem button onClick={handleFeedbackClick}>
                            <ListItemIcon>
                                <ThumbUpAltIcon />
                            </ListItemIcon>
                            Feedback
                        </ListItem>
                        <ListItem button onClick={handleScheduleFeedbackClick}>
                            <ListItemIcon>
                                <AddToPhotosIcon />
                            </ListItemIcon>
                            Schedule Feedback
                        </ListItem>
                        <ListItem button onClick={handleReportsClick}>
                            <ListItemIcon>
                                <EditSquareIcon />
                            </ListItemIcon>
                            Reports
                            {openReports ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openReports}>
                            <List >
                                <ListItem button onClick={() => navigate("/app/coursewise-report")} sx={{ pl: 8 }}>
                                Coursewise Report
                                </ListItem>
                                <ListItem button onClick={() => navigate("/app/staff-dashboard")} sx={{ pl: 8 }}>
                                Staff Report
                                </ListItem>  
                            </List>
                        </Collapse>
                        <ListItem button onClick={handleFeedbackSummaryClick}>
                            <ListItemIcon>
                                <ImportContactsIcon />
                            </ListItemIcon>
                            Feedback Summary
                            {openFeedbackSummary ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={openFeedbackSummary}>
                            <ListItem button onClick={() => navigate("/app/faculty-feedback-summary")} sx={{ pl: 8 }}>
                                Faculty Feedback Summary
                            </ListItem>
                            <ListItem button onClick={() => navigate("/app/per-faculty-feedback-summary")} sx={{ pl: 8 }}>
                                Per-Faculty Feedback Summary
                            </ListItem>
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
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "background.default",
                    p: 3,
                    width: "100%",
                    minHeight: "100vh"
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}

export default DashboardLayout;