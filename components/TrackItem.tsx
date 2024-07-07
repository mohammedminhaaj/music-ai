import { Track } from '@/lib/types';
import { DiscAlbum, Music, User } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

const TrackItem: React.FC<{ trackItem: Track }> = ({
	trackItem,
}: {
	trackItem: Track;
}) => (
	<motion.li variants={itemVariants} transition={{ bounce: 0 }}>
		<Link
			href={`/track/${trackItem.track.track_id}`}
			className='group flex items-center justify-center gap-2 hover:bg-purple-600 hover:text-white p-2 rounded-lg transition-colors duration-300'>
			<div className='rounded-md size-16 bg-purple-100 group-hover:bg-purple-300 transition-colors duration-300 flex items-center justify-center'>
				<Music className='text-black' />
			</div>
			<div className='flex flex-col items-start justify-start w-full'>
				<h3
					title={trackItem.track.track_name}
					className='font-bold line-clamp-1'>
					{trackItem.track.track_name}
				</h3>
				<span className='font-extralight text-xs flex gap-1 items-center'>
					<User
						size={15}
						className='fill-black group-hover:fill-white'
					/>
					<p className='line-clamp-1'>
						{trackItem.track.artist_name}
					</p>
				</span>
				<span className='font-extralight text-xs flex gap-1 items-center'>
					<DiscAlbum size={15} />
					<p className='line-clamp-1'>{trackItem.track.album_name}</p>
				</span>
			</div>
		</Link>
	</motion.li>
);

export default TrackItem;
