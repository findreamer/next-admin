'use client'
import LoginForm from '@/components/LoginForm'
import './index.css'

const LoginPage = () => {
  const handleSubmit = async () => {
    console.log('handleSubmit')
  }

  return <main className="login-page w-screen h-screen flex items-center justify-center">
    <LoginForm onSubmit={handleSubmit} />
  </main>;
};

export default LoginPage;
