export type ServerResponse = {
	code: number;
	message: string;
};

export type Track = {
	track: {
		track_id: number;
		track_name: string;
		artist_name: string;
		album_name: string;
	};
};

type TrackListData = { track_list: Track[] };
export type TrackListResponse = ServerResponse & { data?: TrackListData };

export type TrackResponse = ServerResponse & { data?: Track };

type LyricData = {
	lyrics: {
		lyrics_body: string;
		lyrics_language: string;
	};
};

export type LyricResponse = ServerResponse & { data?: LyricData };
