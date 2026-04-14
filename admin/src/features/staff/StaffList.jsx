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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardActions,
  Badge,
  Divider,
  Stack,
  Menu
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import './StaffList.css';

const StaffList = () => {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [staffTypes, setStaffTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter states - Image ke jaisa
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Menu states
  const [typeMenuAnchor, setTypeMenuAnchor] = useState(null);
  const [statusMenuAnchor, setStatusMenuAnchor] = useState(null);
  
  // Delete Dialog
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    id: null,
    name: ''
  });

  // Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const API_URL = 'http://localhost:4000/api/staff';
  const STAFF_TYPE_URL = 'http://localhost:4000/api/staff-master';

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterStaff();
  }, [searchTerm, statusFilter, typeFilter, staffList]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [staffResponse, typesResponse] = await Promise.all([
        axios.get(API_URL),
        axios.get(STAFF_TYPE_URL)
      ]);

      let staffData = [];
      if (staffResponse.data && staffResponse.data.success) {
        staffData = staffResponse.data.data || [];
      } else if (Array.isArray(staffResponse.data)) {
        staffData = staffResponse.data;
      }

      let typesData = [];
      if (typesResponse.data && typesResponse.data.success) {
        typesData = typesResponse.data.data || [];
      } else if (Array.isArray(typesResponse.data)) {
        typesData = typesResponse.data;
      }

      setStaffTypes(typesData);
      
      const staffWithDetails = staffData.map((staff, index) => ({
        ...staff,
        fullName: `${staff.firstName || ''} ${staff.lastName || ''}`.trim(),
        initials: `${staff.firstName?.charAt(0) || ''}${staff.lastName?.charAt(0) || ''}`.toUpperCase()
      }));
      
      setStaffList(staffWithDetails);
    } catch (error) {
      console.error('Error fetching data:', error);
      showSnackbar('Failed to load staff data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filterStaff = () => {
    let filtered = [...staffList];
    
    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(staff => 
        staff.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.phoneNumber?.includes(searchTerm)
      );
    }
    
    // Apply status filter - Image ke jaisa
    if (statusFilter !== 'all') {
      filtered = filtered.filter(staff => 
        statusFilter === 'active' ? staff.status === true : staff.status === false
      );
    }
    
    // Apply type filter - Image ke jaisa
    if (typeFilter !== 'all') {
      filtered = filtered.filter(staff => 
        staff.staffType?._id === typeFilter || 
        staff.staffType === typeFilter ||
        staff.staffType?.title === typeFilter
      );
    }
    
    setFilteredStaff(filtered);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleAddClick = () => {
    navigate('/staff/create');
  };

  const handleEditClick = (id) => {
    navigate(`/staff/edit/${id}`);
  };

  const handleDeleteClick = (id, name) => {
    setDeleteDialog({
      open: true,
      id,
      name
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`${API_URL}/${deleteDialog.id}`);
      
      if (response.data && response.data.success) {
        showSnackbar(`Staff "${deleteDialog.name}" deleted successfully!`, 'success');
        await fetchData();
      }
    } catch (error) {
      console.error('Error deleting staff:', error);
      showSnackbar('Failed to delete staff', 'error');
    } finally {
      setDeleteDialog({ open: false, id: null, name: '' });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, id: null, name: '' });
  };

  // Filter handlers - Image ke jaisa
  const handleTypeMenuOpen = (event) => {
    setTypeMenuAnchor(event.currentTarget);
  };

  const handleTypeMenuClose = () => {
    setTypeMenuAnchor(null);
  };

  const handleTypeSelect = (type) => {
    setTypeFilter(type);
    handleTypeMenuClose();
  };

  const handleStatusMenuOpen = (event) => {
    setStatusMenuAnchor(event.currentTarget);
  };

  const handleStatusMenuClose = () => {
    setStatusMenuAnchor(null);
  };

  const handleStatusSelect = (status) => {
    setStatusFilter(status);
    handleStatusMenuClose();
  };

  const clearFilters = () => {
    setTypeFilter('all');
    setStatusFilter('all');
    setSearchTerm('');
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  // Get filter display labels
  const getTypeLabel = () => {
    if (typeFilter === 'all') return 'Type';
    const type = staffTypes.find(t => t._id === typeFilter || t.title === typeFilter);
    return type?.title || 'Type';
  };

  const getStatusLabel = () => {
    if (statusFilter === 'all') return 'Status';
    return statusFilter === 'active' ? 'Active' : 'Inactive';
  };

  // Count active filters
  const activeFilterCount = (typeFilter !== 'all' ? 1 : 0) + (statusFilter !== 'all' ? 1 : 0);

  return (
    <Container maxWidth="xl" sx={{ mt: 3, mb: 4 }}>
      {/* Header Section */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'white', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: '#1e293b' }}>
              Staff Members
            </Typography>
            {staffList.length > 0 && (
              <Chip 
                label={staffList.length}
                size="small"
                sx={{ 
                  bgcolor: '#e46505ff', 
                  color: 'white',
                  fontWeight: 600,
                  height: 24
                }}
              />
            )}
          </Box>
        </Box>

        {/* Search and Filter Row - Image ke jaisa */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search staff members..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#94a3b8' }} />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchTerm('')}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ bgcolor: '#f8fafc' }}
            />
          </Grid>
          
          {/* Type Dropdown - Image ke jaisa */}
          <Grid item xs={6} md={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleTypeMenuOpen}
              endIcon={<ArrowDropDownIcon />}
              sx={{
                borderColor: '#e2e8f0',
                color: '#1e293b',
                textTransform: 'none',
                height: '40px',
                justifyContent: 'space-between',
                bgcolor: typeFilter !== 'all' ? '#eff6ff' : 'white',
                borderWidth: typeFilter !== 'all' ? 2 : 1,
                borderColor: typeFilter !== 'all' ? '#3b82f6' : '#e2e8f0'
              }}
            >
              {getTypeLabel()}
            </Button>
            <Menu
              anchorEl={typeMenuAnchor}
              open={Boolean(typeMenuAnchor)}
              onClose={handleTypeMenuClose}
              PaperProps={{
                sx: { width: 200, maxHeight: 300, mt: 1 }
              }}
            >
              <MenuItem 
                onClick={() => handleTypeSelect('all')}
                selected={typeFilter === 'all'}
                sx={{ fontWeight: typeFilter === 'all' ? 600 : 400 }}
              >
                All Types
              </MenuItem>
              <Divider />
              {staffTypes.map((type) => (
                <MenuItem 
                  key={type._id} 
                  onClick={() => handleTypeSelect(type._id)}
                  selected={typeFilter === type._id}
                  sx={{ fontWeight: typeFilter === type._id ? 600 : 400 }}
                >
                  {type.title}
                </MenuItem>
              ))}
            </Menu>
          </Grid>
          
          {/* Status Dropdown - Image ke jaisa */}
          <Grid item xs={6} md={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleStatusMenuOpen}
              endIcon={<ArrowDropDownIcon />}
              sx={{
                borderColor: '#e2e8f0',
                color: '#1e293b',
                textTransform: 'none',
                height: '40px',
                justifyContent: 'space-between',
                bgcolor: statusFilter !== 'all' ? '#eff6ff' : 'white',
                borderWidth: statusFilter !== 'all' ? 2 : 1,
                borderColor: statusFilter !== 'all' ? '#3b82f6' : '#e2e8f0'
              }}
            >
              {getStatusLabel()}
            </Button>
            <Menu
              anchorEl={statusMenuAnchor}
              open={Boolean(statusMenuAnchor)}
              onClose={handleStatusMenuClose}
              PaperProps={{
                sx: { width: 200, mt: 1 }
              }}
            >
              <MenuItem 
                onClick={() => handleStatusSelect('all')}
                selected={statusFilter === 'all'}
                sx={{ fontWeight: statusFilter === 'all' ? 600 : 400 }}
              >
                All Status
              </MenuItem>
              <Divider />
              <MenuItem 
                onClick={() => handleStatusSelect('active')}
                selected={statusFilter === 'active'}
                sx={{ 
                  fontWeight: statusFilter === 'active' ? 600 : 400,
                  color: '#2e7d32'
                }}
              >
                <FiberManualRecordIcon sx={{ fontSize: 12, color: '#4caf50', mr: 1 }} />
                Active
              </MenuItem>
              <MenuItem 
                onClick={() => handleStatusSelect('inactive')}
                selected={statusFilter === 'inactive'}
                sx={{ 
                  fontWeight: statusFilter === 'inactive' ? 600 : 400,
                  color: '#c62828'
                }}
              >
                <FiberManualRecordIcon sx={{ fontSize: 12, color: '#f44336', mr: 1 }} />
                Inactive
              </MenuItem>
            </Menu>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
              sx={{
                bgcolor: '#e46505ff',
                '&:hover': { bgcolor: '#f5741eff' },
                textTransform: 'none',
                height: '40px'
              }}
            >
              Add
            </Button>
          </Grid>
        </Grid>

        {/* Active Filters Display */}
        {activeFilterCount > 0 && (
          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {typeFilter !== 'all' && (
              <Chip
                label={`Type: ${getTypeLabel()}`}
                onDelete={() => setTypeFilter('all')}
                size="small"
                sx={{ bgcolor: '#f1f5f9' }}
              />
            )}
            {statusFilter !== 'all' && (
              <Chip
                label={`Status: ${getStatusLabel()}`}
                onDelete={() => setStatusFilter('all')}
                size="small"
                sx={{ bgcolor: '#f1f5f9' }}
              />
            )}
            {activeFilterCount > 0 && (
              <Chip
                label="Clear all"
                onClick={clearFilters}
                size="small"
                color="primary"
                variant="outlined"
              />
            )}
          </Box>
        )}
      </Paper>

      {/* Staff Cards Grid */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredStaff.length === 0 ? (
            <Grid item xs={12}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  No staff members found
                </Typography>
                <Button
                  variant="text"
                  startIcon={<AddIcon />}
                  onClick={handleAddClick}
                  sx={{ mt: 1 }}
                >
                  Add your first staff member
                </Button>
              </Paper>
            </Grid>
          ) : (
            filteredStaff.map((staff) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={staff._id}>
                <Card 
                  elevation={2} 
                  sx={{ 
                    borderRadius: 3,
                    position: 'relative',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 8
                    }
                  }}
                >
                  {/* Status Indicator */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      zIndex: 1
                    }}
                  >
                    <FiberManualRecordIcon 
                      sx={{ 
                        fontSize: 14, 
                        color: staff.status ? '#4caf50' : '#f44336',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                      }} 
                    />
                  </Box>

                  <CardContent sx={{ p: 3 }}>
                    {/* Avatar with Initials - Like SG, CS */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: staff.cardColor || '#3b82f6',
                          width: 70,
                          height: 70,
                          fontSize: '1.8rem',
                          fontWeight: 600,
                          mb: 1.5,
                          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                        }}
                      >
                        {staff.initials || getInitials(staff.firstName, staff.lastName)}
                      </Avatar>
                      
                      <Typography variant="h6" sx={{ fontWeight: 600, textAlign: 'center' }}>
                        {staff.fullName || 'N/A'}
                      </Typography>
                      
                      <Chip
                        label={staff.staffType?.title || 'Staff'}
                        size="small"
                        sx={{
                          mt: 0.5,
                          bgcolor: '#f1f5f9',
                          color: '#1e293b',
                          fontWeight: 500,
                          fontSize: '0.75rem'
                        }}
                      />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Contact Information */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <EmailIcon sx={{ fontSize: 18, color: '#64748b' }} />
                        <Typography variant="body2" sx={{ color: '#1e293b', wordBreak: 'break-all' }}>
                          {staff.email || 'N/A'}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <PhoneIcon sx={{ fontSize: 18, color: '#64748b' }} />
                        <Typography variant="body2" sx={{ color: '#1e293b' }}>
                          {staff.phoneNumber || 'N/A'}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>

                  {/* Action Buttons */}
                  <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        onClick={() => handleEditClick(staff._id)}
                        sx={{ 
                          color: '#3b82f6',
                          '&:hover': { bgcolor: '#eff6ff' }
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(staff._id, staff.fullName)}
                        sx={{ 
                          color: '#ef4444',
                          '&:hover': { bgcolor: '#fee2e2' }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}

      {/* Footer Summary */}
      {staffList.length > 0 && (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredStaff.length} of {staffList.length} staff members
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip
              label={`Active: ${staffList.filter(s => s.status).length}`}
              size="small"
              sx={{ bgcolor: '#e8f5e9', color: '#2e7d32' }}
            />
            <Chip
              label={`Inactive: ${staffList.filter(s => !s.status).length}`}
              size="small"
              sx={{ bgcolor: '#ffebee', color: '#c62828' }}
            />
          </Stack>
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={handleDeleteCancel}>
        <DialogTitle>
          <Typography variant="h6" color="error">
            Confirm Delete
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <strong>"{deleteDialog.name}"</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default StaffList;