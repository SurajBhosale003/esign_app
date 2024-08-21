import React, { Suspense } from 'react';
import { FrappeProvider } from 'frappe-react-sdk'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
import { flushSync } from "react-dom";
import Moveable from "react-moveable";
// import './index.css'
// layouts 
import HorizontalLayout from './HorizontalLayout';
import VerticalLayout from './VerticalLayout';
import Home from './pages/Home'
import BookAnimation from './loading/BookAnimation';
import Temp from './loading/Temp'

const Login = React.lazy(() => import('./pages/auth/Login_Auth'));
const SignUp = React.lazy(() => import('./pages/auth/Signin_Auth'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const Documents = React.lazy(() => import('./pages/Dashboard/Documents'));
const Inbox = React.lazy(() => import('./pages/Dashboard/Inbox'));
const Profile = React.lazy(() => import('./pages/Dashboard/Profile'));
const Sent = React.lazy(() => import('./pages/Dashboard/Sent'));
const Signature = React.lazy(() => import('./pages/Dashboard/Signature'));
const Templete = React.lazy(() => import('./pages/Dashboard/Templete'));
const DocBody = React.lazy(() => import('./pages/Dashboard/Document/DocBody'));
const TempleteDash = React.lazy(() => import('./pages/Dashboard/TempleteDash'));
const TempleteEdit = React.lazy(() => import('./pages/Dashboard/templete/TempleteEdit'));

function App() {
  const getSiteName = () => {
		// @ts-ignore
		if (window.frappe?.boot?.versions?.frappe && (window.frappe.boot.versions.frappe.startsWith('15') || window.frappe.boot.versions.frappe.startsWith('16'))) {
			// @ts-ignore
			return window.frappe?.boot?.sitename ?? import.meta.env.VITE_SITE_NAME
		}
		return import.meta.env.VITE_SITE_NAME

	}
  return (
	<div className="App">
    <Moveable flushSync={flushSync} />
	  <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT} siteName={getSiteName()}>
		<BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
      <Suspense fallback={<BookAnimation/>}>
			<Routes>
				<Route element={<HorizontalLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<VerticalLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sent" element={<Sent />} />
          <Route path="/signature" element={<Signature />} />
          <Route path="/trialTemp" element={<Templete />} />
          <Route path="/templete" element={<TempleteDash />} />
          <Route path="/s1" element={<Templete />} />
        </Route>
        <Route path="/loading" element={<BookAnimation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/document/:id" element={<DocBody/>} />
        <Route path="/temp" element={<BookAnimation/>} />
        <Route path="/templete/:id" element={<TempleteEdit/>} />
			</Routes>
      </Suspense>
    </BrowserRouter>
	  </FrappeProvider>
	</div>
  )
}

export default App
