// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from './AuthProvider.component';
// import { useEffect, useState } from 'react';
// import { AUTH_ENDPOINTS, baseUrl } from '../constants/url.constants';

// export function PrivateRoute() {
//   // const { user } = useAuth() as any;
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const response = await fetch(baseUrl + AUTH_ENDPOINTS.GET_USER, {
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//       });

//       const content = await response.json();
//       console.log(content);
//       setUser(content);
//       console.log(user);
//     })();
//   }, [user]);

//   return user ? <Outlet /> : <Navigate to="/login" replace />;
// }

import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AUTH_ENDPOINTS, baseUrl } from '../constants/url.constants';
import { Space, Spin } from 'antd';

export function PrivateRoute() {
  // const { user } = useAuth() as any;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(baseUrl + AUTH_ENDPOINTS.GET_USER, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.ok) {
          const content = await response.json();
          console.log(content);
          setUser(content);
          setLoading(false);
        } else {
          console.error('Failed to fetch user data');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Space size="middle">
          <Spin size="large" />
        </Space>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
