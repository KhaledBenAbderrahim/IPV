import Spline from '@splinetool/react-spline';
import { useEffect, useState } from 'react';

export default function SplineScene() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`
      absolute inset-0 transition-opacity duration-1000
      ${isLoaded ? 'opacity-100' : 'opacity-0'}
    `}>
      <Spline 
        scene="https://prod.spline.design/OU2Kv5RwY-dYM5Wd/scene.splinecode"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
