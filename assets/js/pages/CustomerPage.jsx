import React, { useState, useEffect } from 'react';
import Field from '../components/forms/Field';
import { Link } from "react-router-dom";
import CustomersAPI from "../services/customersAPI";
import { toast } from 'react-toastify';

const CustomerPage = ({ match, history }) => {

    const { id = "new" } = match.params;

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    });

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: ""
    })

    const [editing, setEditing] = useState(false);

    // Récupère le customer en fonction de l'id
    const fetchCustomer = async id => {
        try {
            const { firstName, lastName, email, company } = await CustomersAPI.find(id);

            setCustomer({ firstName, lastName, email, company });
        } catch (error) {
            toast.error("Impossible de charger le client");
            history.replace('/cutomers');
        }
    }

    // Charge le customer si besoin au chargement du composant ou au changement de l'id
    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchCustomer(id);
        }
    }, [id]);

    // Gestion des changements des inputs
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setCustomer({ ...customer, [name]: value });
    };

    // Gestion de la soumission du questionnaire
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setErrors({});
            
            if (editing) {
                await CustomersAPI.updateCustomer(id, customer);
                toast.success("Le client à bien été modifié");
            } else {
                await CustomersAPI.createCustomer(customer);
                toast.success("Le client à bien été créé")
                history.replace("/customers");
            }
        } catch ({ response }) {
            const { violations } = response.data;

            if (violations) {
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
                toast.error("Il y a des erreurs dans votre formulaire");
            };
        }
    };

    return (
        <>
            {(!editing && <h1>Création d'un client</h1>) || (<h1>Modification du client</h1>)}

            <form onSubmit={handleSubmit}>
                <Field name="lastName" label="Nom" placeholder="Nom du client" value={customer.lastName} onChange={handleChange} error={errors.lastName} />
                <Field name="firstName" label="Prénom" placeholder="Prénom du client" value={customer.firstName} onChange={handleChange} error={errors.firstName} />
                <Field name="email" label="Email" placeholder="Adresse email du client" value={customer.email} onChange={handleChange} error={errors.email} />
                <Field name="company" label="Entreprise" placeholder="Entreprise du client" value={customer.company} onChange={handleChange} />

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/customers" className="btn btn-primary ml-1">Retour à la liste</Link>
                </div>
            </form>
        </>
    );
}

export default CustomerPage;