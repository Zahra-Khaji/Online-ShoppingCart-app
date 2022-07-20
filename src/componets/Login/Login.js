import Input from "../common/Input";
import "./login.css"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link} from "react-router-dom";

const initialValues = {
    email:"",
    password:"",

};


const onSubmit = (values) =>  {
    // axios.post("http://localhost:3001/users",values)
    // .then(res=>console.log(res.data))
    // .catch(error=>console.log(error))
}
const validationSchema = Yup.object({
    email: Yup.string().email("is not Valid").required("email is Requiered"),
    password: Yup.string().required("pass is Requiered")
})
const Login = () => {
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
                <Link to="/signup">
                    <p style={{marginTop:"15px"}}>not signup yet?</p>
                </Link>

            </form>
        </div>
    );
}
 
export default Login;