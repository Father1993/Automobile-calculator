import Main from '@/components/Main'
import Header from '@/components/templates/Header/Header'

export default function Home() {
    return (
        <div>
            <Header />
            <main className="main">
                <Main />
            </main>
        </div>
    )
}
