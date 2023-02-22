
import { useEffect, useState } from 'react';
import './App.css';
import AuthPage from './components/auth/auth.component';
import { onAuthChangedListener, signOutUser } from './components/utils/firebase/firebase.utils';

function App() {

  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthChangedListener((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    await signOutUser();
  }

  return (
    <div>
      {
        currentUser ? <button onClick={handleSignOut}>Sign Out</button> : <AuthPage />
      }
    </div>
  );
}

export default App;
