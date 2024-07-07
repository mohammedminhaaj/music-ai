'use server';

import { HfInference } from '@huggingface/inference';
import nlp from 'compromise';

const getSummary = async (lyrics: string) => {
	const inference = new HfInference(process.env.HUGGINGFACE_API);
	let generatedText: string = '';

	for await (const chunk of inference.chatCompletionStream({
		model: 'microsoft/Phi-3-mini-4k-instruct',
		messages: [
			{
				role: 'system',
				content:
					"You are a professional summarizer. \
                Given a song lyrics, you need to tell me what the song is about in a single sentence. \
                The sentence should start with 'The song is about...'.",
			},
			{ role: 'user', content: `The lyrics are: ${lyrics}` },
		],
		max_tokens: 500,
	})) {
		generatedText += chunk.choices[0]?.delta?.content || '';
	}

	return generatedText;
};

export const summarize = async (lyrics: string) => {
	const doc = nlp(lyrics);
	const cleanedLyrics = doc
		.trim() // Remove leading and trailing whitespace
		.normalize(); // Normalize whitespace, unicode, and expand contractions
	const summary = await getSummary(cleanedLyrics.text());
	const namedEntities = cleanedLyrics
		.match('#Country')
		.out('array') as string[];
	return {
		summary,
		countries: Array.from(new Set(namedEntities)),
	};
};
