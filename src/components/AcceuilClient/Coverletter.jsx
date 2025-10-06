import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import './Coverletter.css';
import { useEffect } from 'react';
const Coverletter = () => {
  const navigate=useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const nomclient = searchParams.get('nomclient');
  const contenu = searchParams.get('contenu');
  const nom = searchParams.get('nom');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usertype = localStorage.getItem('usertype');
    const iduser = localStorage.getItem('id');
    const nom = localStorage.getItem('name');
    console.log(iduser);
    console.log(nom);
    if (!token || usertype !== "Client") {
        // Redirect to '/'
        navigate('/');}})
  return (
    <div className="letter-container">
      <p>Cher {nomclient},</p>
      <p>{contenu}</p>
      <p>Cordialement,</p>
      <p>{nom}</p>
    </div>
  );
};

export default Coverletter;
