import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface Experience {
  company: string;
  position: string;
  duration: string;
}

interface JobFormState {
  personalInfo: PersonalInfo;
  experience: Experience;
  setPersonalInfo: (info: PersonalInfo) => void;
  setExperience: (exp: Experience) => void;
  resetForm: () => void;
  isStep1Complete: () => boolean;
  isStep2Complete: () => boolean;
}

export const useJobFormStore = create<JobFormState>()(
  persist(
    (set, get) => ({
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      experience: {
        company: '',
        position: '',
        duration: '',
      },
      setPersonalInfo: (info) => set({ personalInfo: info }),
      setExperience: (exp) => set({ experience: exp }),
      resetForm: () =>
        set({
          personalInfo: { firstName: '', lastName: '', email: '', phone: '' },
          experience: { company: '', position: '', duration: '' },
        }),
      isStep1Complete: () => {
        const { personalInfo } = get();
        return (
          personalInfo.firstName !== '' &&
          personalInfo.lastName !== '' &&
          personalInfo.email !== '' &&
          personalInfo.phone !== ''
        );
      },
      isStep2Complete: () => {
        const { experience } = get();
        return (
          experience.company !== '' &&
          experience.position !== '' &&
          experience.duration !== ''
        );
      },
    }),
    {
      name: 'job-form-storage',
    }
  )
);
