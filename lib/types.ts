export type ServerResponse = {
	code: number;
	message: string;
};

export type Track = {
	track: {
		track_id: number;
		track_name: string;
		artist_name: string;
	};
};
