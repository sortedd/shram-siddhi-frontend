import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNavigation } from '../../../components/ui/ContextualNavigation';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';
import { apiService, handleApiError } from '../../../services/api';

const LoginForm = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, language } = useNavigation();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.username?.trim()) {
      newErrors.username = language === 'hi' ? 'उपयोगकर्ता नाम आवश्यक है' : 'Username is required';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = language === 'hi' ? 'पासवर्ड आवश्यक है' : 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await apiService.auth.login({
        email: formData.username,
        password: formData.password
      });

      // Successful login
      sessionStorage.setItem('auth-token', response.data.token);
      sessionStorage.setItem('user-role', response.data.user.role);
      setIsAuthenticated(true);
      navigate('/admin-dashboard');
    } catch (error) {
      const apiError = handleApiError(error);
      setErrors({
        general: language === 'hi'
          ? `लॉगिन में त्रुटि: ${apiError.message}`
          : `Login error: ${apiError.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Field */}
        <Input
          label={language === 'hi' ? 'उपयोगकर्ता नाम' : 'Username'}
          type="email"
          name="username"
          value={formData?.username}
          onChange={handleInputChange}
          placeholder={language === 'hi' ? 'अपना ईमेल दर्ज करें' : 'Enter your email'}
          error={errors?.username}
          required
          disabled={isLoading}
        />

        {/* Password Field */}
        <div className="relative">
          <Input
            label={language === 'hi' ? 'पासवर्ड' : 'Password'}
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            placeholder={language === 'hi' ? 'अपना पासवर्ड दर्ज करें' : 'Enter your password'}
            error={errors?.password}
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors touch-target"
            disabled={isLoading}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>

        {/* General Error Message */}
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0 mt-0.5" />
              <div className="text-sm text-error whitespace-pre-line">
                {errors?.general}
              </div>
            </div>
          </div>
        )}

        {/* Login Button */}
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          iconName="LogIn"
          iconPosition="left"
          className="mt-8"
        >
          {language === 'hi' ? 'लॉगिन करें' : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;