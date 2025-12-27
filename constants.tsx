
import React from 'react';
import { Project, Service, Testimonial } from './types';

export const SERVICES: Service[] = [
  {
    id: 'res',
    title: 'Residential Architecture',
    description: 'Bespoke homes designed for modern living, blending sustainable technology with timeless aesthetics.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
  {
    id: 'com',
    title: 'Commercial Infrastructure',
    description: 'High-performance workspace and retail environments that inspire productivity and brand excellence.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    id: 'ind',
    title: 'Industrial Solutions',
    description: 'Logistics hubs and manufacturing facilities optimized for operational efficiency and structural durability.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.673.337a4 4 0 01-2.586.344l-2.387-.477a2 2 0 00-1.022.547l-2.387 2.387a2 2 0 000 2.828l.673.673a2 2 0 002.828 0l2.387-2.387a2 2 0 011.022-.547l2.387-.477a6 6 0 013.86.517l.673.337a4 4 0 002.586.344l2.387-.477a2 2 0 011.022.547l2.387 2.387a2 2 0 010 2.828l-.673.673a2 2 0 01-2.828 0l-2.387-2.387z" />
      </svg>
    )
  },
  {
    id: 'ren',
    title: 'Structural Renovation',
    description: 'Revitalizing historic landmarks with modern engineering while preserving their cultural significance.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'The Obsidian Tower',
    category: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1545333297-3045f479bb4c?q=80&w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
      'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=1200'
    ],
    year: '2023',
    has3D: true
  },
  {
    id: '2',
    title: 'Minimalist Canyon Villa',
    category: 'Residential',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687940-4e7a6a3530e9?q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200'
    ],
    year: '2022',
    has3D: true
  },
  {
    id: '3',
    title: 'Zenith Corporate Hub',
    category: 'Infrastructure',
    imageUrl: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1200',
      'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1200',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200'
    ],
    year: '2024'
  },
  {
    id: '4',
    title: 'Greenline Tech Park',
    category: 'Commercial',
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200',
      'https://images.unsplash.com/photo-1513584684374-8bdb74838a0f?q=80&w=1200'
    ],
    year: '2023'
  },
  {
    id: '5',
    title: 'Heritage Lofts',
    category: 'Renovation',
    imageUrl: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1513584684374-8bdb74838a0f?q=80&w=1200',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200',
      'https://images.unsplash.com/photo-1513584684374-8bdb74838a0f?q=80&w=1200'
    ],
    year: '2021'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Eleanor Vance',
    role: 'Managing Director',
    company: 'Skyline Ventures',
    text: 'Structura delivered our flagship office 2 months ahead of schedule with unparalleled attention to detail.',
    avatar: 'https://i.pravatar.cc/150?u=eleanor'
  },
  {
    id: 't2',
    name: 'Marcus Thorne',
    role: 'Principal Architect',
    company: 'Thorne & Co',
    text: 'Their technical capability in realizing complex structural geometries is the best in the industry.',
    avatar: 'https://i.pravatar.cc/150?u=marcus'
  }
];
