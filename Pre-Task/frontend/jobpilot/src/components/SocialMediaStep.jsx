import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Box, Grid, Typography, TextField, MenuItem, Button, IconButton, InputAdornment } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// ... import your icons (FacebookIcon, etc.) ...
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';

const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Facebook': return <FacebookIcon sx={{ color: '#1877F2' }} />;
      case 'Twitter': return <TwitterIcon sx={{ color: '#1DA1F2' }} />;
      case 'Instagram': return <InstagramIcon sx={{ color: '#E4405F' }} />;
      case 'YouTube': return <YouTubeIcon sx={{ color: '#FF0000' }} />;
      case 'LinkedIn': return <LinkedInIcon sx={{ color: '#0A66C2' }} />;
      case 'GitHub': return <GitHubIcon sx={{ color: '#000000' }} />;
      default: return <LinkIcon sx={{ color: '#666' }} />;
    }
};

const SocialMediaStep = () => {
  const { register, control, watch, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: "socialLinks" });

  return (
    <Box>
      <Typography variant="h5" fontWeight="700" sx={{ mb: 4, color: '#111927' }}>Social Media Profile</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {fields.map((field, index) => {
          const currentPlatform = watch(`socialLinks.${index}.platform`);
          // Access error safely for dynamic fields
          const fieldError = errors.socialLinks?.[index]?.url;

          return (
            <Box key={field.id}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Social Link {index + 1}</Typography>
              <Grid container spacing={2} alignItems="flex-start">
                
                {/* Platform */}
                <Grid item xs={12} md={4}>
                  <TextField 
                    select fullWidth 
                    {...register(`socialLinks.${index}.platform`)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white' } }}
                    InputProps={{ startAdornment: <InputAdornment position="start">{getPlatformIcon(currentPlatform)}</InputAdornment> }}
                  >
                    <MenuItem value="Facebook">Facebook</MenuItem>
                    <MenuItem value="Twitter">Twitter</MenuItem>
                    <MenuItem value="Instagram">Instagram</MenuItem>
                    <MenuItem value="YouTube">YouTube</MenuItem>
                    <MenuItem value="LinkedIn">LinkedIn</MenuItem>
                    <MenuItem value="GitHub">GitHub</MenuItem>
                  </TextField>
                </Grid>

                {/* URL with Validation */}
                <Grid item xs={10} md={7}>
                  <TextField 
                    fullWidth 
                    placeholder="Profile link..."
                    {...register(`socialLinks.${index}.url`, { 
                       required: "URL is required",
                       pattern: { value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, message: "Invalid URL" }
                    })}
                    error={!!fieldError}
                    helperText={fieldError?.message}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white' } }}
                  />
                </Grid>

                {/* Remove */}
                <Grid item xs={2} md={1} sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <IconButton onClick={() => remove(index)} color="default"><HighlightOffIcon /></IconButton>
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </Box>

      <Button
        fullWidth variant="outlined" startIcon={<AddCircleOutlineIcon />}
        onClick={() => append({ platform: 'Facebook', url: '' })}
        sx={{ mt: 4, py: 2, borderStyle: 'dashed', borderWidth: 2 }}
      >
        Add New Social Link
      </Button>
    </Box>
  );
};

export default SocialMediaStep;