export const ForgetPasswordSchema = {
  emailAddress: {
    presence: {
      allowEmpty: false,
      message: "^Campo Obrigatório! Informe seu endereço de e-mail.",
    },
    email: {
      message: "^Por favor informe um endereço de e-mail válido!",
    },
  },
};

export default ForgetPasswordSchema;
