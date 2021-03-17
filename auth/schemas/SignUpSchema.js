export const SignUpSchema = {
  name: {
    presence: {
      allowEmpty: false,
      message: "^Campo Obrigatório! Informe seu nome.",
    },
  },
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
  confirmPassword: {
    presence: {
      allowEmpty: false,
      message: "^Campo Obrigatório! Informe a confirmação de senha.",
    },
    equality: {
      attribute: "password",
      message: "^As senhas informadas não combinam!",
    },
  },
};

export default SignUpSchema;
