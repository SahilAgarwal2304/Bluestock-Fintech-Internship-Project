import React, { useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, Grid, Typography, TextField, Paper, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import LinkIcon from '@mui/icons-material/Link';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

// --- REUSABLE UPLOAD COMPONENT (With Preview Logic) ---
const FileUploader = ({ name, label, subtext }) => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const fileInputRef = useRef(null);
  
  // Watch the specific field to show preview
  const fileValue = watch(name);
  const [preview, setPreview] = useState(null);

  // Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue(name, file); // Save file to Hook Form
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl); // Create preview URL
    }
  };

  // Trigger hidden input click
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Remove Image
  const handleRemove = (e) => {
    e.stopPropagation();
    setValue(name, null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      {/* Hidden Real Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* Visual Box */}
      <Box
        onClick={handleClick}
        sx={{
          border: '2px dashed',
          borderColor: errors[name] ? '#d32f2f' : '#E0E0E0',
          borderRadius: 3,
          height: 180,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#FAFAFA',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.2s ease',
          '&:hover': { borderColor: '#1976D2', bgcolor: '#F5F9FF' }
        }}
      >
        {preview ? (
          // --- SHOW IMAGE PREVIEW ---
          <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
            <img 
              src={preview} 
              alt="Preview" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            {/* Remove Button Overlay */}
            <IconButton 
              onClick={handleRemove}
              sx={{ 
                position: 'absolute', 
                top: 5, 
                right: 5, 
                bgcolor: 'rgba(255,255,255,0.8)',
                '&:hover': { bgcolor: 'white', color: 'red' }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ) : (
          // --- SHOW UPLOAD ICON ---
          <>
            <CloudUploadIcon sx={{ fontSize: 40, color: '#9E9E9E', mb: 1 }} />
            <Typography variant="subtitle1" fontWeight="600" color="text.primary">
              {label}
            </Typography>
            <Typography variant="caption" color="text.secondary" align="center" sx={{ px: 2 }}>
              {subtext}
            </Typography>
          </>
        )}
      </Box>
      {/* Validation Error Text */}
      {errors[name] && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1 }}>
          {label} is required
        </Typography>
      )}
    </>
  );
};

const CompanyInfoStep = () => {
  const { register, formState: { errors } } = useFormContext(); 

  return (
    <Box>
      <Typography variant="h5" fontWeight="700" sx={{ mb: 4, color: '#111927' }}>
        Logo & Banner Image
      </Typography>

      <Grid container spacing={4} sx={{ mb: 5 }}>
        {/* LOGO UPLOADER */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Upload Logo <span style={{color:'red'}}>*</span>
          </Typography>
          {/* We register this field manually inside the component */}
          <FileUploader 
            name="logo" 
            label="Browse photo" 
            subtext="Max size 5 MB." 
          />
        </Grid>

        {/* BANNER UPLOADER */}
        <Grid item xs={12} md={8}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Banner Image <span style={{color:'red'}}>*</span>
          </Typography>
          <FileUploader 
            name="banner" 
            label="Browse photo" 
            subtext="1520x400. Max 5 MB." 
          />
        </Grid>
      </Grid>

      {/* --- COMPANY NAME --- */}
      <Box sx={{ mb: 4, maxWidth: '800px' }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          Company name <span style={{ color: 'red' }}>*</span>
        </Typography>
        <TextField 
          fullWidth 
          placeholder="e.g. Jobpilot Inc."
          variant="outlined"
          {...register("companyName", { required: "Company Name is required" })}
          error={!!errors.companyName}
          helperText={errors.companyName?.message}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white' } }}
        />
      </Box>

      {/* --- ABOUT US --- */}
      <Box sx={{ mb: 2, maxWidth: '800px' }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          About Us <span style={{ color: 'red' }}>*</span>
        </Typography>
        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden', borderColor: errors.aboutUs ? '#d32f2f' : 'rgba(0, 0, 0, 0.23)' }}>
          <TextField 
            fullWidth 
            multiline 
            rows={5}
            placeholder="Write down about your company here..."
            variant="standard"
            {...register("aboutUs", { required: "Description is required" })}
            InputProps={{ disableUnderline: true, sx: { p: 2 } }}
          />
          <Box sx={{ borderTop: '1px solid #eee', p: 1, bgcolor: '#f9fafb', display: 'flex', gap: 1 }}>
            <IconButton size="small"><FormatBoldIcon fontSize="small" /></IconButton>
            <IconButton size="small"><FormatItalicIcon fontSize="small" /></IconButton>
            <IconButton size="small"><LinkIcon fontSize="small" /></IconButton>
            <IconButton size="small"><FormatListBulletedIcon fontSize="small" /></IconButton>
          </Box>
        </Paper>
        {errors.aboutUs && <Typography variant="caption" color="error" sx={{ ml: 2 }}>{errors.aboutUs.message}</Typography>}
      </Box>
    </Box>
  );
};

export default CompanyInfoStep;