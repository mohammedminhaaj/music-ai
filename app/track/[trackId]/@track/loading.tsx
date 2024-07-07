const TrackLoading: React.FC = () => {
	return (
		<>
			<div className='bg-gray-200 size-48 flex items-center justify-center md:size-60 rounded-lg animate-pulse'></div>
			<div className='bg-gray-200 h-4 w-28 rounded-lg animate-pulse'></div>
			<div className='bg-gray-200 h-4 w-24 rounded-lg animate-pulse'></div>
			<div className='bg-gray-200 h-4 w-20 rounded-lg animate-pulse'></div>
		</>
	);
};

export default TrackLoading;
