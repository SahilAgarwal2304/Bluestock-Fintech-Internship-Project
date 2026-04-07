import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, FormProvider } from 'react-hook-form';
import { Box, Container, Typography, Button, Paper, Tabs, Tab } from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { setActiveStep, updateFormData } from '../store/companySlice';
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom'; // For redirecting after save

// --- FIREBASE IMPORTS ---
import { doc, setDoc } from "firebase/firestore"; 
import { db, auth } from "../firebaseConfig"; 

import CompanyInfoStep from '../components/CompanyInfoStep';
import FoundingInfoStep from '../components/FoundingInfoStep';
import SocialMediaStep from '../components/SocialMediaStep';
import ContactStep from '../components/ContactStep';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeStep, formData } = useSelector((state) => state.company);
  
  const methods = useForm({
    defaultValues: formData,
    mode: 'onChange'
  });

  const steps = ['Company Info', 'Founding Info', 'Social Media Profile', 'Contact'];
  const progress = ((activeStep + 1) / 4) * 100;

  // --- HANDLE NEXT / SUBMIT ---
  const handleNext = async (data) => {
    // 1. Save current step data to Redux
    dispatch(updateFormData(data)); 

    // 2. If not the last step, just move next
    if(activeStep < 3) {
      dispatch(setActiveStep(activeStep + 1));
      window.scrollTo(0, 0);
    } else {
      // --- FINAL STEP: SAVE TO FIREBASE ---
      try {
        const fullData = { ...formData, ...data };
        
        // Remove 'logo' and 'banner' file objects (Firestore cannot save files directly)
        // We will just save the text data for now.
        const { logo, banner, ...textDataOnly } = fullData;

        // Get the current user's ID
        const user = auth.currentUser;
        if (!user) {
          toast.error("You must be logged in to save.");
          return;
        }

        // Save to 'companies' collection using the User ID as the document ID
        await setDoc(doc(db, "companies", user.uid), {
          ...textDataOnly,
          updatedAt: new Date(),
          email: user.email // Also save the login email
        });

        toast.success("Profile Saved to Database Successfully!");
        console.log("Saved to Firebase:", textDataOnly);
        
        // Optional: Redirect to a "Success" page or Home
        // navigate('/profile'); 

      } catch (error) {
        console.error("Error saving to Firestore:", error);
        toast.error("Failed to save data. Check console.");
      }
    }
  };

  // Logout Function
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#F5F7FA' }}>
      
      {/* HEADER */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #E0E0E0', py: 2, position: 'sticky', top: 0, zIndex: 10 }}>
        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: '1200px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#1976D2', fontWeight: 'bold', fontSize: '1.25rem' }}>
              <BusinessCenterIcon /> Jobpilot
            </Box>

            <Typography 
              variant="body2" 
              sx={{ cursor: 'pointer', color: '#d32f2f', fontWeight: 'bold', ml: 2 }}
              onClick={handleLogout}
            >
              Logout
            </Typography>
            
            <Box sx={{ width: '300px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" fontWeight="600" color="text.secondary">Setup Progress</Typography>
                <Typography variant="caption" fontWeight="700" color="primary">{Math.round(progress)}% Completed</Typography>
              </Box>
              <Box sx={{ height: 8, bgcolor: '#EEF2F6', borderRadius: 4, overflow: 'hidden' }}>
                <Box sx={{ width: `${progress}%`, height: '100%', bgcolor: '#1976D2', transition: 'width 0.4s ease' }} />
              </Box>
            </Box>

          </Box>
        </Container>
      </Box>

      {/* MAIN FORM */}
      <Container maxWidth="xl" sx={{ mt: 5, mb: 8, display: 'flex', justifyContent: 'center' }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 3, md: 6 }, 
            borderRadius: 3, 
            border: '1px solid #E0E0E0',
            width: '100%',
            maxWidth: '1200px'
          }}
        >
          
          <Tabs 
            value={activeStep} 
            onChange={(_, val) => dispatch(setActiveStep(val))}
            variant="scrollable"
            sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }}
          >
            {steps.map((label, index) => (
              <Tab key={index} label={label} sx={{ textTransform: 'none', fontWeight: 600, fontSize: '0.95rem', mr: 2 }} />
            ))}
          </Tabs>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              
              <Box sx={{ minHeight: 400 }}>
                {activeStep === 0 && <CompanyInfoStep />}
                {activeStep === 1 && <FoundingInfoStep />}
                {activeStep === 2 && <SocialMediaStep />}
                {activeStep === 3 && <ContactStep />} 
              </Box>

              <Box sx={{ mt: 5, pt: 3, borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                {activeStep > 0 && (
                  <Button 
                    variant="outlined" 
                    onClick={() => dispatch(setActiveStep(activeStep - 1))}
                    sx={{ fontWeight: 600, px: 3 }}
                  >
                    Previous
                  </Button>
                )}
                <Button 
                  type="submit"
                  variant="contained" 
                  endIcon={activeStep === 3 ? null : <ArrowForwardIcon />}
                  sx={{ px: 4, py: 1.2, fontWeight: 600 }}
                >
                  {activeStep === 3 ? 'Finish' : 'Save & Next'}
                </Button>
              </Box>

            </form>
          </FormProvider>

        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;