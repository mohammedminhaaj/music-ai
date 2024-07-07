'use client';

import { logoutUser } from '@/actions/auth';
import { Loader2, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LogoutButton: React.FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { push } = useRouter();
	const handleLogout = async () => {
		setIsLoading(true);
		const response = await logoutUser();
		if (response.code < 400) {
			push('/login');
		}
		setIsLoading(false);
	};
	return (
		<button
			type='button'
			title='log out'
			disabled={isLoading}
			className='flex items-center gap-2 bg-purple-600 text-white rounded-full px-2 py-1 transition-all hover:gap-4 hover:bg-purple-900'
			onClick={handleLogout}>
			<p className='hidden md:block'>Logout</p>
			{isLoading ? (
				<Loader2 className='animate-spin' />
			) : (
				<LogOut size={16} />
			)}
		</button>
	);
};

export default LogoutButton;
