import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AccessNotAuthorized = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      navigate('/');
    }
  }, [countdown, navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>Access Denied!</div>
      <div><b>Returning in {countdown}</b></div>
    </div>
  );
};

export default AccessNotAuthorized;
