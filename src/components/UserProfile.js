// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Logo from '../images/logo.png';  // Adjust this path based on your project structure

// const UserProfile = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState(null); // Added state for error messages

//   const navigate = useNavigate();
//   const [storedUser, setStoredUser] = useState(null);

//   // const handleSwitch = () => {
//   //   setIsLogin(!isLogin);
//   // };
//   const handleSwitch = () => {
//     setIsLogin(!isLogin);
//     setErrorMessage(null); // Clear error messages when switching modes
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (isLogin) {
//       try {
//         const response = await fetch('https://user-profile-1024364663505.us-central1.run.app/api/login', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email, password }),
//         });

//         if (response.ok) {
//           const result = await response.json();
//           console.log('Login successful:', result);
//           alert(result.message);
//           navigate('/schedule-manager'); // Redirect after login
//         } else {
//           const errorData = await response.json();
//           setErrorMessage(errorData.error || 'Invalid credentials');
//         }
//       } catch (error) {
//         console.error('Error during login:', error);
//         setErrorMessage('An error occurred during login. Please try again.');
//       }
//       // Simulate sign-in (no backend)
//       // if (storedUser && email === storedUser.email && password === storedUser.password) {
//       //   alert('Sign-in successful!');
//       //   navigate('/schedule-manager');
//       // } else {
//       //   alert('Invalid credentials');
//       // }
//     } else {
//       if (password !== confirmPassword) {
//         alert('Passwords do not match');
//         return;
//       }

//       const newUser = { firstName, lastName, username, email, password };
//       setStoredUser(newUser);
//       alert('Profile created successfully!');
//       navigate('/schedule-manager');
//     }
//   };

//   return (
//     <div className="container">
//       {/* Add the logo here */}
//       <div style={{ textAlign: 'center' }}>
//         <img src={Logo} alt="ToDo App Logo" style={{ width: '200px', marginBottom: '20px' }} />
//       </div>
//       <h1>{isLogin ? 'Sign In' : 'Create Profile'}</h1>
//       <form onSubmit={handleSubmit}>
//         {!isLogin && (
//           <>
//             <div className="form-group">
//               <label>First Name</label>
//               <input
//                 type="text"
//                 value={firstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Last Name</label>
//               <input
//                 type="text"
//                 value={lastName}
//                 onChange={(e) => setLastName(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group">
//               <label>Username</label>
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 required
//               />
//             </div>
//           </>
//         )}
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         {!isLogin && (
//           <div className="form-group">
//             <label>Confirm Password</label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
//         )}
//         <div className="buttons">
//           <button type="submit" className="save-btn">
//             {isLogin ? 'Sign In' : 'Create Profile'}
//           </button>
//         </div>
//       </form>
//       <button onClick={handleSwitch} className="clear-btn">
//         {isLogin ? 'Create a new profile' : 'Already have an account? Sign In'}
//       </button>
//     </div>
//   );
// };

// export default UserProfile;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import Logo from '../images/logo.png'; // Adjust this path based on your project structure

const UserProfile = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider(); // Initialize Google Auth Provider

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User logged in:', userCredential.user);
        navigate('/schedule-manager');
      } else {
        if (password !== confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
        // Register user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User registered:', userCredential.user);
        navigate('/schedule-manager');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google Sign-In successful:', user);
      navigate('/schedule-manager'); // Redirect after successful Google Sign-In
    } catch (error) {
      alert(`Google Sign-In failed: ${error.message}`);
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
      <hr />
      <button
        onClick={handleGoogleSignIn}
        className="google-btn"
        style={{
          backgroundColor: 'white',
          color: 'black',
          border: '1px solid #ccc',
          padding: '10px',
          marginTop: '10px',
          cursor: 'pointer',
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          alt="Google Logo"
          style={{ width: '20px', marginRight: '10px' }}
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default UserProfile;
