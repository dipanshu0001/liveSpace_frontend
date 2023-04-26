import React from 'react';
import NavBar from './Navbar';
import { Outlet } from 'react-router';
import Footer from './Footer';

export default  () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer/>
    </>
  );
};