import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Track Details | MusicAI',
};

type TrackDetailsLayoutProps = {
	children: React.ReactNode;
	track: React.ReactNode;
	lyrics: React.ReactNode;
};

const TrackDetailsLayout: React.FC<TrackDetailsLayoutProps> = ({
	children,
	track,
	lyrics,
}: TrackDetailsLayoutProps) => {
	return (
		<main className='min-h-screen w-full p-5 md:px-10 space-y-5 bg-gradient-to-tr from-purple-50 to-purple-100'>
			{children}
			<section className='grid grid-rows-6 grid-cols-2 md:grid-cols-6 md:grid-rows-2 gap-5'>
				<section className='row-span-2 col-span-2 md:col-span-2 md:row-span-2 justify-self-center self-start flex flex-col gap-2 items-center justify-center pb-5 md:pb-0 md:pr-5 border-b md:border-b-0 md:border-r border-purple-900'>
					{track}
				</section>
				<section className='row-span-4 col-span-2 md:col-span-4 md:row-span-2 text-center md:text-left'>
					{lyrics}
				</section>
			</section>
		</main>
	);
};

export default TrackDetailsLayout;
