
import React from 'react';

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  gallery: string[];
  year: string;
  has3D?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}
