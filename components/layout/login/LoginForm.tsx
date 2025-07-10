'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useTranslation } from 'react-i18next';

export function LoginForm() {
  const { t } = useTranslation('common');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [hasEmailInteracted, setHasEmailInteracted] = useState(false);
  const [hasPasswordInteracted, setHasPasswordInteracted] = useState(false);

  const { login, isLoading, error, isAuthenticated, clearError } = useAuthStore();
  const router = useRouter();

  // Validation states
  const isEmailValid = email.endsWith('@leadway.com') && email.length > '@leadway.com'.length;
  const isPasswordValid = password.length >= 8;
  const isFormValid = isEmailValid && isPasswordValid;

  // Show validation errors only after user has interacted and field is not focused
  const showEmailError = hasEmailInteracted && !isEmailFocused && email && !isEmailValid;
  const showPasswordError =
    hasPasswordInteracted && !isPasswordFocused && password && !isPasswordValid;

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  // Clear any errors when inputs change
  useEffect(() => {
    if (error) clearError();
  }, [email, password, clearError, error]);

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
    setHasEmailInteracted(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
    setHasPasswordInteracted(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const success = await login(email, password);
    if (success) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="w-full max-w-[540px] min-h-full bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl border border-white/20 p-6 sm:p-10 flex flex-col justify-center transition-all duration-300 hover:shadow-3xl">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
          {t('login.title')}
        </h2>
        <p className="text-gray-600 text-base sm:text-lg">{t('login.subtitle')}</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-r-lg text-sm animate-in slide-in-from-left-2 duration-300">
          <div className="flex items-center">
            <XCircle className="w-4 h-4 mr-2" />
            {error}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        <div className="space-y-3">
          <Label
            htmlFor="email"
            className={`text-sm font-semibold transition-colors duration-200 ${
              isEmailFocused || email ? 'text-[#ff9500]' : 'text-gray-700'
            }`}
          >
            {t('login.email')}
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder={t('login.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={handleEmailBlur}
              autoComplete="email"
              className={`h-12 sm:h-14 text-base sm:text-lg border-2 rounded-xl pr-12 transition-all duration-300 bg-gray-50/50 focus:outline-none focus:ring-0 ${
                isEmailFocused
                  ? 'border-[#ff9500] bg-white shadow-lg'
                  : email
                    ? isEmailValid
                      ? 'border-[#ff9500] bg-white'
                      : 'border-red-300 bg-white'
                    : 'border-gray-200 hover:border-gray-300'
              }`}
              required
              disabled={isLoading}
            />
            {email && !isEmailValid && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <XCircle className="w-5 h-5 text-red-500" />
              </div>
            )}
          </div>
          {showEmailError && (
            <p className="text-sm text-red-600 mt-1 animate-in slide-in-from-top-1 duration-200">
              {t('login.emailError')}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Label
            htmlFor="password"
            className={`text-sm font-semibold transition-colors duration-200 ${
              isPasswordFocused || password ? 'text-[#ff9500]' : 'text-gray-700'
            }`}
          >
            {t('login.password')}
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder={t('login.passwordPlaceholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={handlePasswordBlur}
              autoComplete="current-password"
              className={`h-12 sm:h-14 text-base sm:text-lg border-2 rounded-xl pr-20 transition-all duration-300 bg-gray-50/50 focus:outline-none focus:ring-0 ${
                isPasswordFocused
                  ? 'border-[#ff9500] bg-white shadow-lg'
                  : password
                    ? isPasswordValid
                      ? 'border-[#ff9500] bg-white'
                      : 'border-red-300 bg-white'
                    : 'border-gray-200 hover:border-gray-300'
              }`}
              required
              disabled={isLoading}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-[#ff9500] transition-colors duration-200 p-1 rounded-lg hover:bg-[#ff9500]/10"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
            </div>
          </div>
          {showPasswordError && (
            <p className="text-sm text-red-600 mt-1 animate-in slide-in-from-top-1 duration-200">
              {t('login.passwordError')}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className={`w-full h-12 sm:h-14 font-semibold text-base sm:text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] relative overflow-hidden ${
            isFormValid && !isLoading
              ? 'bg-gradient-to-r from-[#ff9500] via-[#ff8c00] to-[#ff7f00] hover:from-[#e6850e] hover:via-[#e67e00] hover:to-[#e67300] text-white shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!isFormValid || isLoading}
        >
          {isFormValid && !isLoading && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
          )}
          <span className="relative z-10">
            {isLoading ? (
              <>
                <span className="mr-3 inline-block h-4 w-4 sm:h-5 sm:w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                {t('login.signingIn')}
              </>
            ) : (
              <>{t('login.signIn')}</>
            )}
          </span>
        </Button>
      </form>
    </div>
  );
}
