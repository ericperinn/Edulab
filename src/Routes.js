import React from 'react'
import { BrowserRouter as Router, Route, Routes as BrowserRoutes} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import NewPass from './components/NewPass';
import MainPage from './components/MainPage';
import MainPageAdmin from './components/MainPageAdmin';
import CoursePage from './components/CoursePage';

function Routes() {
    return(
        <div>
        <Router>
          <BrowserRoutes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/cadastro" element={<RegisterForm />} />
            <Route path="/novasenha" element={<NewPass/>} />
            <Route path="/mainpage" element={<MainPage/>} />
            <Route path="/mainpageadmin" element={<MainPageAdmin/>} />
            <Route path="/coursepage" element={<CoursePage/>} />
          </BrowserRoutes>
        </Router>
        </div>
    )
}

export default Routes;