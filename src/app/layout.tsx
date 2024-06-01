import { AntdRegistry } from '@ant-design/nextjs-registry';

import StyledComponentsRegistry from '@/lib/registry';

import type { Metadata } from 'next';
import './globals.css';

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
        <html>
            <body>
                <StyledComponentsRegistry>
                    <AntdRegistry>{children}</AntdRegistry>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
