import List from "./List"
import { Link } from "react-router";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonIcon from '@mui/icons-material/Person';

export default function Landing() {

    const avatar = {
        //gotta style it inline because otherwise it's overwritten
        fontSize: "5em"
    }

    return <section className="landing-outer">
        <h1>Continue as</h1>
        <div className="landing-inner">
            <section className="landing-option">
                <h2>User</h2>
                <PersonIcon className="landing-avatar" style={avatar} />
                <div>
                    <button type="button">Register</button>
                    <button type="button">Sign in</button>
                </div>
                <div className="landing-description">
                    <ul>
                        <li>You don't need to create an account.</li>
                        <li>Your data is saved locally in your browser.</li>
                    </ul>
                </div>
            </section>
            <section className="landing-option">
                <h2>Guest</h2>
                <PersonOffIcon className="landing-avatar" style={avatar} />
                <div>
                    <Link to="/todos">
                        <button className="submitBtn">Continue as guest</button>
                    </Link>
                </div>
                
                <div className="landing-description">
                    <ul>
                        <li>You don't need to create an account.</li>
                        <li>Your data is saved locally in your browser.</li>
                        <li>Your data isn't saved if using Incognito mode.</li>
                    </ul>
                </div>
            </section>

        </div>
    </section>
}

