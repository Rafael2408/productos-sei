import '../../styles/formstyle.css'

import ReCAPTCHA from "react-google-recaptcha";
import { SECRET_KEY_RECAPTCHA } from '../../config';

import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [captchaValue, setCaptchaValue] = useState(null)
  const [errorsArray, seterrorsArray] = useState(null)

  const {signin, errors: signinErrors, user, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      switch (user.rol_id) {
        case 1:
          navigate('/admin');
          break;
        case 2:
          navigate('/operador');
          break;
        case 3:
          navigate('/auditor');
          break;
        case 4:
          navigate('/user');
          break;
        default:
          // Maneja cualquier otro caso
          break;
      }
    }
  }, [isAuthenticated, user]);


  const onSubmit = handleSubmit((data) => {
    if(captchaValue){
      signin(data, navigate);
    }
    else{
      alert('Por favor confirma que no eres un robot')
    }
  });

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value); // Actualiza el estado del captcha cuando el usuario lo completa
  }

  useEffect(() => {
    seterrorsArray(Object.values(signinErrors));
  }, [signinErrors]);

  return (
    <div>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div id="registerForm">
          <h1>Inicio de Sesión</h1>
          <div className="col-6">
                {errorsArray && errorsArray.map((error, i)=> (
                  <div key={i} className='errorsLogin'>
                    {error}
                  </div>
                ))}
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control inputs"
                  placeholder="Ingrese su correo electrónico"
                  {...register("usu_correo", {
                    required: "El correo es requerido",
                    minLength: {
                      value: 8,
                      message: "El correo debe tener al menos 8 caracteres",
                    },
                  })}
                />
                {errors.usu_correo && (
                  <span className="text-danger">
                    {errors.usu_correo.message}
                  </span>
                )}
                
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control inputs"
                  placeholder="Ingrese su contraseña"
                  {...register("usu_password", {
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 8,
                      message: "La contraseña debe tener al menos 8 caracteres",
                    },
                  })}
                />
                {errors.usu_password && (
                  <span className="text-danger">
                    {errors.usu_password.message}
                  </span>
                )}
              </div>

              <ReCAPTCHA
                sitekey={SECRET_KEY_RECAPTCHA} // Reemplaza esto con tu clave de sitio de reCAPTCHA v2
                onChange={handleCaptchaChange}
              />

              <button type="submit" className="btn btn-primary" id="btnSubmit">
                Ingresar
              </button>
            </form>
            <p className='haveAcount'>¿Aún no tienes una cuenta?
              <Link className='links' to="/register">Registrarse</Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
