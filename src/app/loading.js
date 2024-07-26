'use client'
import { useEffect } from 'react';
import 'ldrs/ring'; // Importing your library

const Loading = () => {
  useEffect(() => {
    import('ldrs').then(({ hourglass }) => {
      hourglass.register();
    });
  }, []);

  return (
    <div className='w-full h-full flex justify-center' >
      <l-hourglass
        size="600"
        bg-opacity="0.1"
        speed="4.6"
        color="rgb(178 , 224 , 198)"
      ></l-hourglass>
    </div>
  );
};

export default Loading;
