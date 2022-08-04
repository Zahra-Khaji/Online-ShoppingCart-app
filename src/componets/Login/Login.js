import Input from "../common/Input";
import "./login.css"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, Navigate} from "react-router-dom";
import { loginUser } from "../../services/loginService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "../../Providers/AuthProvider";
import { useQuery } from "../../hooks/useQuery";



const initialValues = {
    email:"",
    password:"",

};


// const onSubmit = (values) =>  {
//     // axios.post("http://localhost:3001/users",values)
//     // .then(res=>console.log(res.data))
//     // .catch(error=>console.log(error))
// }
const validationSchema = Yup.object({
    email: Yup.string().email("is not Valid").required("email is Requiered"),
    password: Yup.string().required("pass is Requiered")
})
const Login = () => {
    const [error,setError] = useState(null);
    const navigate = useNavigate();
    const setAuth = useAuthActions();
    const query = useQuery();
    const redirect = query.get("redirect") || "/";

    const onSubmit = async(values) =>  {

        try {
            const {data} = await loginUser(values);
            setAuth(data);
            // localStorage.setItem("authState",JSON.stringify(data));
            setError(null);
            navigate(redirect);
            
            
        } catch (error) {
            if(error.response &&  error.response.data.message){
                setError(error.response.data.message);
            }
            
        }

    }

    const formik = useFormik({
        initialValues : initialValues,
        validateOnMount:true,
        onSubmit,
        validationSchema
    })
    return (  
        <div className="formContainer">
            <form onSubmit={formik.handleSubmit}>
                <Input formik={formik} name="email" label="Email" />
                <Input formik={formik} name="password" label="Password" type="password"/>
                <button style={{width:"100%"}} type="submit" disabled={!formik.isValid} className="btn primary">login</button>
                {error && <p style={{color:"red"}}>{error}</p>}

                <Link to={`/signup?redirect=${redirect}`}>
                    <p style={{marginTop:"15px"}}>not signup yet?</p>
                </Link>

            </form>
        </div>
    );
}
 
export default Login;