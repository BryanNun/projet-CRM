import React, { useState, useContext } from 'react';
import AuthAPI from '../services/authAPI';
import AuthContext from '../contexts/AuthContext';
import Field from '../components/forms/Field';
import { toast } from 'react-toastify';

const LoginPage = ({ history }) => {

    const { setIsAuthenticated } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    // Gestion des champs
    const handleChange = ({ currentTarget }) => {
        const { value, name } = currentTarget;
        setCredentials({ ...credentials, [name]: value });
    }

    // Gestion du submit
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await AuthAPI.authenticate(credentials);
            setError("");
            toast.success("Vous êtes désormais connecté");
            setIsAuthenticated(true);
            history.replace("/customers");
        } catch (error) {
            setError("L'adresse email est incorrecte");
            toast.error("Une erreur est survenue");
        }
    };

    return (
        <>
            <h1>Connexion à l'application</h1>

            <form onSubmit={handleSubmit}>
                <Field label="Adresse email" name="username" value={credentials.username} onChange={handleChange}
                placeholder="Adresse email" error={error} />
                <Field label="Mot de passe" name ="password" value={credentials.password} onChange={handleChange}
                type="password" error="" />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Connexion</button>
                </div>
            </form>
        </>
    );
};

export default LoginPage;