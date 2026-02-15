import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Alert,
  Snackbar,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Divider,
  Breadcrumbs,
  Link,
  FormControlLabel,
  Switch
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DescriptionIcon from '@mui/icons-material/Description';
import TitleIcon from '@mui/icons-material/Title';

const CreateStaffType = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',  // Changed from staffType to title (to match backend)
    description: '',
    status: true  // Added status field
  });
  
  // Validation errors
  const [errors, setErrors] = useState({});
  
  // Loading state
  const [loading, setLoading] = useState(false);
  
  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // API URL - match with your backend
  const API_URL = 'http://localhost:4000/api/staff-master';

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Staff type is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // API call to save staff type
      const response = await axios.post(API_URL, {
        title: formData.title.trim(),
        description: formData.description.trim(),
        status: formData.status
      });
      
      // Check if request was successful
      if (response.status === 201 || response.status === 200) {
        setSnackbar({
          open: true,
          message: 'Staff type created successfully!',
          severity: 'success'
        });
        
        // Redirect back to staff master after 2 seconds
        setTimeout(() => {
          navigate('/staff-master');
        }, 2000);
      } else {
        throw new Error(response.data?.message || 'Failed to create staff type');
      }
      
    } catch (error) {
      console.error('Error creating staff type:', error);
      
      let errorMessage = 'Failed to create staff type';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    navigate('/staff-master');
  };

  // Handle snackbar close
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 3, mb: 4 }}>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link 
          color="inherit" 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigate('/staff-master'); }}
          sx={{ 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.5,
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Staff Master
        </Link>
        <Typography color="text.primary">Add New Staff Type</Typography>
      </Breadcrumbs>

      {/* Main Form Card */}
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ 
              fontWeight: 600, 
              color: '#1e293b',
              fontSize: { xs: '1.75rem', sm: '2rem' }
            }}>
              Add New Staff Type
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Create a new staff type to categorize your team members
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Staff Type Field */}
            <TextField
              fullWidth
              label="Staff Type *"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              error={!!errors.title}
              helperText={errors.title}
              placeholder="Enter staff type (e.g., Waiter, Chef, Manager...)"
              disabled={loading}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <TitleIcon sx={{ mr: 1, color: '#94a3b8' }} />
                ),
              }}
            />

            {/* Description Field */}
            <TextField
              fullWidth
              label="Description *"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={5}
              placeholder="Enter detailed description of this staff type's responsibilities, duties, and requirements..."
              disabled={loading}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <DescriptionIcon sx={{ 
                    mr: 1, 
                    color: '#94a3b8', 
                    alignSelf: 'flex-start', 
                    mt: 1.5 
                  }} />
                ),
              }}
            />

            {/* Character count */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Typography 
                variant="caption" 
                color={formData.description.length < 10 ? 'error' : 'text.secondary'}
              >
                {formData.description.length} characters (minimum 10)
              </Typography>
            </Box>

            {/* Status Switch */}
            <FormControlLabel
              control={
                <Switch
                  checked={formData.status}
                  onChange={handleInputChange}
                  name="status"
                  color="primary"
                  disabled={loading}
                />
              }
              label={
                <Typography variant="body2">
                  Status: <strong>{formData.status ? 'Active' : 'Inactive'}</strong>
                </Typography>
              }
              sx={{ mb: 3 }}
            />

            {/* Info Box */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2.5, 
                bgcolor: '#f8fafc', 
                borderRadius: 2,
                border: '1px solid #e2e8f0',
                mb: 3
              }}
            >
              <Typography variant="body2" color="text.secondary">
                <strong>📝 Note:</strong> Staff types help you organize your team members. 
                Each staff type can have multiple staff members assigned to it.
                {formData.status ? ' This staff type will be active immediately.' : ' This staff type will be created as inactive.'}
              </Typography>
            </Paper>

            {/* Action Buttons */}
            <CardActions sx={{ 
              p: 0, 
              justifyContent: 'flex-end', 
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={loading}
                startIcon={<ArrowBackIcon />}
                sx={{ 
                  borderRadius: 2, 
                  px: 3,
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !formData.title.trim() || !formData.description.trim()}
                startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                sx={{
                  bgcolor: '#3b82f6',
                  '&:hover': { bgcolor: '#2563eb' },
                  '&:disabled': { bgcolor: '#94a3b8' },
                  borderRadius: 2,
                  px: 4,
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                {loading ? 'Saving...' : 'Save Staff Type'}
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>

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

export default CreateStaffType;