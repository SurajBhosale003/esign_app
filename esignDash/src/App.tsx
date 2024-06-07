import { FrappeProvider } from 'frappe-react-sdk'
import { BrowserRouter, Routes , Route } from 'react-router-dom'
function App() {
  return (
	<div className="App">
	  <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? ''}>
		<BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
			<Routes>
				<Route path="/" element={<h1>Home Page</h1>} />
				<Route path="/login" element={<h1>Login Page</h1>} />
			</Routes>
        </BrowserRouter>
	  </FrappeProvider>
	</div>
  )
}

export default App
