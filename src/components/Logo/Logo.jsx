import './Logo.css';

export default function Logo() {
    const logoSrc = '/logo.png'; 

    return (
        <a href="/" className="milogo">
            <img src={logoSrc} alt="Logo" />
            <div className="nombre dark:text-white">LP</div>
        </a>
    );
}