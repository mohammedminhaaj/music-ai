import LogoutButton from '@/components/LogoutButton';
import MusicSearchBar from '@/components/MusicSearchBar';
import { LogOut } from 'lucide-react';

const Home: React.FC = () => {
	return (
		<main className='group bg-gradient-to-tr from-violet-300 to-purple-900 min-h-screen w-full relative py-10 px-5 backdrop-blur-3xl'>
			<header className='flex justify-end group-has-[.search-result]:hidden md:group-has-[.search-result]:flex'>
				<LogoutButton />
			</header>
			<div className='absolute z-20 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 has-[.search-result]:top-0 has-[.search-result]:translate-y-5 transition-all duration-300 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-5'>
				<section className='relative'>
					<MusicSearchBar />
				</section>
			</div>
			<section className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-28 md:-translate-y-32 text-center w-full'>
				<h1 className='font-extrabold text-white text-4xl md:text-6xl'>
					Music
					<span className='bg-gradient-to-br from-violet-400 to-purple-200 inline-block text-transparent bg-clip-text'>
						AI
					</span>
				</h1>
				<h2 className='font-extralight text-purple-50'>
					A new way of discovering music
				</h2>
			</section>
		</main>
	);
};

export default Home;
