import type React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppContext } from '../context/AppContext';
import type { FormData } from '../Interfaces';
import { countries, states, cities } from '../data/locations';
import { Modal } from './Modal';
import './FormComponent.css';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const FormComponent: React.FC = () => {
  const { addData, updateData } = useAppContext();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [isEditMode, setIsEditMode] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const watchedTown = watch('town');
  const watchedCountry = watch('country');
  const watchedState = watch('state');

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (watchedTown && watchedTown.length > 2) {
        try {
          const geoRes = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${watchedTown}&limit=1&appid=${API_KEY}`
          );
          const geoData = await geoRes.json();

          if (geoData && geoData.length > 0) {
            const { lat, lon } = geoData[0];
            const weatherRes = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            const weatherData = await weatherRes.json();
            setWeatherData(weatherData);
          }
        } catch (error) {
          console.error('Error fetching weather:', error);
        }
      }
    };

    fetchWeatherData();
  }, [watchedTown]);

  useEffect(() => {
    const handleEditItem = (item: FormData) => {
      Object.keys(item).forEach((key) => {
        setValue(key as keyof FormData, item[key as keyof FormData]);
      });
      setIsEditMode(true);
    };

    document.addEventListener('editItem', ((e: CustomEvent<FormData>) =>
      handleEditItem(e.detail)) as EventListener);
    return () => {
      document.removeEventListener('editItem', ((e: CustomEvent<FormData>) =>
        handleEditItem(e.detail)) as EventListener);
    };
  }, [setValue]);

  const onSubmit = (data: FormData) => {
    if (isEditMode) {
      updateData(data);
    } else {
      const newData = { ...data, id: Date.now().toString() };
      addData(newData);
    }

    if (weatherData) {
      setShowModal(true);
    }

    // Reset form
    Object.keys(data).forEach((key) => {
      setValue(key as keyof FormData, '');
    });
    setIsEditMode(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <div className="input-wrapper">
            <input
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters long',
                },
              })}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="validation-icon error">!</span>}
            {!errors.name && watch('name') && (
              <span className="validation-icon success">✓</span>
            )}
          </div>
          {errors.name && (
            <span className="error-message">{errors.name.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <div className="input-wrapper">
            <input
              {...register('phone', {
                required: 'Phone is required',
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Phone number must be 10 digits',
                },
              })}
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="validation-icon error">!</span>}
            {!errors.phone && watch('phone') && (
              <span className="validation-icon success">✓</span>
            )}
          </div>
          {errors.phone && (
            <span className="error-message">{errors.phone.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <div className="input-wrapper">
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format',
                },
              })}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="validation-icon error">!</span>}
            {!errors.email && watch('email') && (
              <span className="validation-icon success">✓</span>
            )}
          </div>
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <div className="input-wrapper">
            <select
              {...register('country', { required: 'Country is required' })}
              className={errors.country ? 'error' : ''}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && <span className="validation-icon error">!</span>}
            {!errors.country && watch('country') && (
              <span className="validation-icon success">✓</span>
            )}
          </div>
          {errors.country && (
            <span className="error-message">{errors.country.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="state">State</label>
          <div className="input-wrapper">
            <select
              {...register('state', { required: 'State is required' })}
              className={errors.state ? 'error' : ''}
              disabled={!watchedCountry}
            >
              <option value="">Select State</option>
              {watchedCountry &&
                states[watchedCountry]?.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
            </select>
            {errors.state && <span className="validation-icon error">!</span>}
            {!errors.state && watch('state') && (
              <span className="validation-icon success">✓</span>
            )}
          </div>
          {errors.state && (
            <span className="error-message">{errors.state.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <div className="input-wrapper">
            <select
              {...register('city', { required: 'City is required' })}
              className={errors.city ? 'error' : ''}
              disabled={!watchedState}
            >
              <option value="">Select City</option>
              {watchedState &&
                cities[watchedState]?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
            {errors.city && <span className="validation-icon error">!</span>}
            {!errors.city && watch('city') && (
              <span className="validation-icon success">✓</span>
            )}
          </div>
          {errors.city && (
            <span className="error-message">{errors.city.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="zip">ZIP Code</label>
          <div className="input-wrapper">
            <input
              {...register('zip', {
                required: 'ZIP code is required',
                pattern: {
                  value: /^\d{5}(-\d{4})?$/,
                  message: 'Invalid ZIP code format',
                },
              })}
              className={errors.zip ? 'error' : ''}
            />
            {errors.zip && <span className="validation-icon error">!</span>}
            {!errors.zip && watch('zip') && (
              <span className="validation-icon success">✓</span>
            )}
          </div>
          {errors.zip && (
            <span className="error-message">{errors.zip.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="town">Town</label>
          <div className="input-wrapper">
            <input
              {...register('town', { required: 'Town is required' })}
              className={errors.town ? 'error' : ''}
            />
            {errors.town && <span className="validation-icon error">!</span>}
            {!errors.town && watch('town') && (
              <span className="validation-icon success">✓</span>
            )}
          </div>
          {errors.town && (
            <span className="error-message">{errors.town.message}</span>
          )}
        </div>

        <button type="submit" className="submit-button">
          {isEditMode ? 'Update' : 'Submit'}
        </button>
      </form>

      {showModal && weatherData && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Weather in {weatherData.name}</h2>
          <p>🌡 Temperature: {weatherData.main.temp}°C</p>
          <p>🌤 Condition: {weatherData.weather[0].description}</p>
          <p>💨 Wind Speed: {weatherData.wind.speed} m/s</p>
          <button
            className="modal-close-btn"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal>
      )}
    </>
  );
};
