import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: '', email: '', telefono: '', empresa: '', comentarios: '', privacidad: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Contacto</h1>
      <p className="text-lg mb-10 text-gray-600">
        ¡Envíanos tus datos y nos pondremos en contacto contigo!
      </p>

      {/* Formulario con estilo de tarjeta */}
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6 text-gray-900">
        
        {/* Campo Nombre */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="nombre">Nombre</label>
          <input 
            type="text" 
            name="nombre" 
            id="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>
        
        {/* Campo Email */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>
        
        {/* Campo Teléfono */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="telefono">Teléfono</label>
          <input 
            type="tel" 
            name="telefono" 
            id="telefono" 
            value={formData.telefono} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
        </div>
        
        {/* Campo Empresa */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="empresa">Empresa (Solo si tiene)</label>
          <input 
            type="text" 
            name="empresa" 
            id="empresa" 
            value={formData.empresa} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        
        {/* Campo Comentarios */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="comentarios">Comentarios</label>
          <textarea 
            name="comentarios" 
            id="comentarios" 
            value={formData.comentarios} 
            onChange={handleChange} 
            rows="4" 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Checkbox de Privacidad */}
        <div className="flex items-center">
          <input 
            type="checkbox" 
            name="privacidad" 
            id="privacidad" 
            checked={formData.privacidad} 
            onChange={handleChange} 
            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
            required 
          />
          <label className="text-gray-700 text-sm" htmlFor="privacidad">Acepto la política de privacidad</label>
        </div>

        {/* Botón de Enviar */}
        <button 
          type="submit" 
          className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-150 font-bold shadow-md"
        >
          Enviar Mensaje
        </button>

        {/* Texto Legal */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          Al enviar este formulario, aceptas que el equipo de LP se pondrá en contacto contigo dentro de un plazo de hasta 60 días. Nos comprometemos a responder lo antes posible y a mantener la confidencialidad de tus datos personales.
        </p>
      </form>
    </div>
  );
}
