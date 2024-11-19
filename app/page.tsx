import Main from '@/components/Main'
import Header from '@/components/templates/Header/Header'

export default function Home() {
    return (
        <div>
            <Header />
            <main className="main">
                <Main />
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
        </div>
    )
}
