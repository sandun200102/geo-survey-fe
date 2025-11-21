import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminDashBoardPage from "./pages/AdminDashBoardPage";
import LoadingSpinner from "./components/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import HomePage from "./pages/HomePage";
import  Settings  from "./pages/Settings";
import Equipments from "./pages/Equipments";
import Projects from "./pages/Projects";
import FieldSupport from "./components/FieldSupport";
import Learn from "./pages/Learn";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Update from "./components/Update";
import { useTimeAgo } from "./utils/useTimeAgo";
import AdminPanel from "./pages/AdminPanel";	




// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user, isCheckingAuth, logout } = useAuthStore();

	if (isCheckingAuth) {
		return <LoadingSpinner />;
	}
	if (user?.lastLogin) {
    const diff = useTimeAgo(user.lastLogin);

    // Example: if logged in more than 40 minutes ago → force re-login
    if (diff.minutes > 40) {
      console.log("Authentication expired, redirecting to login...");
	//   toast.success("Authentication expired !");
	  logout()
	  
      
    }
  }

	if (!isAuthenticated) {
		return <Navigate to='/home' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}
	

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();


	if (isAuthenticated && user.isVerified && user.role === "user") {
		console.log(isAuthenticated)
		return <Navigate to='/user-dashboard' replace />;
	}
	else if (isAuthenticated && user.isVerified && user.role === "admin") {
	console.log(isAuthenticated)
		// return <Navigate to='/admin-dashboard' replace />;
		return <Navigate to='/admin-panel' replace />;
	}

	return children;
};

function App() {
	const { isCheckingAuth, checkAuth  } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;

	return (
		<div
			className='items-center justify-center '
			// className="items-center justify-center relative overflow-hidden"
		>
			{/* <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} /> */}

			<Routes>
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<HomePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/settings'
					element={
						<ProtectedRoute>
							<Settings />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/admin-dashboard'
					element={
						<ProtectedRoute>
							<AdminDashBoardPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/admin-panel'
					element={
						<ProtectedRoute>
							<AdminPanel />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/user-dashboard'
					element={
						<ProtectedRoute>
							<UserDashboardPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/equipments'
					element={
						
							<Equipments />
						
					}
				/>

				<Route
					path='/project-management'
					element={
						<ProtectedRoute>
							<Projects />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/learn'
					element={
						
							<Learn />
						
					}
				/>

				<Route
					path='/team-collaboration'
					element={
						
							<Team />
						
					}
				/>


				<Route
					path='/field-support'
					element={
						
							<FieldSupport />

					}
				/>

				<Route
					path='/contact'
					element={
						
							<Contact />
						
					}
				/>

				<Route
					path='/booking'
					element={
						<ProtectedRoute>
							<Booking />
						</ProtectedRoute>
					}
				/>
				

				{/* <Route
					path="/update"
					element={
						<ProtectedRoute>
							<Update />
						</ProtectedRoute>
					}
				/> */}
				

				<Route
					path='/signup'
					element={
						<RedirectAuthenticatedUser>
							<div className='min-h-screen bg-gradient-to-br
   							 from-blue-300 via-white to-blue-400 flex items-center justify-center relative overflow-hidden'
							>
								<SignUpPage />
							</div>
						</RedirectAuthenticatedUser>
					}
				/>
				
				
				<Route
					path='/home'
					element={
						<RedirectAuthenticatedUser>
							<HomePage />
						</RedirectAuthenticatedUser>
					}
				/>
				
				<Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
							<div className='min-h-screen bg-gradient-to-br
   							 from-blue-300 via-white to-blue-400 flex items-center justify-center relative overflow-hidden'
							>
							<LoginPage />
							</div>
						</RedirectAuthenticatedUser>
					}
				/>
				

				
				<Route path='/verify-email' element={<div className='min-h-screen bg-gradient-to-br
   							 from-blue-300 via-white to-blue-400 flex items-center justify-center relative overflow-hidden'
							><EmailVerificationPage /></div>} />

				<Route
					path='/forgot-password'
					element={
						<RedirectAuthenticatedUser>
							<div className='min-h-screen bg-gradient-to-br
   							 from-blue-300 via-white to-blue-400 flex items-center justify-center relative overflow-hidden'
							>
								<ForgotPasswordPage />
							</div>
						</RedirectAuthenticatedUser>
					}
				/>

				<Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<div className='min-h-screen bg-gradient-to-br
   							 from-blue-300 via-white to-blue-400 flex items-center justify-center relative overflow-hidden'
							>
								<ResetPasswordPage />
							</div>
						</RedirectAuthenticatedUser>
					}
				/>
				{/* catch all routes */}
				<Route path='*' element={<Navigate to='/' replace />} />
			</Routes>
			<Toaster />
			
		</div>
	);
}

export default App;