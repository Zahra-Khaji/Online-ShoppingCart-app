import { NavLink } from "react-router-dom";
import style from "./navigation.module.css"
import { useCart } from "../../Providers/CartProvider";
const Navigation = () => {
    const {cart} = useCart();
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
                        <NavLink to="/login" activeclassname={style.activeLink} >
                            login/signup
                        </NavLink>
                    </li>

                </ul>
            </nav>
        </header>
     );
}
 
export default Navigation;