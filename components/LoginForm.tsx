'use client';

import { loginUser } from '@/actions/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleX, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';

const LoginForm: React.FC = () => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [formError, setFormError] = useState<string | null>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const { push } = useRouter();

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true);
		const response = await loginUser(
			emailRef.current?.value!,
			passwordRef.current?.value!
		);
		if (response.code >= 400) {
			setFormError(response.message);
			setIsSubmitting(false);
			if (passwordRef.current) passwordRef.current!.value = '';
		} else {
			if (formError) setFormError(null);
			push('/');
		}
	};
	return (
		<>
			<AnimatePresence>
				{formError && (
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='text-red-500 text-center w-full bg-red-200 rounded px-4 py-2 flex justify-center items-center gap-2'>
						<CircleX />
						{formError}
					</motion.p>
				)}
			</AnimatePresence>

			<form className='flex flex-col gap-5' onSubmit={handleSubmit}>
				<div className='relative'>
					<input
						id='email-field'
						name='email'
						ref={emailRef}
						required
						className={`floating-input peer`}
						title='Email'
						type='text'
					/>
					<label className={`floating-label`} htmlFor='email-field'>
						Email
					</label>
				</div>

				<div className='relative'>
					<input
						id='password-field'
						name='password'
						ref={passwordRef}
						required
						className={`floating-input peer`}
						title='Password'
						type='password'
					/>
					<label
						htmlFor='password-field'
						className={`floating-label`}>
						Password
					</label>
				</div>
				<button
					disabled={isSubmitting}
					type='submit'
					title='sign in'
					className='uppercase font-bold text-white bg-purple-500 rounded px-4 py-2 transition-colors duration-300 focus:ring-1 focus:ring-purple-600 outline-purple-600 hover:bg-purple-600 disabled:bg-gray-500 flex justify-center items-center'>
					{isSubmitting ? (
						<Loader2 className='animate-spin' />
					) : (
						'Sign In'
					)}
				</button>
			</form>
		</>
	);
};

export default LoginForm;
