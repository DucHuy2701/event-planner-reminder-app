import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    try {
      const res = await axios.post(endpoint, data);
      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        alert("Login Successfully!");
        window.location.href = "/events";
      } else {
        alert("Signup Successfully, please Login!");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">
                {isLogin ? "Login" : "Signup"}
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    {...register("email", {
                      required: "Email is important!",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email is not valid!",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    {...register("password", {
                      required: "Password is important!",
                      minLength: { value: 6, message: "6-digits minimum!" },
                    })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                <button className="btn btn-primary w-100" type="submit">
                    {isLogin ? 'Login' : 'Signup'}
                </button>
              </form>

              <p className="text-center mt-3">
                {isLogin ? 'Do not have Account?' : 'Account owned?'}
                <button className="btn btn-link p-0" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'Signup' : 'Login'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;