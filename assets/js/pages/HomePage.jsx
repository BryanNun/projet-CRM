import React from 'react';

import inscription from '../img/inscription.gif';
import client from '../img/Création_client.gif';
import facture from '../img/Création_facture.gif';

const HomePage = (props) => {
    return (
    <div>
    <div className="jumbotron">
        <h1 className="display-3">Bienvenue sur NB Gestion</h1>
        <p className="lead">Créé par Nuninger Bryan</p>
        <hr className="my-4" />
        <p>NB Gestion est un site gratuit qui vous permet de gérer votre portefeuille client. Il vous sera possible après inscription, de créer des clients et leurs factures, suivre le statut des factures et avoir un historique des toutes vos ventes. </p>
    </div>

    <div className="container">
        <div className="row">
            <div className="col">
    <div className="card mb-3">
  <h3 className="card-header">Création de compte</h3>
  <div className="card-body">
  </div>
  <img style={{height: "200px", width: "100%", display: "block"}} src={inscription} alt="Card image" />
  <div className="card-body">
    <p className="card-text">Créez votre propre compte et gérez votre portefeuille client.</p>
  </div>
</div>
</div>
<div className="col">
<div className="card mb-3">
  <h3 className="card-header">Création de client</h3>
  <div className="card-body">
  </div>
  <img style={{height: "200px", width: "100%", display: "block"}} src={client} alt="Card image" />
  <div className="card-body">
    <p className="card-text">Ajoutez vos nouveaux clients à votre liste et gérez leurs historiques.</p>
  </div>
</div>
</div>
<div className="col">
<div className="card mb-3">
  <h3 className="card-header">Création de facture</h3>
  <div className="card-body">
  </div>
  <img style={{height: "200px", width: "100%", display: "block"}} src={facture} alt="Card image" />
  <div className="card-body">
    <p className="card-text">Editez des factures, affiliez les à un client et donnez le statut adéquate.</p>
  </div>
</div>
</div>
</div>
</div>
    </div>);
}

export default HomePage;