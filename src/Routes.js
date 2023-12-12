import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import NewPass from './components/NewPass';
import MainPage from './components/MainPage';
import MainPageAdmin from './components/MainPageAdmin';
import CoursePage from './components/CoursePage';
import DetailedCourse from './components/DetailedCourse';
import { getAuth } from 'firebase/auth';

function AppRoutes() {

  function SecureRoute({ element: Component }) {
    if (!getAuth().currentUser) {
      // Usar o componente Navigate para redirecionar para /app
      return <Navigate to="/app" replace />;
    } else {
      return <Component />;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/app" element={<LoginForm />} />
      <Route path="/app/cadastro" element={<RegisterForm />} />
      <Route path="/app/novasenha" element={<NewPass />} />
      <Route
        path="/app/mainpage"
        element={<SecureRoute element={MainPage} />}
      />
      <Route
        path="/app/coursepage"
        element={<SecureRoute element={CoursePage} />}
      />
      <Route
        path="/app/course/:id"
        element={<SecureRoute element={DetailedCourse} />}
      />
      <Route
        path="/app/mainpageadmin"
        element={<SecureRoute element={MainPageAdmin} />}
      />
    </Routes>
  );
}

export default AppRoutes;
