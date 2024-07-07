'use server';

import {
	LyricResponse,
	ServerResponse,
	TrackListResponse,
	TrackResponse,
} from '@/lib/types';

const baseUrl = 'http://api.musixmatch.com/ws/1.1';

export const getTrackList: (
	searchText: string
) => Promise<TrackListResponse> = async (searchText: string) => {
	const key: string | undefined = process.env.MUSIXMATCH_API;
	if (!key)
		return {
			code: 500,
			message: 'Invalid API Key',
		} as ServerResponse;
	const url = `${baseUrl}/track.search?apikey=${key}&q=${searchText}&page_size=5&f_lyrics_language=en&f_has_lyrics`;
	try {
		const response = await fetch(url);
		const data = await response.json();

		return {
			code: 200,
			message: 'Success',
			data: data.message.body,
		} as TrackListResponse;
	} catch {
		return {
			code: 400,
			message: 'Something went wrong',
		} as ServerResponse;
	}
};

export const getTrack: (trackId: string) => Promise<TrackResponse> = async (
	trackId: string
) => {
	const key: string | undefined = process.env.MUSIXMATCH_API;
	if (!key) throw new Error('Invalid API Key');

	const url = `${baseUrl}/track.get?apikey=${key}&track_id=${trackId}`;

	const response = await fetch(url);
	const data = await response.json();

	const status_code: number = data.message.header.status_code;

	if (status_code === 404) {
		return {
			code: 404,
			message: 'Track not found',
		};
	} else if (status_code >= 400) {
		throw new Error('Something went wrong!');
	} else {
		return {
			code: 200,
			message: 'Success',
			data: data.message.body,
		} as TrackResponse;
	}
};

export const getLyrics: (trackId: string) => Promise<LyricResponse> = async (
	trackId: string
) => {
	const key: string | undefined = process.env.MUSIXMATCH_API;
	if (!key) throw new Error('Invalid API Key');

	const url = `${baseUrl}/track.lyrics.get?apikey=${key}&track_id=${trackId}`;

	const response = await fetch(url);
	const data = await response.json();

	const status_code: number = data.message.header.status_code;

	if (status_code === 404) {
		return {
			code: 404,
			message: 'Lyric not found',
		};
	} else if (status_code >= 400) {
		throw new Error('Something went wrong!');
	} else {
		return {
			code: 200,
			message: 'Success',
			data: data.message.body,
		} as LyricResponse;
	}
};
