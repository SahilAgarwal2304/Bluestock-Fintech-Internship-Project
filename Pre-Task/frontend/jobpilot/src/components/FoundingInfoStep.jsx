import React from 'react';
import { useFormContext } from 'react-hook-form';
import { 
  Box, Grid, Typography, TextField, MenuItem, Paper, InputAdornment, IconButton 
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const FoundingInfoStep = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Box>
      <Typography variant="h5" fontWeight="700" sx={{ mb: 4, color: '#111927' }}>
        Founding Info
      </Typography>

      {/* ROW 1: Dropdowns */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        
        {/* Organization Type */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Organization Type <span style={{color:'red'}}>*</span>
          </Typography>
          <TextField 
            select 
            fullWidth 
            defaultValue=""
            {...register("organizationType", { required: "Select a type" })}
            error={!!errors.organizationType}
            helperText={errors.organizationType?.message}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white' } }}
          >
            <MenuItem value="" disabled>Select...</MenuItem>
            <MenuItem value="private">Private Limited</MenuItem>
            <MenuItem value="public">Public Limited</MenuItem>
            <MenuItem value="llp">LLP</MenuItem>
          </TextField>
        </Grid>

        {/* Industry Type */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Industry Types <span style={{color:'red'}}>*</span>
          </Typography>
          <TextField 
            select 
            fullWidth 
            defaultValue=""
            {...register("industryType", { required: "Select industry" })}
            error={!!errors.industryType}
            helperText={errors.industryType?.message}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white' } }}
          >
            <MenuItem value="" disabled>Select...</MenuItem>
            <MenuItem value="tech">Technology</MenuItem>
            <MenuItem value="health">Healthcare</MenuItem>
            <MenuItem value="finance">Finance</MenuItem>
          </TextField>
        </Grid>

        {/* Team Size */}
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Team Size <span style={{color:'red'}}>*</span>
          </Typography>
          <TextField 
            select 
            fullWidth 
            defaultValue=""
            {...register("teamSize", { required: "Select size" })}
            error={!!errors.teamSize}
            helperText={errors.teamSize?.message}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white' } }}
          >
            <MenuItem value="" disabled>Select...</MenuItem>
            <MenuItem value="1-10">1-10 Employees</MenuItem>
            <MenuItem value="11-50">11-50 Employees</MenuItem>
            <MenuItem value="50+">50+ Employees</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {/* ROW 2: Date & Website */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        
        {/* Date */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Year of Establishment <span style={{color:'red'}}>*</span>
          </Typography>
          <TextField 
            fullWidth 
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register("yearOfEstablishment", { required: "Date is required" })}
            error={!!errors.yearOfEstablishment}
            helperText={errors.yearOfEstablishment?.message}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white' } }}
          />
        </Grid>

        {/* Website (URL Validation) */}
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Company Website</Typography>
          <TextField 
            fullWidth 
            placeholder="https://..."
            {...register("website", { 
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: "Enter a valid URL"
              }
            })}
            error={!!errors.website}
            helperText={errors.website?.message}
            InputProps={{
              startAdornment: <InputAdornment position="start"><LinkIcon sx={{ color: '#9E9E9E' }} /></InputAdornment>,
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white' } }}
          />
        </Grid>
      </Grid>

      {/* ROW 3: Vision (Required) */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
          Company Vision <span style={{color:'red'}}>*</span>
        </Typography>
        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden', borderColor: errors.vision ? '#d32f2f' : 'rgba(0, 0, 0, 0.23)' }}>
          <TextField 
            fullWidth 
            multiline 
            rows={5}
            placeholder="Tell us about your company vision..."
            variant="standard"
            {...register("vision", { required: "Vision is required" })}
            InputProps={{ disableUnderline: true, sx: { p: 2 } }}
          />
          <Box sx={{ borderTop: '1px solid #eee', p: 1, bgcolor: '#f9fafb', display: 'flex', gap: 1 }}>
            <IconButton size="small"><FormatBoldIcon fontSize="small" /></IconButton>
            <IconButton size="small"><FormatItalicIcon fontSize="small" /></IconButton>
            <IconButton size="small"><LinkIcon fontSize="small" /></IconButton>
            <IconButton size="small"><FormatListBulletedIcon fontSize="small" /></IconButton>
          </Box>
        </Paper>
        {errors.vision && <Typography variant="caption" color="error" sx={{ml:1}}>{errors.vision.message}</Typography>}
      </Box>

    </Box>
  );
};

export default FoundingInfoStep;