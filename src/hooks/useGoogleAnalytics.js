import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';

export const useGoogleAnalytics = () => {
  const [ga, setga] = useState(ReactGA);
  useEffect(() => {
      ReactGA.initialize('G-MJ0LJ216CP');
    }, []);
  return ga;
};