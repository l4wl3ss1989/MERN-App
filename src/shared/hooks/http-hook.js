import { useState, useCallback, useRef, useEffect } from 'react';

import axios from '../../config/axios.mern';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(async (url, method = 'get', body = null, headers = {}) => {
    setIsLoading(true);
    const httpAbortController = new AbortController(); // Functionality build in moder browsers
    activeHttpRequests.current.push(httpAbortController);
    try {
      const response = await axios({
        method,
        url,
        data: body,
        headers,
        signal: httpAbortController.signal
      });
      // Clear Abort Controllers
      activeHttpRequests.current = activeHttpRequests.current.filter(
        reqCtrl => reqCtrl !== httpAbortController
      );
      setIsLoading(false);
      return response.data;
    } catch (err) {
      const notDesiredStatusCode = err.response;
      if (notDesiredStatusCode) {
        // WARN: Whith axios responses with other than 2xx status code will fall into catch.
        setError(err.response.data.message || 'Somthing went wrong please try again.');
      } else {
        setError(err.message || 'Somthing went wrong please try again.');
      }
      setIsLoading(false);
      throw err;
    }
  }, []);

  const clearError = () => setError(null);

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
