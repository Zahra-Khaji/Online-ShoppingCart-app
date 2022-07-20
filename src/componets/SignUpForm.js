import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useEffect } from "react";
import axios from "axios";
import Input from "./common/Input";
import RadioInput from "./common/RadioInput";
import SelectComponent from "./common/SelectComponent";
import CheckBoxInput from "./common/CheckBoxInput";
const radioOptions = [
    {label:"male",value:"0"},
    {label:"femail",value:"1"}

];
const checkBoxOption = [
    {label:"react.js",value:"REACT"},
    {label:"vue.js",value:"Vue"}

];
const selectOptions = [
    {label:"select your nationality",value:""},
    {label:"IRAN",value:"IR"},
    {label:"GERMANY",value:"GER"},
    {label:"USA",value:"US"}



]
const initialValues = {
    name:"",
    email:"",
    phoneNumber:"",
    password:"",
    passwordConfirm:"",
    gender:"",
    nationality:"",
    interests:[],
    terms:false 
};


const SignUpForm = () => {
    const [formValues,setFormValues] = useState(null);
    const formik = useFormik({
        initialValues : formValues || initialValues,
        validateOnMount:true,
        enableReinitialize:true,
        onSubmit : (values) =>  {
            axios.post("http://localhost:3001/users",values)
            .then(res=>console.log(res.data))
            .catch(error=>console.log(error))
        },
        validationSchema : Yup.object({
            name: Yup.string().required("Name is Requiered").min(6," length not valid"),
            email: Yup.string().email("is not Valid").required("email is Requiered"),
            phoneNumber:Yup.string().required("phoneNumber is Requiered").matches(/^[0-9]{11}$/,"phoneNumber is not valid").nullable(),
            password: Yup.string().required("pass is Requiered").matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
              ),
            passwordConfirm:Yup.string().required("passwordConfirm is Requiered").oneOf([Yup.ref('password'), null], 'Passwords must match'),
            gender:Yup.string().required("gender is Requiered"),
            nationality:Yup.string().required("natioality is requiered"),
            interests:Yup.array().min(1).required("select interest"),
            terms:Yup.boolean().required("plz accept this").oneOf([true], 'Must Accept Terms and Conditions'),


        })
    })
    

    useEffect(()=>{
        axios.get("http://localhost:3001/users/1")
        .then(res=>setFormValues(res.data))
        .catch(error=>console.log(error))
    },[]);
    // const submitHandler = (e) => {
    //     e.preventDefault();
    // };
    return ( 
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Input formik={formik} name="name" label="Name"/>
                <Input formik={formik} name="email" label="Email" />
                <Input formik={formik} name="phoneNumber" label="Phone Number"/>
                <Input formik={formik} name="password" label="Password" type="password"/>
                <Input formik={formik} name="passwordConfirm" label="Password Confirmation" type="password"/>
                <RadioInput formik={formik} name="gender" radioOptions={radioOptions}/>
                <SelectComponent formik={formik} name="nationality" selectOptions={selectOptions}/>
                <CheckBoxInput formik={formik} name="interests" checkBoxOption={checkBoxOption}/>
                <input type="checkbox" name="terms" id="terms" value={true} onChange={formik.handleChange} 
                 checked={formik.values.terms}/>        
                 <label htmlFor="terms">Terms And Conditions</label>
                 {formik.errors.terms && formik.touched.terms  && <div className="error">{formik.errors.terms}</div>}
                <button type="submit" disabled={!formik.isValid}>Submit</button>
            </form>
        </div>
     );
}
 
export default SignUpForm;