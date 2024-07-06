import { Track } from '@/lib/types';
import { Music } from 'lucide-react';

const SongItem: React.FC<{ songItem: Track }> = ({
	songItem,
}: {
	songItem: Track;
}) => (
	<li className='group flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white p-2 rounded-lg transition-colors duration-300'>
		<div className='basis-1/5 rounded-md size-16 bg-gray-100 group-hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center'>
			<Music className='text-black' />
		</div>
		<div className='basis-4/5 flex flex-col items-start justify-start w-full'>
			<h3
				title={songItem.track.track_name}
				className='font-bold line-clamp-1'>
				{songItem.track.track_name}
			</h3>
			<em className='font-extralight text-xs line-clamp-1'>
				{songItem.track.artist_name}
			</em>
		</div>
	</li>
);

export default SongItem;
