
import { useNavigate } from 'react-router-dom';
import { FaTractor, FaStore } from 'react-icons/fa';
import './LoginPage.css';
import farmerImage from '../assets/farmer.jpg';

function LoginPage() {
  const navigate = useNavigate();

  const leftPanelStyle = {
    backgroundImage: `url(${farmerImage})`,
  };

  return (
    <div className="login-page">
      <div className="login-split-screen">
        <div className="login-left-panel" style={leftPanelStyle}>
          <div className="login-branding">
            <h1 className="title">Organic Rice SPC</h1>
            <p className="subtitle">Price Stabilization Decision Support System</p>
          </div>
        </div>
        <div className="login-right-panel">
          <div className="login-form-container">
            <header className="login-header">
              <h2>Select Your Role</h2>
              <p>Please choose your role to continue.</p>
            </header>

            <main className="role-selection">
              <div className="role-card" onClick={() => navigate('/petani')}>
                <div className="role-icon-wrapper">
                  <FaTractor className="role-icon" />
                </div>
                <div className="role-details">
                  <h3 className="role-title">Farmer</h3>
                  <p className="role-description">Login to manage your crops and find the best buyers.</p>
                </div>
              </div>

              <div className="role-card" onClick={() => navigate('/pedagang')}>
                <div className="role-icon-wrapper">
                  <FaStore className="role-icon" />
                </div>
                <div className="role-details">
                  <h3 className="role-title">Trader</h3>
                  <p className="role-description">Login to find trusted suppliers for your business needs.</p>
                </div>
              </div>
            </main>
            
            <footer className="login-footer">
              <p>&copy; {new Date().getFullYear()} Beras Organik SPC. All Rights Reserved.</p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
