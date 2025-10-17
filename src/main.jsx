import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider } from './contexts/AuthContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { PermissionsProvider } from './contexts/PermissionsContext';
import { NotificationProvider } from './contexts/NotificationContext';
import App from './App.jsx';
import './styles/reset.css';
import './styles/variables.css';
import './index.css';

// GitHub Pages SPA redirect handling
(function(l) {
  if (l.search[1] === '/' ) {
    var decoded = l.search.slice(1).split('&').map(function(s) { 
      return s.replace(/~and~/g, '&')
    }).join('?');
    window.history.replaceState(null, null,
        l.pathname.slice(0, -1) + decoded + l.hash
    );
  }
}(window.location))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/aabo-frontend">
      <Provider store={store}>
        <AuthProvider>
          <ThemeProvider>
            <PermissionsProvider>
              <ProjectProvider>
                <NotificationProvider>
                  <App />
                </NotificationProvider>
              </ProjectProvider>
            </PermissionsProvider>
          </ThemeProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
