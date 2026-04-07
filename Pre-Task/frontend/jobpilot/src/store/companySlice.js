import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeStep: 0,
  formData: {
    // Step 1
    companyName: '',
    aboutUs: '',
    logo: null,
    banner: null,
    // Step 2
    organizationType: '',
    industryType: '',
    teamSize: '',
    yearOfEstablishment: '',
    website: '',
    vision: '',
    // Step 3 (New) - Initialize with one empty row for better UX
    socialLinks: [
      { platform: 'Facebook', url: '' }
    ],
    // Step 4
    address: '',
    phone: '',
    email: '',
  }
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    }
  }
});

export const { setActiveStep, updateFormData } = companySlice.actions;
export default companySlice.reducer;