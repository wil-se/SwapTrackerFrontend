import { useEffect, useState } from 'react';
const ReactPixel = require('react-facebook-pixel').default;

export const useFacebookPixel = () => {
  const [pixel, setpixel] = useState(ReactPixel);
  useEffect(() => {
      ReactPixel.init('3025937334196597');
      ReactPixel.init('1267442583771416');
      pixel.pageView();
  }, []);
  return pixel;
};