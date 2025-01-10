import react, {useState} from 'react';

interface Logindetails {
    onSubmit : (email: string, password: string) => void ;
};

const Login: React.FC<Logindetails> = ({ onSubmit}) => {
    const[email, setEmail] = useState<string>("");
    const[password, setPassword] = useState<string>("");
    const[error, setError] = useState<string>("");

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!email || !password){
            setError("Both feilds are required");
            return;
        }
        onSubmit(email, password);
        setError("");
    }
    return(
        <div style={{textAlign: 'center', backgroundColor: "whitesmoke", maxWidth: "400px" , margin: "0 auto", padding: "20px"}}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                {error}

                <div style={{marginBottom: "10px"}}>
                    <label>Email :</label>
                    <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} style={{width: "100%", padding : "8px", margin : "5px 0", boxSizing : "border-box", borderRadius: "1%"}}/>
                </div>

                <div style={{marginBottom: "10px"}}>
                    <label>Password :</label>
                    <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} style={{width: "100%", padding : "8px", margin : "5px 0", boxSizing : "border-box", borderRadius: "1%"}}/>
                </div>

                <button type='submit' style={{ width : "35%", backgroundColor: "brown", padding: "1%", borderRadius: "2%" }}>Submit</button>

            </form>
        </div>
    )
};

export default Login;
