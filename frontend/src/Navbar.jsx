import React from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Navbar = ({ onLogout, user }) => {
  // Dropdown menu for future extensibility (e.g., profile, logout)
  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={onLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        height: 64,
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ fontWeight: 'bold', fontSize: 22 }}>Green Guard</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {user && (
          <>
            <span>
              Welcome, {user.username} ({user.role})
            </span>
            <Dropdown overlay={menu} placement="bottomRight">
              <Avatar
                style={{ backgroundColor: '#87d068', cursor: 'pointer' }}
                size="large"
              >
                {user.username
                  ? user.username[0].toUpperCase()
                  : <UserOutlined />}
              </Avatar>
            </Dropdown>
          </>
        )}
        {!user && (
          <Avatar
            style={{ backgroundColor: '#f56a00', cursor: 'pointer' }}
            size="large"
            icon={<UserOutlined />}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
