import { useForm } from 'react-hook-form';
import axios from "axios"
import { useState } from 'react';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorMsg, setErrorMsg] = useState()
    // const onSubmit = data => console.log(data);
    // console.log("errors:")
    // console.log(errors);

    const onSubmit = async data => {
        const registration = await axios.post('/api/register', data);
        const response = registration.data;
        console.log(response)
        if (response.error){
            setErrorMsg(response.msg)
        } else{
            alert(response.msg)
        }
        
    }

    return (
        <form className='register-form' onSubmit={handleSubmit(onSubmit)} 
        // onChange={handleChange}
        >
            <fieldset>
                <legend>Register</legend>

                <section>
                    <input className="register-input" type="text" placeholder="Name"
                        {...register("name", { required: true, minLength: 3, maxLength: 20 })} />
                    
                    {(errors.name && errors.name.type === "required") && <div className='register-error-message'>Name required.</div>}
                    {(errors.name && errors.name.type === "minLength") && <div className='register-error-message'>Name must be longer.</div>}
                    {(errors.name && errors.name.type === "maxLength") && <div className='register-error-message'>Name must 20 characters or less.</div>}

                </section>

                <section>
                    <input className="register-input" type="email" placeholder="Email"
                        {...register("email", { required: true, minLength: 5, maxLength: 80, pattern: /^\S+@\S+$/i })} />
                    {(errors.email && errors.email.type === "required") && <div className='register-error-message'>Email required.</div>}
                    {(errors.email && errors.email.type === "minLength") && <div className='register-error-message'>Email must be longer.</div>}
                    {(errors.email && errors.email.type === "maxLength") && <div className='register-error-message'>Name must 80 characters or less.</div>}
                </section>

                <section>
                    <input className="register-input" type="password" placeholder="Password" {...register("password", { required: true, minLength: 8, maxLength: 80 })} />
                        {(errors.password && errors.password.type === "required") && <div className='register-error-message'>Password required.</div>}
                        {(errors.password && errors.password.type === "minLength") && <div className='register-error-message'>Password must be longer.</div>}
                        {(errors.password && errors.password.type === "maxLength") && <div className='register-error-message'>Password must 80 characters or less.</div>}
                </section>

                {errorMsg && <div className='errorMsg'>{errorMsg}</div> }

                <input className='submitBtn register-input' type="submit" />
            </fieldset>
        </form>
    );
}



// import { useForm } from 'react-hook-form';

// export default function Register() {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const onSubmit = data => console.log(data);
//     console.log("errors:")
//     console.log(errors);

//     return (
//         <form className='register-form' onChange={() => console.log(errors)} onSubmit={handleSubmit(onSubmit)}>
//             <div>

//             <input className="input" type="text" placeholder="Name" {...register("Name", { required: true, max: 20, min: 3 })} />
//             </div>
//             <div>
//             <input className="input" type="email" placeholder="Email" {...register("Email", { required: true, max: 80, min: 5, maxLength: 78, pattern: /^\S+@\S+$/i })} />
//             {errors.Email && <span>Email error</span>}
//             </div>
//             <div>
//             <input className="input" type="password" placeholder="Password" {...register("Password", { required: true, max: 80, min: 8, maxLength: 80 })} />
//             </div>

//             <input className='submitBtn' type="submit" />
//         </form>
//     );
// }