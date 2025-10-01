import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
     return (
    <div>
    <ToastContainer 
    position="bottom-right" 
    autoClose={3000} 
    hideProgressBar={false} 
    newestOnTop={false} 
    closeOnClick 
    rtl={false}  pauseOnFocusLoss  draggable  pauseOnHover />
    <Header />
    <Outlet />
     <Footer />
     </div>
   );
}

export default App;
