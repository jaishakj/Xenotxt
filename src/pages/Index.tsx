
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  // Redirect to the home page
  useEffect(() => {
    navigate('/');
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-xl font-pixel text-primary neon-text animate-pulse-neon">
          XENOTXT LOADING...
        </h1>
      </div>
    </div>
  );
};

export default Index;
