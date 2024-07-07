import { getTrack } from '@/actions/track';
import { DiscAlbum, Music2, User } from 'lucide-react';
import { notFound } from 'next/navigation';

const TrackPage: React.FC<{
	params: { trackId: string };
}> = async ({ params: { trackId } }: { params: { trackId: string } }) => {
	const track = await getTrack(trackId);
	if (track.code === 404) notFound();

	return (
		<>
			<div className='bg-gray-200 size-48 flex items-center justify-center md:size-60 rounded-lg'>
				<Music2 size={60} className='rotate-12' />
			</div>
			<h2
				className='font-bold text-lg md:text-xl line-clamp-1'
				title={track.data?.track.track_name}>
				{track.data?.track.track_name}
			</h2>
			<h3 className='font-extralight flex justify-center items-center gap-2'>
				<User size={16} className='fill-black' />
				<span
					className='line-clamp-1'
					title={track.data?.track.artist_name}>
					{track.data?.track.artist_name}
				</span>
			</h3>
			<h3 className='font-extralight flex justify-center items-center gap-2'>
				<DiscAlbum size={16} />
				<span
					className='line-clamp-1'
					title={track.data?.track.album_name}>
					{track.data?.track.album_name}
				</span>
			</h3>
		</>
	);
};

export default TrackPage;
