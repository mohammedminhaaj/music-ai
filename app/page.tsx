import MusicSearchBar from '@/components/MusicSearchBar';

const Home: React.FC = () => {
	return (
		<main className='min-h-screen w-full'>
			<div className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 has-[.search-result]:top-0 has-[.search-result]:translate-y-5 transition-all duration-300 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-5'>
				<section className='relative'>
					<MusicSearchBar />
				</section>
			</div>
		</main>
	);
};

export default Home;
