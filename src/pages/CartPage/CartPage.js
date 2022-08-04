import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { useCart, useCartActions } from "../../Providers/CartProvider";
import style from "./cartPage.module.css";

const CartPage = () => {
    const {cart,total} = useCart();
    const dispatch = useCartActions();

    const incHandler = (cartItem) => {
        dispatch({type:"ADD_TO_CART",payload:cartItem})

    }

    
    const decHandler = (cartItem) => {
        dispatch({type:"REMOVE_PRODUCT",payload:cartItem})

    }
    if(!cart.length) return (
        <Layout>
            <main>
                <h2>cart is empty</h2>
            </main>
        </Layout>
    )

    return ( 
        <Layout>
            <main className={style.container}>
                <section className={style.cartCenter}>
                <section className={style.cartItemList}>
                {cart.map((item)=>{
                    return <div className={style.cartItem}>
                    <div className={style.itemImg}>
                        <img src={item.image}/>
                    </div>
                    <div>{item.name}</div>
                    <div>{item.offPrice * item.quantity}</div>
                    <div>
                        <button onClick={()=>decHandler(item)}>remove</button>
                        <button>{item.quantity}</button>
                        <button onClick={()=>incHandler(item)}>add</button>

                    </div>

                </div>
                })}

              </section>
                <CartSummery total={total} cart={cart}/>
                </section>

            </main>
        </Layout>
     );
}
export default CartPage;

const CartSummery = ({cart,total}) => {
    const originalTotalPrice = cart.length ? cart.reduce((acc,curr)=>acc + curr.quantity * curr.price,0) : 0;
    return ( 
        <section className={style.cartSummary}>
            <h2>cart summary </h2>
            <div className={style.summeryItem}>
                <p>original total price</p>
                <p>{originalTotalPrice} $</p>
            </div>
            <div className={style.summeryItem}>
                <p>cart discount</p>
                <p>{originalTotalPrice - total} $</p>
            </div>
            <div c>
                <p>net price</p>
                <p>{total} $</p>
            </div>
            <Link to="/signup?redirect=checkout">
            <button
             className={`${style.btn} ${style.primary}`} style={{marginTop:"20px",width:"100%"}}>
            go to checkout
            </button>
            </Link>
        </section>

     );
}