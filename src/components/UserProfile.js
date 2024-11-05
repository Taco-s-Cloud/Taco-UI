import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../images/logo.png';  // Adjust this path based on your project structure

const UserProfile = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const [storedUser, setStoredUser] = useState(null);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Simulate sign-in (no backend)
      if (storedUser && email === storedUser.email && password === storedUser.password) {
        alert('Sign-in successful!');
        navigate('/schedule-manager');
      } else {
        alert('Invalid credentials');
      }
    } else {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      const newUser = { firstName, lastName, username, email, password };
      setStoredUser(newUser);
      alert('Profile created successfully!');
      navigate('/schedule-manager');
    }
  };

  return (
    <div className="container">
      {/* Add the logo here */}
      <div style={{ textAlign: 'center' }}>
        <img src={Logo} alt="ToDo App Logo" style={{ width: '200px', marginBottom: '20px' }} />
      </div>
      <h1>{isLogin ? 'Sign In' : 'Create Profile'}</h1>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <div className="buttons">
          <button type="submit" className="save-btn">
            {isLogin ? 'Sign In' : 'Create Profile'}
          </button>
        </div>
      </form>
      <button onClick={handleSwitch} className="clear-btn">
        {isLogin ? 'Create a new profile' : 'Already have an account? Sign In'}
      </button>
    </div>
  );
};

export default UserProfile;
