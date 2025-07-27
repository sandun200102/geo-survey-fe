
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoading, error, setAuthUser } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await login(email, password);
		} catch {
			toast.error("Invalid credentials");
		}
	};

	const handleGoogleLoginSuccess = async (credentialResponse) => {
		try {
			const res = await fetch("http://localhost:5000/api/auth/google", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token: credentialResponse.credential }),
				credentials: "include",
			});

			const data = await res.json();

			if (res.ok) {
				setAuthUser(data.user);
				toast.success("Logged in with Google!");
			} else {
				toast.error(data?.error || "Google login failed.");
			}
		} catch (err) {
			toast.error("An error occurred during Google login.");
		}
	};



	return (
		<GoogleOAuthProvider clientId="120691292783-0jrnjtlokt6s2dsvu3qdvf3fsc8k9h91.apps.googleusercontent.com">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='max-w-md w-full bg-gradient-to-r from-blue-100 to-blue-300 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
			>
				<div className='p-8 '>
					<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
						Welcome Back To Login
					</h2>

					<form onSubmit={handleLogin}>
						<Input
							icon={Mail}
							type='email'
							placeholder='Email Address'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							icon={Lock}
							type='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<div className='flex items-center mb-6'>
							<Link to='/forgot-password' className='text-sm text-black-400 hover:underline'>
								Forgot password?
							</Link>
						</div>

						{error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
							type='submit'
							disabled={isLoading}
						>
							{isLoading ? <Loader className='w-6 h-6 animate-spin mx-auto' /> : "Login"}
						</motion.button>
					</form>

				
					<div className='mt-6 flex flex-col items-center'>
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
							>
									
										<p className='text-sm text-gray-600 mb-2'>or</p>
										<GoogleLogin
											onSuccess={handleGoogleLoginSuccess}
											onError={() => toast.error("Google Sign-In failed")}
										/>
										
					</motion.button>
					</div>

				</div>

				<div className='px-8 py-4 bg-gradient-to-r from-green-300 to-blue-500 bg-opacity-50 flex justify-center'>
					<p className='text-sm text-black-400'>
						Don't have an account?{" "}
						<Link to='/signup' className='text-green-900 hover:underline'>
							Sign up
						</Link>
					</p>
				</div>
			</motion.div>
		</GoogleOAuthProvider>
	);
};

export default LoginPage;
