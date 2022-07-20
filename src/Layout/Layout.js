import Navigation from "../componets/Navigation/Navigation";

const Layout = ({children}) => {
    return ( 
        <div>
            <Navigation/>
            {children}
        </div>
     );
}
 
export default Layout;