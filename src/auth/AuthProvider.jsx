import { useEffect , useState} from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [id, setId] = useState(localStorage.getItem('id') || null);
    const [username, setUsername] = useState(localStorage.getItem('username') || null);
    
    function logout() {
        setToken(null);
        setId(null);
        setUsername(null);
    }

    useEffect(() => {
        localStorage.setItem('token', token);
        localStorage.setItem('id', id);
        localStorage.setItem('username', username);
    }, [token, id, username]);

    return (
        <AuthContext.Provider value={{ token, setToken, logout, id, setId, username, setUsername}}>
            {children}
        </AuthContext.Provider>
    );
    }
export default AuthProvider;