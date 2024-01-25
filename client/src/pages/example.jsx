import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Example() {
    const { users, getUsers, sendPassowrdForget } = useAuth();

    const sendNewPassword = async (event) => {
        event.preventDefault();  // Agrega esta línea
        const correo = event.target.elements.usu_correo.value;
        console.log(correo);
        await sendPassowrdForget(correo);
    };

    return (
        <div>
            <form onSubmit={sendNewPassword}>
                <input type="email" name="usu_correo" id="" placeholder="pon tu correo" />
                <input type="submit" value="Solicitar nueva contraseña" />
            </form>
        </div>
    );
}

export default Example;
