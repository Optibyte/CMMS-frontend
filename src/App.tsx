import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';
import './styles/styles.scss';
import AppRoutes from './app-routing.module';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './store/userSlice';
import { setAuthState } from './store/authSlice';
import { ToastProvider } from './contexts/ToastContext';

import { AppWithLoading } from './contexts/LoadingProvider';


setupIonicReact();

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userDetails = localStorage.getItem('user');
    if (userDetails) {
      try {
        const parsedUser = JSON.parse(userDetails);
        dispatch(setUser(parsedUser));
        dispatch(setAuthState({ isAuthenticated: true, user: userDetails }));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
  }, [dispatch]);

  return (
    <IonApp>
      <AppWithLoading>
        <ToastProvider>
          <AppRoutes />
        </ToastProvider>
      </AppWithLoading>
    </IonApp>
  );
};

export default App;
