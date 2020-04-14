import React, { useState, useEffect } from 'react';
import Field from '../components/forms/Field';
import Select from '../components/forms/Select';
import { Link } from "react-router-dom";
import CustomersAPI from "../services/customersAPI";
import invoicesAPI from '../services/invoicesAPI';
import { toast } from 'react-toastify';
import FormContentLoader from '../components/loaders/FormContentLoader';

const InvoicePage = ({ history, match }) => {

    const { id = "new" } = match.params;
    const [editing, setEditing] = useState(false);
    const [invoice, setInvoice] = useState({
        amount: "",
        customer: "",
        status: "SENT"
    });
    const [loading, setLoading] = useState(true);

    const [errors, setErrors] = useState({
        amount: "",
        customer: "",
        status: ""
    });

    const [customers, setCustomers] = useState([]);

    // Récupère un client
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll();
            setCustomers(data);
            setLoading(false);

            if (!invoice.customer) setInvoice({ ...invoice, customer: data[0].id });
        } catch (error) {
            toast.error("Impossible de charger les clients");
            history.replace('/invoices');
        }
    }

    // Récupère une facture
    const fetchInvoice = async id => {
        try {
            const { amount, status, customer } = await invoicesAPI.find(id);
            setInvoice({ amount, status, customer: customer.id });
            setLoading(false);
        } catch (error) {
            toast.error("Impossible de charger la facture")
            history.replace('/invoices');
        }
    }

    // Recupère la liste des clients à chaque chargement
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Récupère la bonne facture lors du changement d'id dans l'URL
    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchInvoice(id);
        }
    }, [id]);

    // Gestion des changements des inputs
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setInvoice({ ...invoice, [name]: value });
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            if (editing) {
                await invoicesAPI.update(id, invoice);
                toast.success("La facture à bien été modifiée");
            } else {
                await invoicesAPI.create(invoice);
                toast.success("La facture à bien été enregistrée")
                history.replace("/invoices");
            }
        } catch ({ response }) {
            const { violations } = response.data;

            if (violations) {
                const apiErrors = {};
                violations.forEach(({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);

                toast.error("Il y a des erreurs dans votre formulaire");
            }
        }
    };


    return (
        <>
            {!editing && (<h1>Création d'une facture</h1>) || (<h1>Modification d'une facture</h1>)}

            {loading && <FormContentLoader />}
            {!loading && <form onSubmit={handleSubmit}>
                <Field
                    name="amount"
                    type="number"
                    placeholder="Montant de la facture"
                    label="Montant"
                    onChange={handleChange}
                    value={invoice.amount}
                    error={errors.amount}
                />

                <Select
                    name="customer"
                    label="Client"
                    value={invoice.customer}
                    error={errors.customer}
                    onChange={handleChange}
                >
                    {customers.map(customer => <option key={customer.id} value={customer.id}>
                        {customer.firstName} {customer.lastName}
                    </option>)}
                </Select>

                <Select name="status" label="Statut" value={invoice.status} error={errors.status} onChange={handleChange}>
                    <option value="SENT">Envoyée</option>
                    <option value="PAID">Payée</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/invoices" className="ml-1 btn btn-primary">Retour</Link>
                </div>

            </form>}
        </>
    );
}

export default InvoicePage;