import Link from 'next/link';

export default function NotFound() {
	return (
		<main className='max-h-screen w-full'>
			<div className='flex flex-col justify-center items-center h-screen gap-5'>
				<h2 className='text-5xl font-extrabold text-purple-800'>
					Oops!
				</h2>
				<p className='font-extralight'>
					Could not find requested resource
				</p>
				<Link
					className='rounded-full bg-purple-500 text-white px-2 py-1 transition-colors hover:bg-purple-600'
					href='/'>
					Return Home
				</Link>
			</div>
		</main>
	);
}
