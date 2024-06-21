import { FrappeProvider } from 'frappe-react-sdk'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
// import './index.css'
// layouts 
import HorizontalLayout from './HorizontalLayout';
import VerticalLayout from './VerticalLayout';

import Home from './pages/Home'
import Login from './pages/auth/Login_Auth'
import SignUp from './pages/auth/Signin_Auth'
import Dashboard from './pages/Dashboard/Dashboard'
import Documents from './pages/Dashboard/Documents'
import Inbox from './pages/Dashboard/Inbox'
import Profile from './pages/Dashboard/Profile'
import Sent from './pages/Dashboard/Sent'
import Signature from './pages/Dashboard/Signature'
import Templete from './pages/Dashboard/Templete'
import DocBody from './pages/Dashboard/Document/DocBody'

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
	  <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT} siteName={getSiteName()}>
		<BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
			<Routes>
				{/* <Route path="/" element={ <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-500">Hello, Tailwind CSS!</h1>
    </div>} />
				<Route path="/login" element={<h1>Login Page</h1>} /> */}

				<Route element={<HorizontalLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        {/* Vertical */}
        <Route element={<VerticalLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sent" element={<Sent />} />
          <Route path="/signature" element={<Signature />} />
          <Route path="/templete" element={<Templete />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/document/:id" element={<DocBody/>} />


			</Routes>
        </BrowserRouter>
	  </FrappeProvider>
	</div>
  )
}

export default App
