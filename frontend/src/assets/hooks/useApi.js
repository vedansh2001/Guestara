import { useState } from 'react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (endpoint) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      return await response.json();
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const submitData = async (endpoint, method, data) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to submit data');
      return await response.json();
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, fetchData, submitData, setError };
};