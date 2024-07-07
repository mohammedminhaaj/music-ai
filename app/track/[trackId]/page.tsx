import LogoutButton from '@/components/LogoutButton';
import MusicSearchBar from '@/components/MusicSearchBar';

const TrackDetails: React.FC = async () => {
	return (
		<header className='group flex items-center gap-4'>
			<section className='relative mx-auto w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
				<MusicSearchBar />
			</section>
			<div className='group-has-[.search-result]:hidden md:group-has-[.search-result]:block'>
				<LogoutButton />
			</div>
		</header>
	);
};

export default TrackDetails;
