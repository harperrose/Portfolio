import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import ProjectList from './components/ProjectList'; // Update path if needed
import './styles/hdpt.css'; // Your moved Webflow CSS goes here

// This is the mock data. Later, this will be replaced by your TinaCMS data fetch!
const MOCK_PROJECTS = [
  { 
    id: 'little-otter', 
    title: 'Provider Pages for Little Otter', 
    image: 'https://cdn.prod.website-files.com/672e7e5e798e20bcafe9482c/69333b04f13c7c55c6ec60a1_LO-opening.jpg', 
    url: '/provider-introductions-for-little-otter', 
    quote: 'Humanising mental-health care through provider introductions.', 
    capabilities: ['Product Design', 'Digital Design'] 
  },
  { 
    id: 'material-bank', 
    title: 'Project Hub for Material Bank', 
    image: 'https://cdn.prod.website-files.com/672e7e5e798e20bcafe9482c/690c3b8153411513357ba719_phone3b.webp', 
    url: '/project-hub-for-material-bank', 
    quote: 'A centralised workspace that lets design teams track samples.', 
    capabilities: ['Product Design', 'Testing and Optimization'] 
  },
  { 
    id: 'sophia-avenue', 
    title: '9413 Sophia Avenue', 
    image: 'https://cdn.prod.website-files.com/672e7e5e798e20bcafe9482c/695e90e3112bbfae4d4f1b39_b3d69c203bf995d9304024852f06ce6b_sophia-mobile.gif', 
    url: '/are-na-powered-site-for-art-grant', 
    quote: 'Architecture, memory, and narrative woven into a single scroll.', 
    capabilities: ['Digital Design', 'Branding & Visual', 'Testing and Optimization', 'Web Development'] 
  },
  { 
    id: 'solace', 
    title: 'A Gratitude Increasing App', 
    image: 'https://cdn.prod.website-files.com/672e7e5e798e20bcafe9482c/6943039228142c2ac88ac27d_c77b023dae628168bf7f0f926b996344_solace-home.jpg', 
    url: '/increasing-gratitude', 
    quote: 'Small daily rituals designed to compound.', 
    capabilities: ['Digital Design', 'Branding & Visual', 'Product Design'] 
  }
];

// Find the root div in your index.html
const rootElement = document.getElementById('root');

if (rootElement) {
  // Render the React application into the DOM
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ProjectList projects={MOCK_PROJECTS} />
    </React.StrictMode>
  );
}