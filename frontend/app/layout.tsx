import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | BooztFrog',
    default: 'BooztFrog - Tap. Scan. Boozt.',
  },
  description:
    'Get more customer reviews with NFC and QR products. BooztFrog makes collecting reviews effortless.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
