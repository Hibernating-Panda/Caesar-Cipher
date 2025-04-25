'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const CaesarCipher = () => {
    const [text, setText] = useState('');
    const [text1, setText1] = useState('');
    const [shift, setShift] = useState<number | undefined>();
    const [result, setResult] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [variantError, setVariantError] = useState('');

    const caesarCipher = (str: string, shift: number): string => {
        const normalizedShift = ((shift % 26) + 26) % 26;
        return str
            .toUpperCase()
            .replace(/[^A-Z ]/g, '')
            .replace(/[A-Z]/g, (char) => {
                const label = char.charCodeAt(0) - 65;
                const shiftedLabel = (label + normalizedShift) % 26;
                return String.fromCharCode(shiftedLabel + 65);
            });
    };

    const handleEncrypt = () => setResult(caesarCipher(text, shift!));
    const handleDecrypt = () => setResult(caesarCipher(text, -shift!));

    const caesarCipherVariants = (str: string): string[] => {
        return Array.from({ length: 25 }, (_, i) => {
            const s = i + 1;
            return `Shift ${s}: ${caesarCipher(str, s)}`;
        });
    };

    const handleDecryptAll = () => setResults(caesarCipherVariants(text1));

    return (
        <main className="min-h-screen flex-col w-full items-center justify-center bg-gray-100 p-4">
            <div className="text-center text-5xl font-bold flex w-full justify-center items-center">
                Caesar Cipher
            </div>

            {/* Decrypt With Shift */}
            <div className="flex items-center justify-center mt-10">
                <Card className="w-full max-w-md shadow-2xl flex">
                    <CardContent className="px-4 space-y-4 w-full">
                        <h1 className="text-2xl font-bold text-center">Decrypt With Shift</h1>
                        <Input
                            placeholder="Enter text"
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value.toUpperCase().replace(/[^A-Z ]/g, ''));
                                setError('');
                            }}
                        />
                        <Input
                            type="number"
                            placeholder="Enter shift"
                            value={shift !== undefined ? shift.toString() : ''}
                            onChange={(e) => {
                                setShift(Number(e.target.value));
                                setError('');
                            }}
                        />
                        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                onClick={() => {
                                    if (!text.trim()) return setError('Please enter some text.');
                                    if (shift === undefined || isNaN(shift)) return setError('Please enter a valid shift value.');
                                    setError('');
                                    handleEncrypt();
                                }}
                            >
                                Encrypt
                            </Button>
                            <Button
                                onClick={() => {
                                    if (!text.trim()) return setError('Please enter some text.');
                                    if (shift === undefined || isNaN(shift)) return setError('Please enter a valid shift value.');
                                    setError('');
                                    handleDecrypt();
                                }}
                            >
                                Decrypt
                            </Button>
                        </div>
                        <div className="bg-white p-3 rounded-lg border text-sm text-gray-700">
                            <strong>Result:</strong> {result || ''}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Decrypt All Variants */}
            <div className="flex items-center justify-center mt-5">
                <Card className="w-full max-w-md shadow-2xl flex">
                    <CardContent className="px-4 space-y-4 w-full">
                        <h1 className="text-2xl font-bold text-center">Decrypt All Variants</h1>
                        <Input
                            placeholder="Enter text"
                            value={text1}
                            onChange={(e) => {
                                setText1(e.target.value.toUpperCase().replace(/[^A-Z ]/g, ''));
                                setVariantError('');
                            }}
                        />
                        {variantError && <p className="text-red-500 text-sm font-medium">{variantError}</p>}
                        <Button
                            onClick={() => {
                                if (!text1.trim()) return setVariantError('Please enter text to decrypt.');
                                setVariantError('');
                                handleDecryptAll();
                            }}
                        >
                            Decrypt
                        </Button>
                        <div className="bg-white p-3 rounded-lg border text-sm text-gray-700 space-y-1">
                            <strong>Results:</strong>
                            <ul className="list-disc list-inside space-y-1">
                                {results.map((line, index) => (
                                    <li key={index}>{line}</li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};

export default CaesarCipher;
