const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
			<header className='p-5'>
				<h1 className='text-2xl font-bold'>
					Music
					<span className='bg-gradient-to-r from-violet-400 to-purple-900 inline-block text-transparent bg-clip-text'>
						AI
					</span>
				</h1>
			</header>
			<main className='flex flex-col mx-auto w-11/12 md:w-5/12 lg:4/12 gap-10'>
				<div className='flex flex-col gap-5 shadow-xl p-10 rounded-xl'>
					{children}
				</div>
			</main>
		</>
	);
};

export default AuthLayout;
