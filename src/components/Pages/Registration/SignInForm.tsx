import React, { useState } from "react";
import SignInInput from "../../UI/Inputs/SignInInput";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormButton from "../../Button/FormButton";

interface FormInputs {
  login: string;
  password: string;
  password2: string;
  checkbox: boolean;
}

const SignInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    getValues,
  } = useForm<FormInputs>({
    mode: "all",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();

  const passwordVisibility = () => {
    setShowPassword((visibility) => !visibility);
  };

  const passwordVisibility2 = () => {
    setShowPassword2((visibility) => !visibility);
  };

  const secondPasswordValidation = async (value: string) => {
    const password1 = getValues("password");
    return value === password1 || "passwords don't match";
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    alert("registration completed successfully");
    console.log(data);
    navigate("/account");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signInForm">
      <h1>Registration</h1>

      <SignInInput
        type="text"
        placeholder="enter login"
        register={register("login", {
          required: "login is required",
        })}
      />

      <div className="password">
        <SignInInput
          type={showPassword ? "text" : "password"}
          placeholder="enter password"
          register={register("password", {
            required: "password is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/,
              message:
                "password must be longer than 6 characters, shorter than 10 characters, include one uppercase letter, one lowercase letter, and one number.",
            },
          })}
        />
        <button
          type="button"
          onClick={passwordVisibility}
          className="visibility"
        >
          {showPassword ? "🙈" : "🙉"}
        </button>
      </div>

      <div className="password">
        <SignInInput
          type={showPassword2 ? "text" : "password"}
          placeholder="repeat password"
          register={register("password2", {
            required: "password2 is required",
            validate: secondPasswordValidation,
          })}
        />

        <button
          type="button"
          onClick={passwordVisibility2}
          className="visibility"
        >
          {showPassword2 ? "🙈" : "🙉"}
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "8px",
        }}
      >
        <SignInInput
          type="checkbox"
          register={register("checkbox", {
            required: "checkbox is required",
          })}
        />
        <p style={{ color: "#333333" }}>
          I'm agree to work with my personal data
        </p>
      </div>

      <div className="errors">
        {errors.login && <p>{errors.login.message}</p>}
        {errors.password && <p>{errors.password.message}</p>}
        {errors.password2 && <p>{errors.password2.message}</p>}
        {errors.checkbox && <p>{errors.checkbox.message}</p>}
      </div>

      <FormButton
        disabled={!isValid || isSubmitting}
        className={!isValid || isSubmitting ? "disabledBtn" : "button"}
      />
    </form>
  );
};

export default SignInForm;