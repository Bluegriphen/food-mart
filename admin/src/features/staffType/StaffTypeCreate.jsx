import React, { useState, useEffect } from 'react';
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
  FormControlLabel,
  Switch,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Grid,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

const StaffTypeCreate = () => {
  // States for staff list
  const [staffTypes, setStaffTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States for create/edit modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [currentStaffId, setCurrentStaffId] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  
  // States for form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: true
  });
  
  // States for validation errors
  const [errors, setErrors] = useState({
    title: ''
  });
  
  // States for snackbar notifications
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // States for delete confirmation
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    id: null,
    title: ''
  });

  // API base URL
  const API_BASE_URL = 'http://localhost:4000/api/staff-master';

  // Fetch all staff types on component mount
  useEffect(() => {
    fetchStaffTypes();
  }, []);

  // Function to fetch all staff types
  const fetchStaffTypes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE_URL);
      setStaffTypes(response.data);
    } catch (error) {
      console.error('Error fetching staff types:', error);
      showSnackbar('Failed to load staff types', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Function to show snackbar notifications
  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  // Function to close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Function to open create modal
  const handleOpenCreateModal = () => {
    setModalMode('create');
    setFormData({
      title: '',
      description: '',
      status: true
    });
    setErrors({ title: '' });
    setModalOpen(true);
  };

  // Function to open edit modal
  const handleOpenEditModal = (staff) => {
    setModalMode('edit');
    setCurrentStaffId(staff._id);
    setFormData({
      title: staff.title,
      description: staff.description || '',
      status: staff.status
    });
    setErrors({ title: '' });
    setModalOpen(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'status' ? checked : value
    });
    
    // Clear error when user starts typing
    if (name === 'title' && value.trim()) {
      setErrors({ ...errors, title: '' });
    }
  };

  // Function to validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission (create/update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setModalLoading(true);
    
    try {
      if (modalMode === 'create') {
        // Create new staff type
        await axios.post(API_BASE_URL, formData);
        showSnackbar('Staff type created successfully!', 'success');
      } else {
        // Update existing staff type
        await axios.put(`${API_BASE_URL}/${currentStaffId}`, formData);
        showSnackbar('Staff type updated successfully!', 'success');
      }
      
      // Refresh the staff list
      fetchStaffTypes();
      
      // Close modal after successful operation
      setTimeout(() => {
        setModalOpen(false);
        setModalLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error(`Error ${modalMode === 'create' ? 'creating' : 'updating'} staff type:`, error);
      
      let errorMessage = `Failed to ${modalMode === 'create' ? 'create' : 'update'} staff type`;
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      showSnackbar(errorMessage, 'error');
      setModalLoading(false);
    }
  };

  // Function to handle delete click
  const handleDeleteClick = (id, title) => {
    setDeleteDialog({
      open: true,
      id,
      title
    });
  };

  // Function to confirm delete
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/${deleteDialog.id}`);
      showSnackbar('Staff type deleted successfully!', 'success');
      fetchStaffTypes();
    } catch (error) {
      console.error('Error deleting staff type:', error);
      showSnackbar('Failed to delete staff type', 'error');
    } finally {
      setDeleteDialog({ open: false, id: null, title: '' });
    }
  };

  // Function to cancel delete
  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, id: null, title: '' });
  };

  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Function to toggle staff status
  const handleToggleStatus = async (id, currentStatus, title) => {
    try {
      const newStatus = !currentStatus;
      await axios.put(`${API_BASE_URL}/${id}`, { status: newStatus });
      
      showSnackbar(
        `Staff type "${title}" ${newStatus ? 'activated' : 'deactivated'} successfully!`,
        'success'
      );
      
      // Refresh the staff list
      fetchStaffTypes();
    } catch (error) {
      console.error('Error toggling status:', error);
      showSnackbar('Failed to update status', 'error');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Staff Types Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage and organize different types of staff in your system
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenCreateModal}
            sx={{ height: 'fit-content' }}
          >
            Add New Staff Type
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Total Staff Types
                </Typography>
                <Typography variant="h4">
                  {staffTypes.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Active Staff Types
                </Typography>
                <Typography variant="h4" color="success.main">
                  {staffTypes.filter(staff => staff.status).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Inactive Staff Types
                </Typography>
                <Typography variant="h4" color="text.secondary">
                  {staffTypes.filter(staff => !staff.status).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Staff Types Table */}
        <Paper elevation={3}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" p={4}>
              <CircularProgress />
            </Box>
          ) : staffTypes.length === 0 ? (
            <Box p={4} textAlign="center">
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No staff types found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Start by adding your first staff type
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpenCreateModal}
              >
                Add First Staff Type
              </Button>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Title</strong></TableCell>
                    <TableCell><strong>Description</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Created At</strong></TableCell>
                    <TableCell><strong>Updated At</strong></TableCell>
                    <TableCell align="center"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staffTypes.map((staff) => (
                    <TableRow key={staff._id} hover>
                      <TableCell>
                        <Typography variant="body1" fontWeight="medium">
                          {staff.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {staff.description || 'No description'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            label={staff.status ? 'Active' : 'Inactive'}
                            color={staff.status ? 'success' : 'default'}
                            size="small"
                          />
                          <Switch
                            size="small"
                            checked={staff.status}
                            onChange={() => handleToggleStatus(staff._id, staff.status, staff.title)}
                            color="success"
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">
                          {formatDate(staff.createdAt)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption">
                          {formatDate(staff.updatedAt)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenEditModal(staff)}
                          title="Edit"
                          size="small"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteClick(staff._id, staff.title)}
                          title="Delete"
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>

      {/* Create/Edit Modal */}
      <Dialog 
        open={modalOpen} 
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              {modalMode === 'create' ? 'Add New Staff Type' : 'Edit Staff Type'}
            </Typography>
            <IconButton onClick={handleCloseModal} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent dividers>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="Title *"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              error={!!errors.title}
              helperText={errors.title}
              margin="normal"
              required
              disabled={modalLoading}
              autoFocus
            />
            
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={4}
              disabled={modalLoading}
              placeholder="Enter a description for this staff type..."
            />
            
            <FormControlLabel
              control={
                <Switch
                  checked={formData.status}
                  onChange={handleInputChange}
                  name="status"
                  color="primary"
                  disabled={modalLoading}
                />
              }
              label={
                <Typography variant="body2">
                  Status: <strong>{formData.status ? 'Active' : 'Inactive'}</strong>
                </Typography>
              }
              sx={{ mt: 2 }}
            />
            
            {modalMode === 'edit' && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Updating this staff type will affect all staff members assigned to this type.
              </Alert>
            )}
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={handleCloseModal}
            disabled={modalLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={modalLoading}
            startIcon={modalLoading ? <CircularProgress size={20} /> : <SaveIcon />}
          >
            {modalLoading 
              ? (modalMode === 'create' ? 'Creating...' : 'Updating...')
              : (modalMode === 'create' ? 'Create Staff Type' : 'Update Staff Type')
            }
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
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            This action cannot be undone. All associated data with this staff type might be affected.
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
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default StaffTypeCreate;