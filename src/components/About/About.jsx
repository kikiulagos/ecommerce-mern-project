import Title from '../Title/Title';
import { Link } from 'react-router-dom';

export default function AboutPage() {
    return (
        <div className="container mx-auto max-w-[1170px] pt-16 pb-24">
            <Title 
                text="Acerca de Nosotros" 
                level={1} 
                className="text-5xl font-semibold mb-8 text-black tracking-tight" 
            />
            <div className="text-gray-800 mb-8">
                <p className="text-lg mb-4">
                    En LP, nos dedicamos a ofrecer los mejores productos de calidad para nuestros clientes. 
                    Nuestra misión es proporcionar una experiencia de compra excepcional y productos que realmente hagan la diferencia.
                </p>
                <p className="text-lg mb-4">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis nisi quia iusto veritatis, deleniti quaerat, ut sit fugiat possimus assumenda necessitatibus! Neque expedita laboriosam animi! Sint sit fugit enim nesciunt!
                </p>
                <p className="text-lg mb-4">
                    Nos enorgullece ofrecer productos que cumplen con los más altos estándares de calidad y sostenibilidad. 
                    Creemos en los valores de la empresa, como entregar siempre la mejor calidad y servicio a nuestros clientes.
                </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
                <h2 className="text-2xl font-semibold mb-4">Nuestra Visión</h2>
                <p className="text-lg text-gray-700 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est consequatur laboriosam rem officiis odio? Illo nemo, error ea iusto libero eos eveniet, ab repellendus suscipit laboriosam temporibus corrupti. Nesciunt, quo.
                </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md mt-4">
                <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
                <p className="text-lg text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, assumenda similique! Corrupti molestias repudiandae numquam nobis ab praesentium, vero non veritatis. Fugit, distinctio inventore illum cupiditate sequi eveniet excepturi. Perferendis.
                </p>
            </div>
            <div className="mt-8">
                <Link to="/contact">
                    <button className="bg-gray-900 text-white text-lg px-4 py-2 transition duration-300 hover:bg-gray-800">
                        Contáctanos
                    </button>
                </Link>
            </div>
        </div>
    );
}