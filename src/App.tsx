import Container from '@mui/material/Container';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { AppRouter } from './app.routing';
import { HeaderComponent } from './core';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <Container maxWidth="xl">
        <RouterProvider router={AppRouter} />
      </Container>
    </div>
  );
}

export default App;
