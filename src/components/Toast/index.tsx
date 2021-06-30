import { Toaster } from 'react-hot-toast';

export function Toast() {
  return (
    <Toaster 
      position="top-right"
      gutter={12}
      toastOptions={{
        duration: 5000,
        style: {
          fontFamily: 'Poppins',
          fontWeight: 'bold',
          color: '#FFFFFF',
          background: '#835AFD'
        }
      }}             
    />
  );
}