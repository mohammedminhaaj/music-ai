import { getLyrics } from '@/actions/track';
import TabView from '@/components/TabView';
import { notFound } from 'next/navigation';

const LyricsPage: React.FC<{
	params: { trackId: string };
}> = async ({ params: { trackId } }: { params: { trackId: string } }) => {
	const lyric = await getLyrics(trackId);
	if (lyric.code === 404) notFound();

	return <TabView lyrics={lyric.data?.lyrics.lyrics_body!} />;
};

export default LyricsPage;
