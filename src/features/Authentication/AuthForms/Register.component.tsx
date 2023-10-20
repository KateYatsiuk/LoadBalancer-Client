import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import "./AuthForms.styles.scss";
import { register } from '../../../app/api/userService';
import { AUTH_FORM_CONSTANTS } from '../../../app/common/constants/validation.constants';

const RegisterForm: React.FC = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const onFinish = async (values: any) => {
        try {
            setFormSubmitted(true);
            await register({
                userName: values.username,
                email: values.email,
                password: values.password,
            });
            window.location.href = '/';
        } catch (error) {
            message.error('Failed to register');
        }
    };

    const validatePassword = (rule: any, value: string) => {
        if (formSubmitted) {
            if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/.test(value)) {
                return Promise.resolve();
            }
            return Promise.reject('Password must meet the criteria');
        }
        return Promise.resolve();
    };

    return (
        <div className="login-container">
            <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        { required: true, message: 'Please input username' },
                        { max: AUTH_FORM_CONSTANTS.USERNAME_MAX, message: 'Username must not exceed 30 characters' }
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                        maxLength={AUTH_FORM_CONSTANTS.USERNAME_MAX}
                        showCount
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input email' },
                        { type: 'email', message: 'Please enter a valid email address' }
                    ]}
                >
                    <Input
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        placeholder="Email"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Please input password' },
                        { min: AUTH_FORM_CONSTANTS.PASSWORD_MIN, message: 'Password must not be shorter than 8 characters' },
                        { max: AUTH_FORM_CONSTANTS.PASSWORD_MAX, message: 'Password must not exceed 15 characters' },
                        { validator: validatePassword }
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        maxLength={15}
                        showCount
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    rules={[
                        { required: true, message: 'Please enter password again' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords do not match');
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Confirm password"
                        maxLength={15}
                        showCount
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => setFormSubmitted(true)}>
                        Sign up
                    </Button>
                    <span className="additional-text-form">Already have an account? <a href="login">Login</a></span>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegisterForm;