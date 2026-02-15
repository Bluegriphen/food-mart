import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Divider,
  Breadcrumbs,
  Link,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment,
  IconButton,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import InfoIcon from '@mui/icons-material/Info';
import './StaffForm.css';

const CreateStaff = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    staffType: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    },
    joiningDate: null,
    gender: '',
    about: '',
    cardColor: '#3b82f6',
    pinCode: '',
    status: true
  });

  // Staff types for dropdown
  const [staffTypes, setStaffTypes] = useState([]);
  
  // Validation errors
  const [errors, setErrors] = useState({});
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);
  
  // Snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const API_URL = 'http://localhost:4000/api/staff';
  const STAFF_TYPE_URL = 'http://localhost:4000/api/staff-master';

  // Fetch staff types and staff data if edit mode
  useEffect(() => {
    fetchStaffTypes();
    if (isEditMode) {
      fetchStaffData();
    }
  }, [id]);

  const fetchStaffTypes = async () => {
    try {
      const response = await axios.get(STAFF_TYPE_URL);
      if (Array.isArray(response.data)) {
        setStaffTypes(response.data);
      } else if (response.data && response.data.data) {
        setStaffTypes(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching staff types:', error);
      showSnackbar('Failed to load staff types', 'error');
    }
  };

  const fetchStaffData = async () => {
    try {
      setFetchLoading(true);
      const response = await axios.get(`${API_URL}/${id}`);
      
      let staffData = {};
      if (response.data && response.data.success) {
        staffData = response.data.data;
      } else if (response.data) {
        staffData = response.data;
      }

      // Format date for DatePicker
      if (staffData.joiningDate) {
        staffData.joiningDate = new Date(staffData.joiningDate);
      }

      setFormData(staffData);
    } catch (error) {
      console.error('Error fetching staff data:', error);
      showSnackbar('Failed to load staff data', 'error');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested address fields
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      joiningDate: date
    }));
    if (errors.joiningDate) {
      setErrors(prev => ({ ...prev, joiningDate: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Personal Info
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    // Email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Phone
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }

    // Staff Type
    if (!formData.staffType) newErrors.staffType = 'Staff type is required';

    // Address
    if (!formData.address.street.trim()) newErrors['address.street'] = 'Street is required';
    if (!formData.address.city.trim()) newErrors['address.city'] = 'City is required';
    if (!formData.address.state.trim()) newErrors['address.state'] = 'State is required';
    if (!formData.address.zipCode.trim()) newErrors['address.zipCode'] = 'ZIP code is required';

    // Joining Date
    if (!formData.joiningDate) newErrors.joiningDate = 'Joining date is required';

    // Gender
    if (!formData.gender) newErrors.gender = 'Gender is required';

    // PIN Code
    if (!formData.pinCode.trim()) {
      newErrors.pinCode = 'PIN code is required';
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'PIN code must be 6 digits';
    }

    // Card Color
    if (!formData.cardColor.trim()) {
      newErrors.cardColor = 'Card color is required';
    } else if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(formData.cardColor)) {
      newErrors.cardColor = 'Invalid color code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        joiningDate: formData.joiningDate.toISOString()
      };

      let response;
      if (isEditMode) {
        response = await axios.put(`${API_URL}/${id}`, payload);
      } else {
        response = await axios.post(API_URL, payload);
      }

      if (response.status === 200 || response.status === 201) {
        showSnackbar(
          isEditMode ? 'Staff updated successfully!' : 'Staff created successfully!',
          'success'
        );
        setTimeout(() => {
          navigate('/staff');
        }, 2000);
      }
    } catch (error) {
      console.error('Error saving staff:', error);
      let errorMessage = error.response?.data?.message || 'Failed to save staff';
      showSnackbar(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (fetchLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
        {/* Breadcrumb */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link 
            color="inherit" 
            href="#" 
            onClick={(e) => { e.preventDefault(); navigate('/staff'); }}
            sx={{ cursor: 'pointer' }}
          >
            Staff Management
          </Link>
          <Typography color="text.primary">
            {isEditMode ? 'Edit Staff' : 'Add New Staff'}
          </Typography>
        </Breadcrumbs>

        {/* Form Card */}
        <Card elevation={3} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                {isEditMode ? 'Edit Staff Member' : 'Add New Staff Member'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fill in the details to {isEditMode ? 'update' : 'add'} a staff member
              </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Personal Information */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon /> Personal Information
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="First Name *"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    disabled={loading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Last Name *"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    disabled={loading}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email *"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    disabled={loading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number *"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    disabled={loading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Staff Type */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors.staffType}>
                    <InputLabel>Staff Type *</InputLabel>
                    <Select
                      name="staffType"
                      value={formData.staffType}
                      onChange={handleInputChange}
                      label="Staff Type *"
                      disabled={loading}
                      startAdornment={
                        <InputAdornment position="start">
                          <WorkIcon />
                        </InputAdornment>
                      }
                    >
                      {staffTypes.map((type) => (
                        <MenuItem key={type._id} value={type._id}>
                          {type.title}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.staffType && <FormHelperText>{errors.staffType}</FormHelperText>}
                  </FormControl>
                </Grid>

                {/* Joining Date */}
                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Joining Date *"
                    value={formData.joiningDate}
                    onChange={handleDateChange}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.joiningDate,
                        helperText: errors.joiningDate,
                        disabled: loading
                      }
                    }}
                  />
                </Grid>

                {/* Gender */}
                <Grid item xs={12} md={6}>
                  <FormControl component="fieldset" error={!!errors.gender}>
                    <FormLabel component="legend">Gender *</FormLabel>
                    <RadioGroup
                      row
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <FormControlLabel value="Male" control={<Radio />} label="Male" />
                      <FormControlLabel value="Female" control={<Radio />} label="Female" />
                      <FormControlLabel value="Other" control={<Radio />} label="Other" />
                    </RadioGroup>
                    {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                  </FormControl>
                </Grid>

                {/* Address Section */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HomeIcon /> Address
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Street Address *"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleInputChange}
                    error={!!errors['address.street']}
                    helperText={errors['address.street']}
                    disabled={loading}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="City *"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleInputChange}
                    error={!!errors['address.city']}
                    helperText={errors['address.city']}
                    disabled={loading}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="State *"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleInputChange}
                    error={!!errors['address.state']}
                    helperText={errors['address.state']}
                    disabled={loading}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="ZIP Code *"
                    name="address.zipCode"
                    value={formData.address.zipCode}
                    onChange={handleInputChange}
                    error={!!errors['address.zipCode']}
                    helperText={errors['address.zipCode']}
                    disabled={loading}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="address.country"
                    value={formData.address.country}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                </Grid>

                {/* Additional Info */}
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mb: 2, mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <InfoIcon /> Additional Information
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="PIN Code (6 digits) *"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    error={!!errors.pinCode}
                    helperText={errors.pinCode}
                    disabled={loading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Card Color *"
                    name="cardColor"
                    value={formData.cardColor}
                    onChange={handleInputChange}
                    error={!!errors.cardColor}
                    helperText={errors.cardColor}
                    disabled={loading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ColorLensIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Box
                            sx={{
                              width: 24,
                              height: 24,
                              borderRadius: 1,
                              bgcolor: formData.cardColor,
                              border: '1px solid #ccc'
                            }}
                          />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="About Staff"
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    placeholder="Enter description, skills, experience..."
                    disabled={loading}
                  />
                </Grid>

                {/* Action Buttons */}
                <Grid item xs={12}>
                  <CardActions sx={{ p: 0, justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/staff')}
                      disabled={loading}
                      startIcon={<ArrowBackIcon />}
                      sx={{ borderRadius: 2, px: 3 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                      sx={{
                        bgcolor: '#3b82f6',
                        '&:hover': { bgcolor: '#2563eb' },
                        borderRadius: 2,
                        px: 4
                      }}
                    >
                      {loading ? 'Saving...' : (isEditMode ? 'Update Staff' : 'Save Staff')}
                    </Button>
                  </CardActions>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>

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
    </LocalizationProvider>
  );
};

export default CreateStaff;