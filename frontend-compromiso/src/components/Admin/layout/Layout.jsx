// Layout.jsx
import React from 'react';
import SidebarAdministrator from './SidebarAdministrator';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <SidebarAdministrator />
      <main style={{ flex: 1, padding: '20px' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
