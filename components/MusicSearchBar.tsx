'use client';

import { getTrackList } from '@/actions/track';
import { Track } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleX, Info, Loader2, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import TrackItem from './TrackItem';

type TrackListState = {
	trackList: Track[];
	isLoading: boolean;
	error: string | null;
};

const MusicSearchBar: React.FC = () => {
	const searchbarId = useId();
	const [searchText, setSearchText] = useState<string>('');
	const searchRef = useRef<HTMLInputElement>(null);
	const [{ trackList, isLoading, error }, setTrackList] =
		useState<TrackListState>({
			trackList: [],
			isLoading: true,
			error: null,
		});

	useEffect(() => {
		const timer = setTimeout(() => {
			if (searchText.length >= 3) {
				setTrackList((prev: TrackListState) => ({
					...prev,
					isLoading: true,
				}));
				const loadTracks = async () => {
					const response = await getTrackList(searchText);
					if (response.code >= 400) {
						setTrackList((prev: TrackListState) => ({
							...prev,
							isLoading: false,
							error: response.message,
						}));
					} else {
						setTrackList((prev: TrackListState) => ({
							...prev,
							isLoading: false,
							error: null,
							trackList: response.data?.track_list!,
						}));
					}
				};
				loadTracks();
			} else {
				trackList.length &&
					setTrackList((prev: TrackListState) => ({
						...prev,
						isLoading: true,
						trackList: [],
					}));
			}
		}, 500);

		return () => clearTimeout(timer);
	}, [searchText]);

	return (
		<>
			<label htmlFor={searchbarId} className='sr-only'>
				Search tracks
			</label>
			<input
				spellCheck={false}
				autoCorrect='false'
				autoComplete='false'
				id={searchbarId}
				ref={searchRef}
				placeholder='Search title, artist, or lyrics...'
				type='text'
				className={`border w-full rounded-full py-4 pl-4 ${searchText.length ? "pr-10" : "pr-4"}`}
				onChange={(event) => {
					setSearchText(event.target.value);
				}}
			/>
			{searchText !== '' && (
				<button
					type='button'
					onClick={() => {
						setSearchText('');
						if (searchRef.current) searchRef.current.value = '';
					}}
					title='clear search'
					className='absolute top-4 right-4 text-gray-400'>
					<X />
				</button>
			)}

			<AnimatePresence>
				{searchText.length >= 3 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='absolute bg-white z-10 left-0 right-0 w-full rounded-xl shadow-2xl mt-5 p-5 flex justify-center items-center search-result'>
						{isLoading ? (
							<Loader2 className='animate-spin' />
						) : error ? (
							<p className='bg-red-500 text-white w-full rounded-lg font-bold text-center p-3 flex justify-center items-center gap-2'>
								<span>
									<CircleX />
								</span>
								{error}
							</p>
						) : trackList.length ? (
							<ul className='space-y-2 w-full'>
								{trackList.map((item) => (
									<TrackItem
										key={item.track.track_id}
										trackItem={item}
									/>
								))}
							</ul>
						) : (
							<p className='w-full text-center p-3 flex justify-center items-center gap-3'>
								<span>
									<Info />
								</span>
								No tracks found for the search
							</p>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default MusicSearchBar;
