import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore  } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [message, setMessage] = useState('');
    

    const { isLoading, forgotPassword ,user} = useAuthStore();
    console.log(user.firstName);

    const handleSubmit = async (e) => {
        if (user.email === email) {
            e.preventDefault();
            await forgotPassword(email);
            setIsSubmitted(true);
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        }
        else {
            e.preventDefault();
            console.error(err);
            setMessage('Update failed!');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='max-w-md w-full overflow-hidden'
        >
            <div className='p-8'>
               
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit}>
                        {message && <p className="text-sm text-green-500">{message}</p>}

                        <h2 className='text-2xl font-bold text-white mb-4 text-center'>
                            Reset Password
                        </h2>
                        <p className='text-white mb-6 text-center'>
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                        <input
                            icon={Mail}
                            type='email'
                            placeholder='Email Address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className ="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white"
                        />
                        <br></br>
                        <br></br>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                            type='submit'
                        >
                            {isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Send Reset Link"}
                        </motion.button>
                    </form>
                ) : (
                    <div className='text-center'>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
                        >
                            <Mail className='h-8 w-8 text-white' />
                        </motion.div>
                        <p className='w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white'>
                            If an account exists for {email}, you will receive a password reset link shortly.
                        </p>
                    </div>
                )}
            </div>

          
        </motion.div>
    );
};
export default ForgotPassword;