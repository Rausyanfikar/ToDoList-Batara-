import React from 'react';
import Header from './Header';
import '../styles/App.css';

const Layout = (props) => {
  return (
    <div className="bg-slate-200 w-full h-screen flex flex-col">
      <Header />
      <div className=" w-full h-full ">
        <div className="bg-slate-200">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
