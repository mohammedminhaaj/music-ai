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
	// Get the key from .env
	const key: string | undefined = process.env.MUSIXMATCH_API;

	// Check if the key is present
	if (!key)
		return {
			code: 500,
			message: 'Invalid API Key',
		} as ServerResponse;

	// Contruct the URL
	const url = `${baseUrl}/track.search?apikey=${key}&q=${searchText}&page_size=5&f_lyrics_language=en&f_has_lyrics`;
	try {
		// Fetch the result
		const response = await fetch(url);
		const data = await response.json();

		// Return the body
		return {
			code: 200,
			message: 'Success',
			data: data.message.body,
		} as TrackListResponse;
	} catch {
		// Return the message when error is triggered
		return {
			code: 400,
			message: 'Something went wrong',
		} as ServerResponse;
	}
};

export const getTrack: (trackId: string) => Promise<TrackResponse> = async (
	trackId: string
) => {
	// Get the key from .env
	const key: string | undefined = process.env.MUSIXMATCH_API;

	// Throw an error if the key is not present
	if (!key) throw new Error('Invalid API Key');

	// Construct the url
	const url = `${baseUrl}/track.get?apikey=${key}&track_id=${trackId}`;

	const response = await fetch(url);
	const data = await response.json();

	// Get the status code of the response
	const status_code: number = data.message.header.status_code;

	// Return message if the track is not available
	if (status_code === 404) {
		return {
			code: 404,
			message: 'Track not found',
		};
	} else if (status_code >= 400) {
		// Throw an error if the status code is greater than 400
		throw new Error('Something went wrong!');
	} else {
		// Return results if success
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
	// Get the key from .env
	const key: string | undefined = process.env.MUSIXMATCH_API;

	// Throw an error if the key is unavailable
	if (!key) throw new Error('Invalid API Key');

	// Construct the URL
	const url = `${baseUrl}/track.lyrics.get?apikey=${key}&track_id=${trackId}`;

	const response = await fetch(url);
	const data = await response.json();

	// Get the status code of the response
	const status_code: number = data.message.header.status_code;

	// Check if the lyrics are unavailable
	if (status_code === 404) {
		return {
			code: 404,
			message: 'Lyric not found',
		};
	} else if (status_code >= 400) {
		// Throw an error if the status code is more than 400
		throw new Error('Something went wrong!');
	} else {
		// Return if success
		return {
			code: 200,
			message: 'Success',
			data: data.message.body,
		} as LyricResponse;
	}
};
