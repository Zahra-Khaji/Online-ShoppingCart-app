import Layout from "../../Layout/Layout";
import * as data from "../../data";
import style from "./homePage.module.css";
import { useCart, useCartActions } from "../../Providers/CartProvider";
import checkInCart from "../../utils/checkInCart";
import {  toast } from 'react-toastify';


const HomePage = () => {
    const dispatch = useCartActions();
    const {cart} = useCart();
    const addToCartHandler = (product) => {
        toast.success(`${product.name} added to cart`)
        dispatch({type:"ADD_TO_CART",payload:product});
    };
    return ( 
        <Layout>
            <main className={style.container}>
                <section className={style.productList}>
                 {data.products.map((product)=>{
                    return <section key={product.id} className={style.product}>
                        <div className={style.productImg}>
                            <img src={product.image} alt={product.name}/>
                        </div>
                        <div className={style.productDesc}>
                            <p>{product.name}</p>
                            <p>$ {product.price}</p>
                            <button className={`${style.btn} ${style.primary}`} onClick={()=>{addToCartHandler(product)}}>
                                {checkInCart(cart,product) ? "in cart" : "add to cart"}
                            </button>
                        </div>
                    </section>
                 })}
                </section>
            </main>
        </Layout>
     );
}
 
export default HomePage;