
import { useNavigate } from 'react-router';
import './Error404.css';

export default function Error404(){
  const navigate = useNavigate();

  return (
    <div className="notfound-wrapper">
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-subtitle">Page Not Found</h2>
      <p className="notfound-description">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <button className="notfound-button" onClick={() => navigate('/')}>
        Go Home
      </button>
    </div>
  );
};
