import { SyntheticEvent, useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import "./AuthForms.styles.scss";
import { AUTH_FORM_CONSTANTS } from '../../../app/common/constants/validation.constants';


const LoginForm = (props: { setUserName: (name: string) => void }) => {
    // const onFinish = async (values: any) => {
    //     try {
    //         await login({
    //             email: values.email,
    //             password: values.password,
    //         });
    //         window.location.href = '/';
    //     } catch (error) {
    //         message.error('Not valid credentials');
    //     }
    // };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onFinish = async (e: SyntheticEvent) => {

        const response = await fetch('http://localhost:8082/api/Auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        const content = await response.json();

        window.location.href = '/';
        props.setUserName(content.name);
    }

    return (
        <div className="login-container">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input email' },
                        { type: 'email', message: 'Please enter a valid email address' }
                    ]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Please input password' },
                        { min: AUTH_FORM_CONSTANTS.PASSWORD_MIN, message: 'Password must not be shorter than 8 characters' },
                        { max: AUTH_FORM_CONSTANTS.PASSWORD_MAX, message: 'Password must not exceed 15 characters' },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        maxLength={15}
                        showCount
                        onChange={e => setPassword(e.target.value)}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Sign in
                    </Button>
                    <span className="additional-text-form">Or <a href="register">register now!</a></span>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;