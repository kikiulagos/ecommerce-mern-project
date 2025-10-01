/* global __app_id, __firebase_config, __initial_auth_token */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useUserStore } from '../Stores/UserStore';
import { toast } from 'react-toastify';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously } from 'firebase/auth';
import { getFirestore, collection, query, onSnapshot, setLogLevel, Timestamp } from 'firebase/firestore';
import { User, LogOut, Clock, DollarSign, Loader2, MapPin } from 'lucide-react'; 


const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');

export default function ProfilePage() {

    const navigate = useNavigate();
    
    const { userInfo, logoutUser } = useUserStore();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Si el usuario no está logueado, redirigir a la página de login
    useEffect(() => {
        if (!userInfo) {
            toast.warn("Debes iniciar sesión para ver tu perfil.");
            navigate('/login');
        }
    }, [userInfo, navigate]);
    
    // Lógica para cargar pedidos privados del usuario
    useEffect(() => {
        if (!userInfo || Object.keys(firebaseConfig).length === 0) return;

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const auth = getAuth(app);
        
        setLogLevel('debug');

        let unsubscribe = () => {};

        const setupAuthAndListener = async () => {
            let currentUserId = null;
            try {
                if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                    const userCredential = await signInWithCustomToken(auth, __initial_auth_token);
                    currentUserId = userCredential.user.uid;
                } else {
                    const userCredential = await signInAnonymously(auth);
                    currentUserId = userCredential.user.uid;
                }
            } catch (authError) {
                console.error("Firebase Auth Error on ProfilePage:", authError);
                setError("Error de autenticación. No se pueden cargar los pedidos.");
                setIsLoading(false);
                return;
            }

            // Ruta privada para pedidos: artifacts/{appId}/users/{userId}/orders
            const ordersCollectionPath = `artifacts/${appId}/users/${currentUserId}/orders`;
            const ordersQuery = query(collection(db, ordersCollectionPath));

            // Listener en tiempo real para los pedidos
            unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
                const fetchedOrders = snapshot.docs.map(doc => {
                    const data = doc.data();
                    // Aseguramos que la fecha sea manejable
                    const date = data.createdAt instanceof Timestamp ? data.createdAt.toDate().toLocaleDateString() : 'Fecha desconocida';
                    return {
                        id: doc.id,
                        ...data,
                        createdAt: date,
                    };
                });
                
                // Ordenar por ID como fallback, ya que el timestamp no está indexado para ordenar
                setOrders(fetchedOrders.sort((a, b) => b.id.localeCompare(a.id)));
                setIsLoading(false);
                console.log("Pedidos del usuario obtenidos:", fetchedOrders);
            }, (err) => {
                console.error("Firestore Orders Snapshot Error:", err);
                setError("Error al cargar el historial de pedidos.");
                setIsLoading(false);
                setOrders([]); 
            });
        };

        setupAuthAndListener();
        
        return () => unsubscribe();
    }, [userInfo, firebaseConfig, navigate]); 

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
        toast.info("Sesión cerrada correctamente.");
    };

    if (!userInfo) {
       
        return (
            <div className="flex justify-center items-center pt-24 min-h-screen bg-gray-100">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
            </div>
        );
    }
    
    return (
        <div className="container mx-auto p-4 sm:p-8 pt-12 min-h-screen bg-gray-100">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 lg:p-12 border border-gray-100">
                
                {/* Encabezado del Perfil */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-6 mb-8">
                    <div className="flex items-center">
                        <User className="w-12 h-12 text-indigo-600 bg-indigo-50 p-2 rounded-full mr-4"/>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900">{userInfo.name || "Mi Perfil"}</h1>
                            <p className="text-xl text-gray-600 font-medium">{userInfo.email}</p>
                            <p className="text-sm text-gray-500 break-words mt-1">
                                ID de Usuario: {userInfo.uid}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center mt-4 md:mt-0 py-2 px-4 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition duration-150 shadow-md"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Cerrar Sesión
                    </button>
                </div>
                
                {/* Información de Envío */}
                <div className="mb-10 p-6 bg-blue-50 rounded-xl border border-blue-200">
                    <h2 className="text-2xl font-bold text-blue-800 mb-3 flex items-center">
                        <MapPin className="w-6 h-6 mr-2"/>
                        Dirección Principal de Envío
                    </h2>
                    <p className="text-lg text-blue-700 font-medium">
                        {userInfo.address || "No se ha registrado una dirección de envío."}
                    </p>
                </div>
                
                {/* Historial de Pedidos */}
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">
                    Historial de Pedidos
                </h2>

                {isLoading && (
                    <div className="flex justify-center items-center py-10">
                        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                        <p className="ml-3 text-lg text-gray-700">Cargando pedidos...</p>
                    </div>
                )}

                {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-700">
                        <p className="font-semibold">Error al cargar pedidos: {error}</p>
                    </div>
                )}
                
                {!isLoading && !error && orders.length === 0 && (
                    <div className="p-8 text-center bg-yellow-50 rounded-xl border-2 border-dashed border-yellow-300">
                        <p className="text-xl font-semibold text-yellow-800">Aún no tienes pedidos.</p>
                        <p className="text-gray-600 mt-2">¡Es un buen momento para empezar a comprar!</p>
                    </div>
                )}

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white p-5 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                            <div className="flex justify-between items-center mb-3 border-b pb-3">
                                <h3 className="text-xl font-bold text-indigo-600">Pedido #{order.id.substring(0, 8)}</h3>
                                <div className={`text-sm font-semibold px-3 py-1 rounded-full ${order.status === 'Completado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {order.status || 'En Proceso'}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm">
                                <p className="flex items-center"><Clock className="w-4 h-4 mr-2 text-gray-500"/> Fecha: <span className="font-medium ml-1">{order.createdAt}</span></p>
                                <p className="flex items-center"><DollarSign className="w-4 h-4 mr-2 text-gray-500"/> Total: <span className="font-bold text-lg text-gray-900 ml-1">${(order.total || 0).toFixed(2)}</span></p>
                            </div>

                            <p className="text-md font-semibold text-gray-800 mt-4 mb-2">Artículos ({order.items?.length || 0}):</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm pl-4">
                                {order.items && order.items.map((item, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span className="truncate">{item.name}</span>
                                        <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}