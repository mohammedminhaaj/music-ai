import { RefreshCcw } from 'lucide-react';

const RefreshButton: React.FC<{ reset: () => void }> = ({
	reset,
}: {
	reset: () => void;
}) => (
	<button
		className='rounded-full flex gap-2 items-center justify-center md:px-2 md:py-1 p-2 bg-purple-600 text-white transition-all duration-300 hover:gap-3 hover:bg-transparent hover:text-black'
		onClick={() => reset()}>
		<RefreshCcw size={16} strokeWidth={1} />
		<p className='hidden md:block'>Try again</p>
	</button>
);

export default RefreshButton;
