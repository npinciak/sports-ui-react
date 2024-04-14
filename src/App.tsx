import { RouterProvider } from 'react-router-dom';
import './App.css';
import { AppRouter } from './app.routing';
import { HeaderComponent } from './core';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <div className="mx-5 overflow-auto">
        <RouterProvider router={AppRouter} />
      </div>
    </div>
  );
}

export default App;
