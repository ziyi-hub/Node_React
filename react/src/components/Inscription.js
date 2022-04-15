import React from 'react';
import FormulaireInscription from './FormulaireInscription';
import Header from './Header';
import Footer from './Footer';


const Inscription = () => {
    return (
        <div>
            <Header />
            <FormulaireInscription />
            <Footer />
        </div>
    );
};

export default Inscription;

function passwordSame() {
    var password = document.getElementById("password");
    var confirm_password = document.getElementById("confirmPassword");

    function validatePassword() {
        if (password.value !== confirm_password.value) {
            confirm_password.setCustomValidity("Passwords Don't Match");
        } else {
            confirm_password.setCustomValidity("");
        }
    }

    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;
}
