import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Activity from '../pages/Activity';
import HomePage from '../pages/HomePage';

const Rot = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activity/:activity_id" element={<Activity />} />
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Rot;
