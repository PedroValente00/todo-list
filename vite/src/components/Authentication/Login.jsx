import { useForm } from 'react-hook-form';
import axios from "axios"
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router";

export default function Login({user, setUser}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMsg, setErrorMsg] = useState()
    let navigate = useNavigate();

    const onSubmit = async data => {
        const submission = await axios.post('/api/login', data);
        const response = submission.data;
        if (response.error) return setErrorMsg(response.msg)
            console.log("logged in!")
        console.log(response.user)
        setUser(response.user) 
        // setUser("Doesn't matter. useEffect in App component will update User") 

        navigate("/todos");
    }

useEffect(()=>{if (user) navigate("/todos")},[navigate, user])

    return (<>
        {
         user ? <div><p>You are already logged in.</p>
         </div>
         :
         <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
        
            <fieldset>
                <legend>Login</legend>

                {/* <section>
                    <input className="register-input" type="text" placeholder="Name"
                        {...register("name", { required: true, minLength: 3, maxLength: 20 })} />
                    
                    {(errors.name && errors.name.type === "required") && <div className='register-error-message'>Name required.</div>}
                    {(errors.name && errors.name.type === "minLength") && <div className='register-error-message'>Name must be longer.</div>}
                    {(errors.name && errors.name.type === "maxLength") && <div className='register-error-message'>Name must 20 characters or less.</div>}

                </section> */}

                <section>
                    <input className="auth-input" type="email" placeholder="Email"
                        {...register("email", { required: true, minLength: 5, maxLength: 80, pattern: /^\S+@\S+$/i })} />
                    {(errors.email && errors.email.type === "required") && <div className='auth-error-message'>Email required.</div>}
                    {(errors.email && errors.email.type === "minLength") && <div className='auth-error-message'>Email must be longer.</div>}
                    {(errors.email && errors.email.type === "maxLength") && <div className='auth-error-message'>Email must 80 characters or less.</div>}
                </section>

                <section>
                    <input className="auth-input" type="password" placeholder="Password" {...register("password", { required: true, minLength: 8, maxLength: 80 })} />
                        {(errors.password && errors.password.type === "required") && <div className='auth-error-message'>Password required.</div>}
                        {(errors.password && errors.password.type === "minLength") && <div className='auth-error-message'>Password must be longer.</div>}
                        {(errors.password && errors.password.type === "maxLength") && <div className='auth-error-message'>Password must 80 characters or less.</div>}
                </section>

                {errorMsg && <div className='errorMsg'>{errorMsg}</div> }

                <input className='submitBtn auth-input' type="submit" />
            </fieldset>
        </form>
        }
                
        {/* redirect and flash message */}
        </> );
}