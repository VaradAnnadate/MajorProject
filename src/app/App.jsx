import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { DemoLearnerProvider } from '../context/DemoLearnerContext';

export default function App() {
  return (
    <DemoLearnerProvider>
      <RouterProvider router={router} />
    </DemoLearnerProvider>
  );
}

