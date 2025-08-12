import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User, PhoneCall, MapPinHouse } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";
import LoadingSpinner from "../components/LoadingSpinner";

const SignUpPage = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [contactNumber, setContactNumber] = useState("");
	const [address, setAddress] = useState("");
	const navigate = useNavigate();

	const { signup, error, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();

		try {
			
			await signup(email, password, firstName, lastName, contactNumber, address);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gradient-to-r from-blue-100 to-blue-300  bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Create Account
				</h2>

				<form onSubmit={handleSignUp}>
					<Input
						icon={User}
						type='text'
						placeholder='First Name'
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<Input 
						icon={User}
						type='text'
						placeholder='Last Name'
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
					
					<Input
						icon={PhoneCall}
						type='text'
						placeholder='Contact Number'
						value={contactNumber}
						onChange={(e) => setContactNumber(e.target.value)}
					/>
					<Input
						icon={MapPinHouse}
						type='text'
						placeholder='Address'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
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
					{error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
					<PasswordStrengthMeter password={password} />

					<motion.button
						className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
						disabled={isLoading}
					>
						{isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
					</motion.button>
					
				</form>
			</div>
			<div className='px-8 py-4 bg-gradient-to-r from-green-300 to-blue-500 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-black-400'>
					Already have an account?{" "}
					<Link to={"/login"} className='text-green-900 hover:underline'>
						Login
					</Link>
				</p>
			</div>
		</motion.div>
	);
};
export default SignUpPage;