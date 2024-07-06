'use server';

import { ServerResponse, Track } from '@/lib/types';

type TrackListData = { track_list: Track[] };
type SongListResponse = ServerResponse & { data?: TrackListData };

export const getSongList: (
	searchText: string
) => Promise<SongListResponse> = async (searchText: string) => {
	const key: string | undefined = process.env.MUSIXMATCH_API;
	if (!key)
		return {
			code: 500,
			message: 'Invalid API Key',
		} as ServerResponse;
	const url = `http://api.musixmatch.com/ws/1.1/track.search?apikey=${key}&q=${searchText}&page_size=5`;
	try {
		const response = await fetch(url);
		const data = await response.json();

		return {
			code: 200,
			message: 'Success',
			data: data.message.body,
		} as SongListResponse;
	} catch {
		return {
			code: 400,
			message: 'Something went wrong',
		} as ServerResponse;
	}
};
