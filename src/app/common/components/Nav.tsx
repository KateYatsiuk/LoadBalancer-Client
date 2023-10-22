import { Layout, Menu } from 'antd';
import { AUTH_ENDPOINTS, baseUrl } from '../constants/url.constants';
import { FRONTEND_ROUTES } from '../constants/frontend-routes.constants';

const { Header } = Layout;

const NavBar = (props: { userName: string, setUserName: (name: string) => void }) => {
  const logout = async () => {
    await fetch(baseUrl + AUTH_ENDPOINTS.LOGOUT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    window.location.href = FRONTEND_ROUTES.LOGIN;
    props.setUserName('');
    console.log(props.userName);
  }

  return (
    <Header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']} style={{ flex: "auto", minWidth: 0 }}>
          {!props.userName ? (
            <>
              <Menu.Item key="register">
                <a href={FRONTEND_ROUTES.REGISTER}>Register</a>
              </Menu.Item>
              <Menu.Item key="login">
                <a href={FRONTEND_ROUTES.LOGIN}>Login</a>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="register">
                <a href={FRONTEND_ROUTES.HOME} className="navbar-brand">Home</a>
              </Menu.Item>
              <Menu.Item key="history">
                <a href={FRONTEND_ROUTES.HISTORY}>History</a>
              </Menu.Item>
              <Menu.Item key="logout">
                <a href={FRONTEND_ROUTES.LOGIN} onClick={logout}>Logout</a>
              </Menu.Item>
            </>
          )}
        </Menu>
      </div>
    </Header>
  );
};

export default NavBar;
