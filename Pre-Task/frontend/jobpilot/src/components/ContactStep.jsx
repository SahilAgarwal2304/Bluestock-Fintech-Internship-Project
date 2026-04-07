import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Box, Typography, TextField } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const ContactStep = () => {
  const { register, control, formState: { errors } } = useFormContext();

  return (
    <Box>
      <Typography variant="h5" fontWeight="700" sx={{ mb: 4, color: '#111927' }}>Contact</Typography>

      <Box sx={{ maxWidth: '800px' }}>
        
        {/* Address */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Map Location <span style={{color:'red'}}>*</span>
          </Typography>
          <TextField 
            fullWidth 
            placeholder="Search for your location..."
            variant="outlined"
            {...register("address", { required: "Address is required" })}
            error={!!errors.address}
            helperText={errors.address?.message}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white' } }}
          />
        </Box>

        {/* Phone (With Controller Validation) */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Phone <span style={{color:'red'}}>*</span>
          </Typography>
          <Controller
            name="phone"
            control={control}
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <PhoneInput 
                {...field}
                country={'in'}
                specialLabel=""
                inputStyle={{
                  width: '100%',
                  height: '56px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  // DYNAMIC RED BORDER IF ERROR
                  border: errors.phone ? '1px solid #d32f2f' : '1px solid #c4c4c4',
                  backgroundColor: 'white'
                }}
                buttonStyle={{
                  borderRadius: '8px 0 0 8px',
                  border: errors.phone ? '1px solid #d32f2f' : '1px solid #c4c4c4',
                  backgroundColor: 'white'
                }}
              />
            )}
          />
          {errors.phone && (
            <Typography variant="caption" color="error" sx={{ ml: 2, mt: 0.5 }}>
              {errors.phone.message}
            </Typography>
          )}
        </Box>

        {/* Email */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Email <span style={{color:'red'}}>*</span>
          </Typography>
          <TextField 
            fullWidth 
            type="email"
            placeholder="email@company.com"
            variant="outlined"
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'white' } }}
          />
        </Box>

      </Box>
    </Box>
  );
};

export default ContactStep;