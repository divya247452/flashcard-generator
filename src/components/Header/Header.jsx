import { Link } from 'react-router-dom';

// Renders the Logo of the App at the top.
export default function Header() {
    return (
        <header className='bg-white h-[60px] px-5 py-[5px] shadow-lg'>
            <Link to={'/'}>
                <img src={`${process.env.PUBLIC_URL}/assets/logo.webp`} className="h-full cursor-pointer" alt="Logo" />
            </Link>
        </header>
    );
}