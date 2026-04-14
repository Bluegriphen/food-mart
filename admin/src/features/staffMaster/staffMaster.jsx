// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Container,
//   Paper,
//   Alert,
//   Snackbar,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Chip,
//   InputAdornment,
//   Avatar,
//   Tooltip,
//   CircularProgress
// } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import PersonIcon from '@mui/icons-material/Person';
// import './StaffMaster.css';

// const StaffMaster = () => {
//   const navigate = useNavigate();
//   const [staffList, setStaffList] = useState([]);
//   const [filteredStaff, setFilteredStaff] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   });

//   const API_BASE_URL = 'http://localhost:4000/api/staff-master';

//   useEffect(() => {
//     fetchStaffList();
//   }, []);

//   useEffect(() => {
//     filterStaff();
//   }, [searchTerm, staffList]);

//   const fetchStaffList = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(API_BASE_URL);
      
//       let staffData = [];
//       if (response.data && response.data.success) {
//         staffData = response.data.data || [];
//       } else if (Array.isArray(response.data)) {
//         staffData = response.data;
//       }
      
//       const staffWithSrNo = staffData.map((staff, index) => ({
//         ...staff,
//         srNo: index + 1
//       }));
      
//       setStaffList(staffWithSrNo);
//     } catch (error) {
//       console.error('Error fetching staff list:', error);
//       showSnackbar('Failed to load staff list', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterStaff = () => {
//     let filtered = [...staffList];
    
//     if (searchTerm.trim()) {
//       filtered = filtered.filter(staff => 
//         staff.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         staff.role?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     setFilteredStaff(filtered);
//   };

//   const showSnackbar = (message, severity = 'success') => {
//     setSnackbar({
//       open: true,
//       message,
//       severity
//     });
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar(prev => ({ ...prev, open: false }));
//   };

//   return (
//     <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
//       {/* Header Section */}
//       <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'white', borderRadius: 2 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
//             Staff Master
//           </Typography>
          
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={() => navigate('/staff-type/create')}
//             sx={{
//               bgcolor: '#e46505ff',
//               '&:hover': { bgcolor: '#f5741eff' },
//               borderRadius: 2,
//               px: 3
//             }}
//           >
//             Add 
//           </Button>
//         </Box>

//         {/* Search Field */}
//         <TextField
//           placeholder="Search staff..."
//           variant="outlined"
//           size="small"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ maxWidth: '400px' }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon sx={{ color: '#94a3b8' }} />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Paper>

//       {/* Staff Table */}
//       <Paper elevation={0} sx={{ borderRadius: 2 }}>
//         {loading ? (
//           <Box display="flex" justifyContent="center" p={4}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <TableContainer>
//             <Table>
//               <TableHead sx={{ bgcolor: '#f8fafc' }}>
//                 <TableRow>
//                   <TableCell>Sr. No</TableCell>
//                   <TableCell>Staff</TableCell>
//                   <TableCell>Role</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell align="center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredStaff.map((staff) => (
//                   <TableRow key={staff._id} hover>
//                     <TableCell>{staff.srNo}</TableCell>
//                     <TableCell>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                         <Avatar sx={{ bgcolor: '#3b82f6' }}>
//                           <PersonIcon />
//                         </Avatar>
//                         <Typography>{staff.name}</Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell>{staff.role}</TableCell>
//                     <TableCell>
//                       <Chip 
//                         label={staff.status ? 'Active' : 'Inactive'}
//                         color={staff.status ? 'success' : 'default'}
//                         size="small"
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <IconButton color="primary" size="small">
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton color="error" size="small">
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Paper>

//       <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
//         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default StaffMaster;  

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Alert,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  InputAdornment,
  Avatar,
  Tooltip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import './StaffMaster.css';

const StaffMaster = () => {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Edit Modal States
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    status: true
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editErrors, setEditErrors] = useState({});

  // Delete Dialog States
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    id: null,
    title: ''
  });

  // Snackbar State
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const API_BASE_URL = 'http://localhost:4000/api/staff-master';

  // Fetch all staff types on component mount
  useEffect(() => {
    fetchStaffList();
  }, []);

  // Filter staff based on search
  useEffect(() => {
    filterStaff();
  }, [searchTerm, staffList]);

  // Fetch staff list from API
  const fetchStaffList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE_URL);
      
      let staffData = [];
      if (Array.isArray(response.data)) {
        staffData = response.data;
      } else if (response.data && response.data.data) {
        staffData = response.data.data;
      }
      
      const staffWithSrNo = staffData.map((staff, index) => ({
        ...staff,
        srNo: index + 1
      }));
      
      setStaffList(staffWithSrNo);
      setFilteredStaff(staffWithSrNo);
    } catch (error) {
      console.error('Error fetching staff list:', error);
      showSnackbar('Failed to load staff list', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Filter staff function
  const filterStaff = () => {
    if (!searchTerm.trim()) {
      setFilteredStaff(staffList);
      return;
    }
    
    const filtered = staffList.filter(staff => 
      staff.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredStaff(filtered);
  };

  // Show snackbar notification
  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Handle Add button click
  const handleAddClick = () => {
    navigate('/staff-type/create');
  };

  // Handle Edit button click
  const handleEditClick = (staff) => {
    setCurrentStaff(staff);
    setEditFormData({
      title: staff.title || '',
      description: staff.description || '',
      status: staff.status !== undefined ? staff.status : true
    });
    setEditErrors({});
    setEditModalOpen(true);
  };

  // Handle Edit form input change
  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (editErrors[name]) {
      setEditErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate edit form
  const validateEditForm = () => {
    const errors = {};
    if (!editFormData.title.trim()) {
      errors.title = 'Title is required';
    }
    setEditErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Edit form submit
  const handleEditSubmit = async () => {
    if (!validateEditForm()) {
      return;
    }

    setEditLoading(true);
    
    try {
      const response = await axios.put(`${API_BASE_URL}/${currentStaff._id}`, {
        title: editFormData.title.trim(),
        description: editFormData.description.trim(),
        status: editFormData.status
      });

      if (response.status === 200) {
        showSnackbar('Staff type updated successfully!', 'success');
        await fetchStaffList(); // Refresh the list
        setEditModalOpen(false);
      }
    } catch (error) {
      console.error('Error updating staff:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update staff type';
      showSnackbar(errorMessage, 'error');
    } finally {
      setEditLoading(false);
    }
  };

  // Handle Delete button click
  const handleDeleteClick = (id, title) => {
    setDeleteDialog({
      open: true,
      id,
      title
    });
  };

  // Handle Delete confirm
  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${deleteDialog.id}`);

      if (response.status === 200) {
        showSnackbar(`Staff type "${deleteDialog.title}" deleted successfully!`, 'success');
        await fetchStaffList(); // Refresh the list
      }
    } catch (error) {
      console.error('Error deleting staff:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete staff type';
      showSnackbar(errorMessage, 'error');
    } finally {
      setDeleteDialog({ open: false, id: null, title: '' });
    }
  };

  // Handle Delete cancel
  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, id: null, title: '' });
  };

  // Handle Status Toggle
  const handleStatusToggle = async (staff) => {
    try {
      const newStatus = !staff.status;
      const response = await axios.put(`${API_BASE_URL}/${staff._id}`, {
        status: newStatus
      });

      if (response.status === 200) {
        showSnackbar(
          `Staff type "${staff.title}" ${newStatus ? 'activated' : 'deactivated'} successfully!`,
          'success'
        );
        await fetchStaffList(); // Refresh the list
      }
    } catch (error) {
      console.error('Error toggling status:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update status';
      showSnackbar(errorMessage, 'error');
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
      {/* Header Section */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'white', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: '#1e293b' }}>
              Staff Master
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Manage staff types and their details
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
            sx={{
              bgcolor: '#e46505ff',
              '&:hover': { 
                bgcolor: '#f5741eff',
                transform: 'translateY(-2px)',
                boxShadow: 3
              },
              borderRadius: 2,
              px: 3,
              py: 1,
              transition: 'all 0.3s'
            }}
          >
            Add New Staff Type
          </Button>
        </Box>

        {/* Search Field */}
        <TextField
          placeholder="Search by title or description..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: '400px' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#94a3b8' }} />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* Staff Table */}
      <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={4}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f8fafc' }}>
                <TableRow>
                  <TableCell width="80"><strong>Sr. No</strong></TableCell>
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Description</strong></TableCell>
                  <TableCell width="120"><strong>Status</strong></TableCell>
                  <TableCell width="150" align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStaff.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        No staff types found
                      </Typography>
                      <Button
                        variant="text"
                        startIcon={<AddIcon />}
                        onClick={handleAddClick}
                        sx={{ mt: 1 }}
                      >
                        Add your first staff type
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStaff.map((staff) => (
                    <TableRow key={staff._id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="500">
                          {staff.srNo}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: '#3b82f6', width: 32, height: 32 }}>
                            <PersonIcon fontSize="small" />
                          </Avatar>
                          <Typography fontWeight="500">{staff.title}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" sx={{
                          maxWidth: 300,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {staff.description || 'No description'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip 
                            label={staff.status ? 'Active' : 'Inactive'}
                            color={staff.status ? 'success' : 'default'}
                            size="small"
                            sx={{ minWidth: 70 }}
                          />
                          <Tooltip title={staff.status ? 'Deactivate' : 'Activate'}>
                            <Switch
                              size="small"
                              checked={staff.status || false}
                              onChange={() => handleStatusToggle(staff)}
                              color="success"
                            />
                          </Tooltip>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Edit">
                          <IconButton 
                            color="primary" 
                            size="small"
                            onClick={() => handleEditClick(staff)}
                            sx={{ mr: 1 }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton 
                            color="error" 
                            size="small"
                            onClick={() => handleDeleteClick(staff._id, staff.title)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Footer with summary */}
      {staffList.length > 0 && (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredStaff.length} of {staffList.length} staff types
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label={`Active: ${staffList.filter(s => s.status).length}`}
              color="success"
              size="small"
            />
            <Chip
              label={`Inactive: ${staffList.filter(s => !s.status).length}`}
              color="default"
              size="small"
            />
          </Box>
        </Box>
      )}

      {/* Edit Modal */}
      <Dialog 
        open={editModalOpen} 
        onClose={() => setEditModalOpen(false)}
        maxWidth="sm"
        fullWidth
        disableEscapeKeyDown={editLoading}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              Edit Staff Type
            </Typography>
            <IconButton 
              onClick={() => setEditModalOpen(false)} 
              size="small"
              disabled={editLoading}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent dividers>
          <Box component="form" noValidate>
            <TextField
              fullWidth
              label="Title *"
              name="title"
              value={editFormData.title}
              onChange={handleEditInputChange}
              error={!!editErrors.title}
              helperText={editErrors.title}
              margin="normal"
              required
              disabled={editLoading}
              autoFocus
            />
            
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={editFormData.description}
              onChange={handleEditInputChange}
              margin="normal"
              multiline
              rows={3}
              disabled={editLoading}
              placeholder="Enter description..."
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={editFormData.status}
                  onChange={handleEditInputChange}
                  name="status"
                  color="primary"
                  disabled={editLoading}
                />
              }
              label={
                <Typography variant="body2">
                  Status: <strong>{editFormData.status ? 'Active' : 'Inactive'}</strong>
                </Typography>
              }
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={() => setEditModalOpen(false)}
            disabled={editLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            color="primary"
            disabled={editLoading || !editFormData.title.trim()}
            startIcon={editLoading ? <CircularProgress size={20} /> : <SaveIcon />}
          >
            {editLoading ? 'Updating...' : 'Update Staff Type'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>
          <Typography variant="h6" color="error">
            Confirm Delete
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>"{deleteDialog.title}"</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error" 
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default StaffMaster;