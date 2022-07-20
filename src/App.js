
import HomePage from "./pages/HomePage/Homepage";
import "./App.css";
import { Route,Routes,BrowserRouter as Router} from "react-router-dom";
import CartPage from "./pages/CartPage/CartPage";
import CartProvider from "./Providers/CartProvider";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckOutPage from "./pages/CheckOutPage/CheckOutPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
  

const App = () => {
    return ( 
        <Router>
            <CartProvider>
                <ToastContainer/>
                <Routes>
                    <Route path="/"  element={<HomePage/>} />
                    <Route path="/checkout"  element={<CheckOutPage/>} />
                    <Route path="/cart" element={<CartPage/>} />
                    <Route path="/signup" element={<SignupPage/>} />
                    <Route path="/login" element={<LoginPage/>} />

                </Routes>
            </CartProvider>
                
        </Router>
    
     );
}
 
export default App;