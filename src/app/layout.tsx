import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Inter } from 'next/font/google';

import StyledComponentsRegistry from '@/lib/registry';

import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Next.js Project Template',
    description: 'Next.js Project Template'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <StyledComponentsRegistry>
                    <AntdRegistry>{children}</AntdRegistry>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
