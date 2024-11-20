import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Asia Motor Калькулятор',
    description: 'Asia Motor Калькулятор, рассчитай свой авто сам',
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
