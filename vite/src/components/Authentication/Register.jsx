import { useForm } from 'react-hook-form';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    // console.log("errors:")
    // console.log(errors);

    // const handleChange = (e) => {
    //     const err = errors[e.target.name]
    //     if (err){
    //         err.ref.classList.add("err")
    //         console.log(err)
    //     }else{
    //         if(err.ref.classList.contains("err")){
    //             err.ref.classList.remove("err")
    //         }
    //     }
    // }

    return (
        <form className='register-form' onSubmit={handleSubmit(onSubmit)} 
        // onChange={handleChange}
        >
            <fieldset>
                <legend>Register</legend>

                <section>
                    <input className="register-input" type="text" placeholder="Name"
                        {...register("Name", { required: true, minLength: 3, maxLength: 20 })} />
                    
                    {(errors.Name && errors.Name.type === "required") && <div className='register-error-message'>Name required.</div>}
                    {(errors.Name && errors.Name.type === "minLength") && <div className='register-error-message'>Name must be longer.</div>}
                    {(errors.Name && errors.Name.type === "maxLength") && <div className='register-error-message'>Name must 20 characters or less.</div>}

                </section>

                <section>
                    <input className="register-input" type="email" placeholder="Email"
                        {...register("Email", { required: true, minLength: 5, maxLength: 80, pattern: /^\S+@\S+$/i })} />
                    {(errors.Email && errors.Email.type === "required") && <div className='register-error-message'>Email required.</div>}
                    {(errors.Email && errors.Email.type === "minLength") && <div className='register-error-message'>Email must be longer.</div>}
                    {(errors.Email && errors.Email.type === "maxLength") && <div className='register-error-message'>Name must 80 characters or less.</div>}
                </section>

                <section>
                    <input className="register-input" type="password" placeholder="Password" {...register("Password", { required: true, minLength: 8, maxLength: 80 })} />
                        {(errors.Password && errors.Password.type === "required") && <div className='register-error-message'>Password required.</div>}
                        {(errors.Password && errors.Password.type === "minLength") && <div className='register-error-message'>Password must be longer.</div>}
                        {(errors.Password && errors.Password.type === "maxLength") && <div className='register-error-message'>Password must 80 characters or less.</div>}
                </section>

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