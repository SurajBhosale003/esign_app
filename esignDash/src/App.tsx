import React, { Suspense } from 'react';
import { FrappeProvider } from 'frappe-react-sdk';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { flushSync } from 'react-dom';
import Moveable from 'react-moveable';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import HorizontalLayout from './HorizontalLayout';
import VerticalLayout from './VerticalLayout';
import Home from './pages/Home';
import BookAnimation from './loading/BookAnimation';
import BookAnimation2 from './loading/BookAnimation2';

// Lazy-loaded components
const Login = React.lazy(() => import('./pages/auth/Login_Auth'));
const SignUp = React.lazy(() => import('./pages/auth/Signin_Auth'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const Documents = React.lazy(() => import('./pages/Dashboard/Documents'));
const Inbox = React.lazy(() => import('./pages/Dashboard/Inbox'));
const Profile = React.lazy(() => import('./pages/Dashboard/Profile'));
const Sent = React.lazy(() => import('./pages/Dashboard/Sent'));
const Signature = React.lazy(() => import('./pages/Dashboard/Signature'));
const Templete = React.lazy(() => import('./pages/Dashboard/Templete'));
const DocEdit = React.lazy(() => import('./pages/Dashboard/Document/DocEdit'));
const TempleteDash = React.lazy(() => import('./pages/Dashboard/TempleteDash'));
const TempleteEdit = React.lazy(() => import('./pages/Dashboard/templete/TempleteEdit'));
const Signer = React.lazy(() => import('./pages/Dashboard/doc_signer/Signer'));

function App() {
  const getSiteName = () => {
    // @ts-ignore
    if (window.frappe?.boot?.versions?.frappe && (window.frappe.boot.versions.frappe.startsWith('15') || window.frappe.boot.versions.frappe.startsWith('16'))) {
      // @ts-ignore
      return window.frappe?.boot?.sitename ?? import.meta.env.VITE_SITE_NAME;
    }
    return import.meta.env.VITE_SITE_NAME;
  };  
  const verticalRoutes = [
    { path: '/loading', element: <BookAnimation2 /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/documents', element: <Documents /> },
    { path: '/inbox', element: <Inbox /> },
    { path: '/profile', element: <Profile /> },
    { path: '/sent', element: <Sent /> },
    { path: '/signature', element: <Signature /> },
    { path: '/trialTemp', element: <Templete /> },
    { path: '/templete', element: <TempleteDash /> },
    { path: '/s1', element: <Templete /> },
  ]
  
  const otherRoutes = [
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/document/:id', element: <DocEdit /> },
    { path: '/temp', element: <BookAnimation /> },
    { path: '/templete/:id', element: <TempleteEdit /> },
    { path: '/signer/:id', element: <Signer /> },
  ]
  

  return (
    <div className="App">
      <Moveable flushSync={flushSync} />
      <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT} siteName={getSiteName()}>
        <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
          <DndProvider backend={HTML5Backend}>
          <Routes>
                <Route element={<HorizontalLayout />}>
                  <Route path="/" element={<Suspense fallback={<BookAnimation2 />}><Home /></Suspense>} />
                </Route>
  
                <Route element={<VerticalLayout />}>
                  {verticalRoutes.map(({ path, element }) => (
                    <Route key={path} path={path} element={<Suspense fallback={<BookAnimation2 />}>{element}</Suspense>} />
                  ))}
                </Route>
  
                {otherRoutes.map(({ path, element }) => (
                  <Route key={path} path={path} element={<Suspense fallback={<BookAnimation />}>{element}</Suspense>} />
                ))}
              </Routes>
          </DndProvider>
        </BrowserRouter>
      </FrappeProvider>
    </div>
  );
}

export default App;
