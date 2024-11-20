import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Asia Motors Калькулятор',
    description: 'Asia Motors Калькулятор, рассчитай свой авто сам',
    manifest: '/site.webmanifest',
    icons: {
        icon: [
            { url: '/img/favicon.ico' },
            {
                url: '/img/favicon-16x16.png',
                sizes: '16x16',
                type: 'image/png',
            },
            {
                url: '/img/favicon-32x32.png',
                sizes: '32x32',
                type: 'image/png',
            },
        ],
        apple: [{ url: '/apple-touch-icon.png' }],
        other: [
            {
                rel: 'mask-icon',
                url: '/safari-pinned-tab.svg',
                color: '#5bbad5',
            },
        ],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ru">
            <body className={`antialiased container`}>{children}</body>
        </html>
    )
}
