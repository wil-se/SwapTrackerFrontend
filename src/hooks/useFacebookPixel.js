import { useEffect, useState } from 'react';
const ReactPixel = require('react-facebook-pixel').default;

const initPixel = () => {
  ReactPixel.init('3025937334196597');
  ReactPixel.init('1267442583771416');
  //console.log("FB_PIXEL_INIT");
  return ReactPixel;
};

export const useFacebookPixel = () => {
  const [pixel, setpixel] = useState(ReactPixel);
  useEffect(() => {
      initPixel();
      pixel.pageView();
  }, [initPixel]);
  return pixel;
};