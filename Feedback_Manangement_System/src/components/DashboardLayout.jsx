import React, { useState, useContext } from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Toolbar, AppBar, Typography, Collapse, ListItemButton } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutIcon from '@mui/icons-material/Logout';
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { RoleContext } from "../App";

function DashboardLayout() {
    const [openReports, setOpenReports] = useState(false);
    const [openFeedbackSummary, setOpenFeedbackSummary] = useState(false);
    const [openStudentFeedback, setOpenStudentFeedback] = useState(false);
    const navigate = useNavigate();

    const { role } = useContext(RoleContext);
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user ? `${user.first_name} ${user.last_name}` : "Guest";
    const currentRole = role || (user ? user.role : null);

    const handleLogout = () => {
        localStorage.removeItem("user");
        console.log("Logout Succesfull")
        navigate("/");
    }

    // const username = "Suhas Patil";
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
                    <AccountCircleIcon sx={{ mr: 2 }} />
                    {username}
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <List>
                        {currentRole?.toLowerCase() === "admin" && (
                            <>
                                <ListItemButton onClick={() => navigate("/app/feedback-dashboard")}>
                                    <ListItemIcon>
                                        <ThumbUpAltIcon />
                                    </ListItemIcon>
                                    Feedback
                                </ListItemButton>
                                <ListItemButton onClick={() => navigate("/app/schedule-Feedback-List")}>
                                    <ListItemIcon>
                                        <AddToPhotosIcon />
                                    </ListItemIcon>
                                    Schedule Feedback
                                </ListItemButton>
                                <ListItemButton onClick={() => setOpenReports(!openReports)}>
                                    <ListItemIcon>
                                        <EditSquareIcon />
                                    </ListItemIcon>
                                    Reports
                                    {openReports ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openReports}>
                                    <List >
                                        <ListItemButton onClick={() => navigate("/app/coursewise-report")} sx={{ pl: 8 }}>
                                            Coursewise Report
                                        </ListItemButton>
                                        {/* <ListItem button onClick={() => navigate("/app/staff-dashboard")} sx={{ pl: 8 }}>
                                            Staff Report
                                        </ListItem> */}
                                    </List>
                                </Collapse>
                                <ListItemButton onClick={() => setOpenFeedbackSummary(!openFeedbackSummary)}>
                                    <ListItemIcon>
                                        <ImportContactsIcon />
                                    </ListItemIcon>
                                    Feedback Summary
                                    {openFeedbackSummary ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openFeedbackSummary}>
                                    <ListItem button onClick={() => navigate("/app/faculty-feedback-summary")} sx={{ pl: 8 }}>
                                        Faculty Feedback Summary
                                    </ListItem>
                                    <ListItem button onClick={() => navigate("/app/per-faculty-feedback-summary")} sx={{ pl: 8 }}>
                                        Per-Faculty Feedback Summary
                                    </ListItem>
                                </Collapse>
                                  <ListItemButton onClick={() => navigate("/app/staff/add")}>
                                    <ListItemIcon>
                                        <ThumbUpAltIcon />
                                    </ListItemIcon>
                                    Add Staff
                                </ListItemButton>
                               <ListItemButton onClick={() => navigate("/app/add-module")}>
                               <ListItemIcon>
                               <LibraryAddIcon />
                               </ListItemIcon>
                                Add Module
                                </ListItemButton>
                                <ListItemButton onClick={() => navigate("/app/add-course")}>
                               <ListItemIcon>
                               <LibraryAddIcon />
                               </ListItemIcon>
                                Add Course
                            </ListItemButton>
                            <ListItemButton onClick={() => navigate("/app/add-group")}>
                               <ListItemIcon>
                               <LibraryAddIcon />
                               </ListItemIcon>
                                Add Group
                            </ListItemButton>
                            </>
                        )}

                        {currentRole?.toLowerCase() === "trainer" && (
                            <ListItemButton onClick={() => navigate("/app/staff-dashboard")}>
                                <ListItemIcon>
                                    <ThumbUpAltIcon />
                                </ListItemIcon>
                                My Feedbacks
                            </ListItemButton>
                        )}

                        {currentRole?.toLowerCase() === "student" && (
                            <>
                                <ListItemButton
                                    onClick={() => setOpenStudentFeedback(!openStudentFeedback)}
                                >
                                    <ListItemIcon>
                                        <ThumbUpAltIcon />
                                    </ListItemIcon>
                                    Feedback
                                    {openStudentFeedback ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={openStudentFeedback}>
                                    <List>
                                        <ListItemButton
                                            onClick={() => navigate("/app/student-pending-feedbacklist")}
                                            sx={{ pl: 8 }}
                                        >
                                            Pending
                                        </ListItemButton>
                                        <ListItemButton
                                            onClick={() => navigate("/app/student-feedback-history")}
                                            sx={{ pl: 8 }}
                                        >
                                            History
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                            </>
                        )}
                    </List>
                </Box>
                <Box>
                    <List>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            Logout
                        </ListItemButton>
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