import Image from 'next/image'

const Header = () => {
    return (
        <header className="flex justify-center">
            <Image
                className="logo"
                src="/img/original.png"
                alt="AsiaMotors logo"
                width={300}
                height={300}
            />
        </header>
    )
}

export default Header
