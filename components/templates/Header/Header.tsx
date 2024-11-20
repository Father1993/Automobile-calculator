import Image from 'next/image'
import logo from '@/public/img/original.png'

const Header = () => {
    return (
        <header className="flex justify-center">
            <Image
                className="logo"
                src={logo}
                alt="Asia Motors logo"
                width={200}
                height={200}
                priority
            />
        </header>
    )
}

export default Header
