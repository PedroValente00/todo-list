import { storageAvailable } from "../utils";
import { useNavigate, Link } from "react-router";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect } from "react"

export default function Landing({ user }) {
    let navigate = useNavigate();
    useEffect(() => {
        if (user) navigate("/todos")
    }, [navigate, user])

    const avatar = { fontSize: "5em" }

    return <section className="landing-outer">
        <h1>Continue as</h1>
        <div className="landing-inner">
            <section className="landing-option">
                <h2>User</h2>
                <PersonIcon className="landing-avatar" style={avatar} />
                <div className="landing-btn-div">
                    <Link to={"/register"}>
                        <button className="submitBtn">Register</button>
                    </Link>
                    <Link to={"/login"}>
                        <button className="submitBtn">Login</button>
                    </Link>
                </div>
                <div className="landing-description">
                    <ul>
                        <li>Your data is saved in your account.</li>
                        <li>You can only access it when you are logged in.</li>
                    </ul>
                </div>
            </section>
            {
                storageAvailable("localStorage") &&
                <section className="landing-option">
                    <h2>Guest</h2>
                    <PersonOffIcon className="landing-avatar" style={avatar} />
                    <div>
                        <Link to="/todos" >
                            <button className="submitBtn">Continue as guest</button>
                        </Link>
                    </div>

                    <div className="landing-description">
                        <ul>
                            <li>You do not need to create an account.</li>
                            <li>Your data is saved locally in your browser.</li>
                            <li>Your data is not saved if using Incognito mode.</li>
                        </ul>
                    </div>
                </section>
            }
        </div>
    </section>
}

