import React, { useState } from 'react';
import { 
  Box, Button, Grid, TextField, Typography, Link, Checkbox, FormControlLabel, CircularProgress 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 

// 1. Import Firebase Auth
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; 

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Get email and password from form (using name attribute)
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      // 2. Call Firebase Login
      await signInWithEmailAndPassword(auth, email, password);
      
      toast.success("Login Successful!");
      navigate('/dashboard'); 
    } catch (error) {
      // Handle Errors (Wrong password, user not found)
      console.error(error);
      toast.error("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Grid container sx={{ height: '100%' }}>
        
        {/* LEFT SIDE (Gradient) */}
        <Grid item xs={0} md={6} sx={{ background: 'linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)', display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'white' }}>
          <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>Jobpilot</Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>Find the perfect candidate today.</Typography>
        </Grid>

        {/* RIGHT SIDE (Form) */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'white' }}>
          <Box component="form" onSubmit={handleLogin} sx={{ width: '100%', maxWidth: 450, p: 4 }}>
            
            <Typography variant="h4" fontWeight="700" sx={{ mb: 1, color: '#111927' }}>Login as a Company</Typography>
            <Typography variant="body1" sx={{ mb: 5, color: '#666' }}>Enter your credentials to access the dashboard.</Typography>

            <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1 }}>Email Address</Typography>
            <TextField 
              name="email" 
              fullWidth placeholder="admin@jobpilot.com" variant="outlined" required type="email"
              sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            <Typography variant="subtitle2" fontWeight="600" sx={{ mb: 1 }}>Password</Typography>
            <TextField 
              name="password" 
              fullWidth type="password" placeholder="••••••••" variant="outlined" required
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
               <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
               <Link href="#" underline="hover" sx={{ fontWeight: 600, color: '#1976D2' }}>Forgot Password?</Link>
            </Box>

            <Button 
              type="submit" fullWidth variant="contained" size="large"
              disabled={loading} // Disable button while loading
              sx={{ bgcolor: '#4F46E5', borderRadius: 2, py: 1.5, mb: 3, fontWeight: 600, '&:hover': { bgcolor: '#4338CA' } }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>

            <Typography variant="body2" align="center" color="text.secondary">
              (Testing? Create a user in Firebase Console first)
            </Typography>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;