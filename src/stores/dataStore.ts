import { create } from 'zustand';
import type { Testimonial } from '../types';
import { fetchTestimonials } from '@/services';

interface DataState {
  testimonials: Testimonial[];
  isLoading: boolean;
  error: string | null;
  loadTestimonials: () => Promise<void>;
}

export const useDataStore = create<DataState>((set) => ({
  testimonials: [],
  isLoading: false,
  error: null,

  loadTestimonials: async () => {
    set({ isLoading: true, error: null });

    try {
      const testimonials = await fetchTestimonials();
      set({ testimonials, isLoading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Failed to load testimonials:', errorMessage);
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },
}));
