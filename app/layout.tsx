import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({ weight: '400', subsets: ["latin"] });

export const metadata: Metadata = {
	title: 'MusicAI',
	description: 'Explore the depths of your favorite songs with Music AI. Search for any song, and uncover the true meaning behind the music',
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
