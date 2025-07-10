'use client';

import { LoginNavbar } from '@/components/layout/login/LoginNavbar';
import { LoginForm } from '@/components/layout/login/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#f7f7f7' }}>
      {/* Background geometric shapes */}
      <div className="absolute inset-0">
        {/* Large diagonal orange background from bottom right */}
        <div
          className="absolute bottom-0 right-0 w-full h-full"
          style={{
            background: '#ff9500',
            clipPath: 'polygon(0% 75%, 100% 25%, 100% 100%, 0% 100%)',
          }}
        ></div>
      </div>

      {/* Login Navbar */}
      <LoginNavbar />

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-52px)] px-4">
        <div className="w-full max-w-[540px] min-h-[535px] flex items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
