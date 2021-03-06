import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";


const Register = () => {
    const [loginData, setLoginData] = useState([]);
    const { user, registerUser, isLoading, authError } = useAuth();

    const history = useHistory();
    const location = useLocation();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
        console.log(newLoginData)
    }
    
    const handleLoginSubmit = e => {
        e.preventDefault();
        if (loginData.password !== loginData.password2) {
            alert('Your password did not match');
            return
        }
        registerUser(loginData.email, loginData.password, loginData.name, history, location);
    }
    
    return (
        <div className='container col-12 col-md-6 mx-auto'>
            <h2>Register</h2>
            {/* form  */}
            { !isLoading && <form onSubmit={handleLoginSubmit} className=''>
                <div className="mb-3 text-start">
                    <label htmlFor="exampleInputName1" className="form-label">Name</label>
                    <input onBlur={handleOnBlur} type="name" name='name' className="form-control" id="exampleInputName1" aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3 text-start">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input onBlur={handleOnBlur} name='email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3 text-start">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onBlur={handleOnBlur} name='password' type="password" className="form-control" id="exampleInputPassword1" required/>
                </div>
                <div className="mb-3 text-start">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input onBlur={handleOnBlur} name='password2' type="password" className="form-control" id="exampleInputPassword2"/>
                </div>
                <button type="submit" className="mb-3 w-100 btn btn-primary">Register</button>
                <Link  to='login'><p>Already Register? Please Login</p></Link>
            </form>}

            {isLoading && (<div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span></div>)}

            {user?.email && (<div className="alert alert-primary" role="alert">Register successfully!</div>)}
            
            {authError && (<div className="alert alert-danger" role="alert">{authError}</div>)}
        </div>
    );
};

export default Register;