import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './config/routes';
import './App.css';

// Crear el router
const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;