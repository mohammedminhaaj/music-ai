import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
	weight: ['100', '200', '300', '400', '500'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'MusicAI',
	description:
		'Explore the depths of your favorite tracks with Music AI. Search for any tracks, and uncover the true meaning behind the music',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={poppins.className}>{children}</body>
		</html>
	);
}
