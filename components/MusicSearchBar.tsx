'use client';

import { getSongList } from '@/actions/songs';
import { Track } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleX, Info, Loader2, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import SongItem from './SongItem';

type SongListState = {
	songList: Track[];
	isLoading: boolean;
	error: string | null;
};

const MusicSearchBar: React.FC = () => {
	const searchbarId = useId();
	const [searchText, setSearchText] = useState<string>('');
	const searchRef = useRef<HTMLInputElement>(null);
	const [{ songList, isLoading, error }, setSongList] =
		useState<SongListState>({
			songList: [],
			isLoading: true,
			error: null,
		});

	useEffect(() => {
		const timer = setTimeout(() => {
			if (searchText.length >= 3) {
				setSongList((prev: SongListState) => ({
					...prev,
					isLoading: true,
				}));
				const loadSongs = async () => {
					const response = await getSongList(searchText);
					if (response.code >= 400) {
						setSongList((prev: SongListState) => ({
							...prev,
							isLoading: false,
							error: response.message,
						}));
					} else {
						setSongList((prev: SongListState) => ({
							...prev,
							isLoading: false,
							error: null,
							songList: response.data?.track_list!,
						}));
					}
				};
				loadSongs();
			} else {
				songList.length &&
					setSongList((prev: SongListState) => ({
						...prev,
						isLoading: true,
						songList: [],
					}));
			}
		}, 500);

		return () => clearTimeout(timer);
	}, [searchText]);

	return (
		<>
			<label htmlFor={searchbarId} className='sr-only'>
				Search songs
			</label>
			<input
				id={searchbarId}
				ref={searchRef}
				placeholder='Search title, artist, or lyrics...'
				type='text'
				className='border w-full rounded-full py-4 pl-4 pr-10'
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
						className='absolute left-0 right-0 w-full rounded-xl shadow-2xl mt-5 p-5 flex justify-center items-center search-results'>
						{isLoading ? (
							<Loader2 className='animate-spin' />
						) : error ? (
							<p className='bg-red-500 text-white w-full rounded-lg font-bold text-center p-3 flex justify-center items-center gap-2'>
								<span>
									<CircleX />
								</span>
								{error}
							</p>
						) : songList.length ? (
							<ul className='space-y-2 w-full'>
								{songList.map((item) => (
									<SongItem
										key={item.track.track_id}
										songItem={item}
									/>
								))}
							</ul>
						) : (
							<p className='w-full text-center p-3 flex justify-center items-center gap-2'>
								<span>
									<Info />
								</span>
								No songs found for the search
							</p>
						)}
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default MusicSearchBar;
