import { RouterProvider } from 'react-router-dom';
import './App.css';
import { AppRouter } from './app.routing';
import { HeaderComponent } from './core';

function App() {
  return (
    <div className="App">
      <HeaderComponent />

      <RouterProvider router={AppRouter} />
    </div>
  );
}

export default App;
