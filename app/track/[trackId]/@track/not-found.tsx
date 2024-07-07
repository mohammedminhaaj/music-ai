import { CircleHelp } from 'lucide-react';
import Link from 'next/link';

const TrackNotFound: React.FC = () => {
	return (
		<>
			<div className='bg-gray-200 size-48 flex items-center justify-center md:size-60 rounded-lg'>
				<CircleHelp size={60} />
			</div>
			<h2 className='font-bold'>Track Not Found</h2>
			<Link href='/' className='underline'>Return Home</Link>
		</>
	);
};

export default TrackNotFound;
