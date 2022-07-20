import Input from "../common/Input";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link} from "react-router-dom";
import "./signup.css";
const initialValues = {
    name:"",
    email:"",
    phoneNumber:"",
    password:"",
    passwordConfirm:"",
};

const onSubmit = (values) =>  {
    // axios.post("http://localhost:3001/users",values)
    // .then(res=>console.log(res.data))
    // .catch(error=>console.log(error))
}
const validationSchema = Yup.object({
    name: Yup.string().required("Name is Requiered").min(6," length not valid"),
    email: Yup.string().email("is not Valid").required("email is Requiered"),
    phoneNumber:Yup.string().required("phoneNumber is Requiered").matches(/^[0-9]{11}$/,"phoneNumber is not valid").nullable(),
    password: Yup.string().required("pass is Requiered").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    passwordConfirm:Yup.string().required("passwordConfirm is Requiered").oneOf([Yup.ref('password'), null], 'Passwords must match')
})
const SignupForm = () => {
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
                <Link to="/login">
                    <p style={{marginTop:"15px"}}>already login?</p>
                </Link>
            </form>
        </div>
    );
}
 
export default SignupForm;