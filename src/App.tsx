import LoginForm from './features/Authentication/AuthForms/Login.component';
import RegisterForm from './features/Authentication/AuthForms/Register.component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './features/HomePage/HomePage.component';
import NavBar from './app/common/components/Nav';
import { useEffect, useState } from 'react';
import { baseUrl, AUTH_ENDPOINTS } from './app/common/constants/url.constants';
import { PrivateRoute } from './app/common/components/PrivateRoute';
import CalculationHistory from './features/History/History.component';
import { FRONTEND_ROUTES } from './app/common/constants/frontend-routes.constants';

function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    (async () => {
      const response = await fetch(baseUrl + AUTH_ENDPOINTS.GET_USER, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const content = await response.json();
      setUsername(content.userName);
    }
    )();
  });

  return (
      <div className="App">
        <NavBar userName={username} setUserName={setUsername} />

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PrivateRoute />}>
              <Route index path={FRONTEND_ROUTES.HOME} element={<HomePage userName={username} />} />
              <Route index path={FRONTEND_ROUTES.HISTORY} element={<CalculationHistory />} />
            </Route>
            <Route path={FRONTEND_ROUTES.LOGIN} Component={() => <LoginForm setUserName={setUsername} />} />
            <Route path={FRONTEND_ROUTES.REGISTER} Component={RegisterForm} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
