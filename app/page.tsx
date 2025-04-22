"use client";

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

    const caesarCipher = (str: string, shift: number): string => {
        const normalizedShift = ((shift % 26) + 26) % 26;
        return str
            .toUpperCase()
            .replace(/[^A-Z ]/g, '') // allow spaces
            .replace(/[A-Z]/g, (char) => {
                const label = char.charCodeAt(0) - 65;
                const shiftedLabel = (label + normalizedShift) % 26;
                return String.fromCharCode(shiftedLabel + 65);
            });
    };

    const handleEncrypt = () => {
        setResult(caesarCipher(text, parseInt(String(shift))));
    };

    const handleDecrypt = () => {
        setResult(caesarCipher(text, -parseInt(String(shift))));
    };

    const caesarCipherVariants = (str: string): string[] => {
        const results: string[] = [];
        for (let shift = 1; shift < 26; shift++) {
            const encrypted = caesarCipher(str, shift);
            results.push(`Shift ${shift}: ${encrypted}`);
        }
        return results;
    };

    const handleDecryptAll = () => {
        setResults(caesarCipherVariants(text1));
    };

    const [error, setError] = useState('');
    const [variantError, setVariantError] = useState('');

    return (
        <main className="min-h-screen flex-col w-full items-center justify-center bg-gray-100 p-4">
            <div className="text-center text-5xl font-bold flex w-full justify-center items-center">
                Caesar Cipher
            </div>

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
                        {error && (
                            <p className="text-red-500 text-sm font-medium">{error}</p>
                        )}
                        <div className="grid grid-cols-2 items-center justify-between w-full gap-2">
                            <Button
                                onClick={() => {
                                    if (!text.trim()) {
                                        setError('Please enter some text.');
                                        return;
                                    }
                                    if (shift === undefined || isNaN(shift)) {
                                        setError('Please enter a valid shift value.');
                                        return;
                                    }
                                    setError('');
                                    handleEncrypt();
                                }}
                                className="flex col-span-1"
                            >
                                Encrypt
                            </Button>
                            <Button
                                onClick={() => {
                                    if (!text.trim()) {
                                        setError('Please enter some text.');
                                        return;
                                    }
                                    if (shift === undefined || isNaN(shift)) {
                                        setError('Please enter a valid shift value.');
                                        return;
                                    }
                                    setError('');
                                    handleDecrypt();
                                }}
                                className="flex col-span-1"
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
                        {variantError && (
                            <p className="text-red-500 text-sm font-medium">{variantError}</p>
                        )}
                        <div className="grid grid-cols-1 items-center justify-between w-full gap-2">
                            <Button
                                onClick={() => {
                                    if (!text1.trim()) {
                                        setVariantError('Please enter text to decrypt.');
                                        return;
                                    }
                                    setVariantError('');
                                    handleDecryptAll();
                                }}
                                className="flex col-span-1"
                            >
                                Decrypt
                            </Button>
                        </div>
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
