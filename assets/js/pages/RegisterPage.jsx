import React, { useState } from 'react';
import Field from '../components/forms/Field';
import { Link } from 'react-router-dom';
import UserAPI from '../services/usersAPI';
import { toast } from 'react-toastify';

const RegisterPage = ({ history }) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    });


    // Gestion des changements des inputs
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUser({ ...user, [name]: value });
    };

    // Gestion de la soumission
    const handleSubmit = async event => {
        event.preventDefault();

        const apiErrors = {};

        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme";
            setErrors(apiErrors);
            toast.error("Il y a des erreurs dans votre formulaire");
            return;
        }

        try {
            const response = await UserAPI.register(user);
            setErrors({});
            toast.success("Vous êtes désormais inscrit")
            history.replace('/login');
        } catch (error) {
            const { violations } = error.response.data;

            if (violations) {
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message
                });
                setErrors(apiErrors);
            }
            toast.error("Il y a des erreurs dans votre formulaire");
        }
    };

    return (
        <>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <Field
                    name="firstName"
                    label="Prénom"
                    placeholder="Prénom"
                    error={errors.firstName}
                    value={user.firstName}
                    onChange={handleChange}
                />
                <Field
                    name="lastName"
                    label="Nom"
                    placeholder="Nom"
                    error={errors.lastName}
                    value={user.lastName}
                    onChange={handleChange}
                />
                <Field
                    name="email"
                    label="Adresse email"
                    placeholder="Adresse email"
                    type="email"
                    error={errors.email}
                    value={user.email}
                    onChange={handleChange}
                />
                <Field
                    name="password"
                    label="Mot de passe"
                    type="password"
                    placeholder="Mot de passe"
                    error={errors.password}
                    value={user.password}
                    onChange={handleChange}
                />
                <Field
                    name="passwordConfirm"
                    label="Confirmation de mot de passe"
                    type="password"
                    placeholder="Confirmez votre mot de passe"
                    error={errors.passwordConfirm}
                    value={user.passwordConfirm}
                    onChange={handleChange}
                />

                <div className="form-group d-flex justify-content-center">
                    <button type="submit" className="btn btn-success">Inscription</button>
                    <Link to="/login" className="ml-1 btn btn-primary">J'ai déjà un compte</Link>
                </div>
            </form>
        </>
    );
}

export default RegisterPage;