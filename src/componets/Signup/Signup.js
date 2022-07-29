import Input from "../common/Input";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link} from "react-router-dom";
import "./signup.css";
import { signupUser } from "../../services/signupService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const initialValues = {
    name:"",
    email:"",
    phoneNumber:"",
    password:"",
    passwordConfirm:"",
};


const validationSchema = Yup.object({
    name: Yup.string().required("Name is Requiered").min(6," length not valid"),
    email: Yup.string().email("is not Valid").required("email is Requiered"),
    phoneNumber:Yup.string().required("phoneNumber is Requiered").matches(/^[0-9]{11}$/,"phoneNumber is not valid").nullable(),
    password: Yup.string().required("pass is Requiered"),
    passwordConfirm:Yup.string().required("passwordConfirm is Requiered").oneOf([Yup.ref('password'), null], 'Passwords must match')
})
const SignupForm = () => {
    const [error,setError] = useState(null);
    const navigate = useNavigate();
    console.log("navigate",navigate)
    const onSubmit = async(values) =>  {
        const {name,email,phoneNumber,password} = values;
        const userData = {
            name,
            email,
            phoneNumber,
            password
        }
        try {
            const {data} = await signupUser(userData);
            setError(null);
            navigate("/");


            
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
                <Input formik={formik} name="name" label="Name"/>
                <Input formik={formik} name="email" label="Email" />
                <Input formik={formik} name="phoneNumber" label="Phone Number" type="tel"/>
                <Input formik={formik} name="password" label="Password" type="password"/>
                <Input formik={formik} name="passwordConfirm" label="Password Confirmation" type="password"/>
                <button style={{width:"100%"}} type="submit" disabled={!formik.isValid} className="btn primary">sign up</button>
                {error && <p style={{color:"red"}}>{error}</p>}
                <Link to="/login">
                    <p style={{marginTop:"15px"}}>already login?</p>
                </Link>
            </form>
        </div>
    );
}
 
export default SignupForm;