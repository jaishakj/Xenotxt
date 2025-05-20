
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="scanlines"></div>
      <Header />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-pixel text-primary neon-text mb-4 glitch" data-text="404">404</h1>
          <p className="text-xl text-muted-foreground mb-4">TRANSMISSION LOST</p>
          <Link to="/" className="text-secondary hover:underline secondary-neon-text">
            RETURN TO MAINFRAME
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
