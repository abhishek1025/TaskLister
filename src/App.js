
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import AuthPage from './components/auth/auth.component';
import Dashboard from './components/dashboard/dashboard.component';
import { setAllTasks } from './components/store/tasks/task.reducer';
import { setCurrentUser } from './components/store/user/user.reducer';
import { selectCurrentUser } from './components/store/user/user.selector';
import { getDataFromFirebase, getUserDetails, onAuthChangedListener } from './components/utils/firebase/firebase.utils';

function App() {

  const currentUser = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  const storeUserDataInStore = (userDetails) => {
    dispatch(setCurrentUser(userDetails));
  }

  const storeTasksDataInReduxStore = (tasks) => {
    dispatch(setAllTasks(tasks));
  }

  useEffect(() => {
    const unsubscribe = onAuthChangedListener(async (user) => {
      const userDetails = user && ((user) => ({ displayName: user.displayName, email: user.email, uid: user.uid }))(user);

      if (userDetails) await getDataFromFirebase(userDetails.uid, storeTasksDataInReduxStore);


      if (user && !userDetails.displayName) {
        setTimeout(
          async () => {
            await getUserDetails(userDetails, storeUserDataInStore);
            return;
          }, 1000
        )
      }

      dispatch(setCurrentUser(userDetails));
    });

    return unsubscribe;
  }, []);





  return (
    <div>
      {
        currentUser ? <Dashboard /> : <AuthPage />
      }
    </div>
  );
}

export default App;
