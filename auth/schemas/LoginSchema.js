export const LoginSchema = {
  emailAddress: {
    presence: {
      allowEmpty: false,
      message: "^Campo Obrigatório! Informe seu endereço de e-mail.",
    },
    email: {
      message: "^Por favor informe um endereço de e-mail válido!",
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: "^Campo Obrigatório! Informe a sua senha.",
    },
    length: {
      minimum: 6,
      message: "^A senha deverá possuir mais de 6 caracteres.",
    },
  },
};

export default LoginSchema;
