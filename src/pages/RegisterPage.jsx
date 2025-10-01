import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserStore } from "../Stores/UserStore.js"; 

const RegisterPage = () => {
    // Hooks de estado
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const { setUserInfo } = useUserStore();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setMessage(null);
        setIsLoading(true);

        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Las contraseñas no coinciden.' });
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Guarda la información del usuario en el store
                setUserInfo(data);
                navigate('/');
            } else {
                setMessage({ type: 'error', text: data.message || 'Error de registro. El email podría estar ya en uso.' });
            }
        } catch (error) {
            console.error('Error de red o servidor:', error);
            setMessage({ type: 'error', text: 'Error de conexión con el servidor.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // CONTENEDOR PRINCIPAL: Centra el formulario
        <div className='flex justify-center items-start pt-12 min-h-[calc(100vh-100px)]'>
            
            {/* TARJETA DEL FORMULARIO */}
            <div className='w-full max-w-lg p-8 rounded-xl shadow-2xl bg-white dark:bg-gray-800 transition-colors duration-500'>
                <h1 className='text-3xl font-extrabold text-center mb-6 text-gray-900 dark:text-white'>
                    Regístrate
                </h1>

                {/* Mensajes de error/éxito */}
                {message && (
                    <div className={`p-3 rounded-lg mb-4 text-sm font-medium ${
                        message.type === 'error' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'
                            : 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'
                    }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={submitHandler} className='space-y-6'>
                    {/* Campo Nombre */}
                    <div>
                        <label htmlFor='name' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Nombre</label>
                        <input
                            type='text'
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-yellow-500 focus:border-yellow-500'
                            required
                        />
                    </div>

                    {/* Campo Email */}
                    <div>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Email</label>
                        <input
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-yellow-500 focus:border-yellow-500'
                            required
                        />
                    </div>

                    {/* Campo Contraseña */}
                    <div>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Contraseña</label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-yellow-500 focus:border-yellow-500'
                            required
                        />
                    </div>

                    {/* Campo Confirmar Contraseña */}
                    <div>
                        <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>Confirmar Contraseña</label>
                        <input
                            type='password'
                            id='confirmPassword'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='mt-1 w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-yellow-500 focus:border-yellow-500'
                            required
                        />
                    </div>

                    {/* Botón de Submit */}
                    <button
                        type='submit'
                        disabled={isLoading}
                        className='w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-bold text-white bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
                    >
                        {isLoading ? 'Cargando...' : 'Registrarme'}
                    </button>
                </form>

                {/* Enlace a Login */}
                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-600 dark:text-gray-400">
                        ¿Ya tienes una cuenta?{' '}
                        <Link to='/login' className='text-yellow-600 dark:text-yellow-400 font-medium hover:underline'>
                            Inicia Sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
