'use client';

import RefreshButton from '@/components/RefreshButton';

const LyricError = ({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) => {
	return (
		<>
			<div className='flex flex-col gap-2 items-center justify-center'>
				<p>Failed to load the lyrics</p>
				<RefreshButton reset={reset} />
			</div>
		</>
	);
};

export default LyricError;
