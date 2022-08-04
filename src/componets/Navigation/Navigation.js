import { NavLink } from "react-router-dom";
import style from "./navigation.module.css"
import { useCart } from "../../Providers/CartProvider";
import { useAuth } from "../../Providers/AuthProvider";
const Navigation = () => {
    const {cart} = useCart();
    const userData = useAuth();
    return ( 
        <header className={style.mainNavigation}>
            <nav>
                <ul>
                    <div>Online Shopping</div>
                    <li>
                        <NavLink to="/" activeclassname={style.activeLink} >home page</NavLink>
                    </li>
                </ul>
                <ul>
                    <li className={style.cartLink}>
                        <NavLink to="/cart" activeclassname={style.activeLink}>cart
                        </NavLink>
                        <span>{cart.length}</span>
                    </li>
                    <li>
                        <NavLink to={userData ? "/profile" : "/login"} activeclassname={style.activeLink} >
                            {userData ? "Profile" : "login/signup"}
                        </NavLink>
                    </li>

                </ul>
            </nav>
        </header>
     );
}
 
export default Navigation;