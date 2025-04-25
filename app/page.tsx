import { Metadata } from 'next';
import CaesarCipher from './CaesarCipher';

export const metadata: Metadata = {
    title: 'Caesar Cipher Tool',
    description: 'Encrypt and decrypt text using the Caesar Cipher with ease.',
    icons: {
        icon: '/favicon.ico',
    },
};

export default function Home() {
    return <CaesarCipher />;
}
