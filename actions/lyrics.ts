'use server';

import { HfInference } from '@huggingface/inference';
import nlp from 'compromise';

const getSummary = async (lyrics: string) => {
	// Initialize the inference API
	const inference = new HfInference(process.env.HUGGINGFACE_API);

	let generatedText: string = '';

	// Get all the chunck and store it in generatedText
	for await (const chunk of inference.chatCompletionStream({
		// use Phi-3 model
		model: 'microsoft/Phi-3-mini-4k-instruct',

		// Instructions
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
		// Define maximum number of tokens
		max_tokens: 500,
	})) {
		// Append the chunks
		generatedText += chunk.choices[0]?.delta?.content || '';
	}

	return generatedText;
};

export const summarize = async (lyrics: string) => {
	// Initialize compromise with the lyrics
	const doc = nlp(lyrics);
	const cleanedLyrics = doc
		.trim() // Remove leading and trailing whitespace
		.normalize(); // Normalize whitespace, unicode, and expand contractions

	// Get the summary
	const summary = await getSummary(cleanedLyrics.text());

	// Get list of countries from the lyrics
	const namedEntities = cleanedLyrics
		.match('#Country')
		.out('array') as string[];
	return {
		summary,
		countries: Array.from(new Set(namedEntities)), // Use set to remove repeated countries
	};
};
