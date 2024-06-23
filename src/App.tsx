import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import './App.css';
import { HeaderComponent } from './core';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
