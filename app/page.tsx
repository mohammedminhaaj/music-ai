import MusicSearchBar from '@/components/MusicSearchBar';

const Home: React.FC = () => {
	return (
		<main className='min-h-screen w-full flex flex-col justify-center has-[.search-results]:justify-start transition-all duration-300 items-center p-5'>
			<section className='relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
				<MusicSearchBar />
			</section>
		</main>
	);
};

export default Home;
