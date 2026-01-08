import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider } from "styled-components";
import { darkTheme } from "../utils/themes";
import MainApp from '../MainApp';

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};
`;

const HeaderContainer = styled.div`
  background: ${({ theme }) => theme.card || '#27293d'};
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderTitle = styled.h1`
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  margin: 0;
  
  @media (max-width: 530px) {
    font-size: 18px;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  
  @media (max-width: 530px) {
    gap: 10px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: ${({ theme }) => theme.text};
  
  @media (max-width: 530px) {
    display: none;
  }
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const UserEmail = styled.span`
  font-size: 12px;
  opacity: 0.7;
`;

const LogoutButton = styled.button`
  padding: 8px 20px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
  
  @media (max-width: 530px) {
    padding: 6px 12px;
    font-size: 12px;
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <HeaderContainer>
          <HeaderTitle>Brain Tumor Detection System</HeaderTitle>
          <UserSection>
            {user && (
              <UserInfo>
                <UserName>{user.name}</UserName>
                <UserEmail>{user.email}</UserEmail>
              </UserInfo>
            )}
            <LogoutButton onClick={handleLogout}>
              Logout
            </LogoutButton>
          </UserSection>
        </HeaderContainer>
        <MainApp />
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;