import { Layout, Menu } from 'antd';
import { AUTH_ENDPOINTS, baseUrl } from '../constants/url.constants';

const { Header } = Layout;

const NavBar = (props: { userName: string, setUserName: (name: string) => void }) => {
  const logout = async () => {
    await fetch(baseUrl + AUTH_ENDPOINTS.LOGOUT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    window.location.href = '/login';
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
                <a href="/register">Register</a>
              </Menu.Item>
              <Menu.Item key="login">
                <a href="/login">Login</a>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="register">
                <a href="/" className="navbar-brand">Home</a>
              </Menu.Item>
              <Menu.Item key="history">
                <a href="/history">History</a>
              </Menu.Item>
              <Menu.Item key="logout">
                <a href="/login" onClick={logout}>Logout</a>
              </Menu.Item>
            </>
          )}
        </Menu>
      </div>
    </Header>
  );
};

export default NavBar;
