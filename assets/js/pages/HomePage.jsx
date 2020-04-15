import React from 'react';

const HomePage = (props) => {
    return (<div className="jumbotron">
        <h1 className="display-3">Bienvenue sur NB Gestion</h1>
        <p className="lead">NB Gestion est un site gratuit qui vous permet de gérer votre portefeuille client</p>
        <hr className="my-4" />
        <p>Il vous sera possible après inscription, de créer des clients et leurs factures, suivre le statut des factures et avoir un historique des toutes vos ventes. </p>
        <p className="lead">
            <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
        </p>
    </div>);
}

export default HomePage;