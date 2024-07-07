'use client';

import { summarize } from '@/actions/lyrics';

import { Sparkles } from 'lucide-react';
import { memo, useEffect, useState } from 'react';

type SummaryState = {
	summary: string;
	countries: string[];
	isLoading: boolean;
};

const SummarySection: React.FC<{ lyrics: string; className?: string }> = memo(
	({ lyrics, className }: { lyrics: string; className?: string }) => {
		const [{ summary, countries, isLoading }, setSummaryState] =
			useState<SummaryState>({
				summary: '',
				countries: [],
				isLoading: true,
			});
		useEffect(() => {
			if (isLoading) {
				const summarizeLyrics = async () => {
					const { summary, countries } = await summarize(lyrics);
					setSummaryState((prev: SummaryState) => ({
						...prev,
						summary: summary,
						countries: countries,
						isLoading: false,
					}));
				};
				summarizeLyrics();
			}
		}, [lyrics]);
		return (
			<div className={`space-y-3 ${className}`}>
				{isLoading ? (
					<p className='inline-flex items-center gap-2 text-xs'>
						<span className='animate-pulse'>
							<Sparkles className='stroke-purple-600 fill-purple-600' />
						</span>
						Analyzing the lyrics...
					</p>
				) : (
					<>
						<p className='text-xs'>{summary}</p>
						{countries.length !== 0 && (
							<>
								<p className='font-bold text-xs'>
									Countries Mentioned
								</p>
								<ul className='inline-flex gap-3 flex-wrap'>
									{countries.map((country, index) => (
										<li
											className='text-xs rounded-full py-1 px-2 font-extralight bg-purple-600 text-white'
											key={index}>
											{country}
										</li>
									))}
								</ul>
							</>
						)}
					</>
				)}
			</div>
		);
	}
);

const LyricSection: React.FC<{ formattedLyrics: string; className?: string }> =
	memo(
		({
			formattedLyrics,
			className,
		}: {
			formattedLyrics: string;
			className?: string;
		}) => (
			<p
				dangerouslySetInnerHTML={{ __html: formattedLyrics! }}
				className={`text-xs ${className}`}></p>
		)
	);

const TabView: React.FC<{ lyrics: string }> = ({
	lyrics,
}: {
	lyrics: string;
}) => {
	const [tab, setTab] = useState<0 | 1>(0);
	const formattedLyrics = lyrics.replaceAll(/\n/g, '<br />');

	return (
		<div className='space-y-5'>
			<section className='inline-flex gap-5'>
				<button
					className={`border-b-2 px-2 ${
						tab === 0 && 'border-b-purple-600'
					}`}
					onClick={() => setTab(0)}
					type='button'
					title='summary'>
					Summary
				</button>
				<button
					className={`border-b-2 px-2 ${
						tab === 1 && 'border-b-purple-600'
					}`}
					onClick={() => setTab(1)}
					type='button'
					title='lyrics'>
					Lyrics
				</button>
			</section>
			<section className='space-y-2'>
				<SummarySection
					lyrics={lyrics}
					className={tab === 0 ? 'block' : 'hidden'}
				/>
				<LyricSection
					formattedLyrics={formattedLyrics}
					className={tab === 1 ? 'block' : 'hidden'}
				/>
			</section>
		</div>
	);
};

export default TabView;
