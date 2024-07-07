import LoginForm from '@/components/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Login | MusicAI',
};

const Login: React.FC = () => {
	return (
		<>
			<h1 className='text-center text-3xl font-extrabold'>Login</h1>
			<h2 className='text-center text-sm font-extralight'>
				Please login using your credentials
			</h2>
			<LoginForm />
		</>
	);
};

export default Login;
