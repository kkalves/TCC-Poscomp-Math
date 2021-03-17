import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  LogBox,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { validate } from "validate.js";
import { StatusBar } from "expo-status-bar";

import Constants from "expo-constants";
import * as Permission from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import SignUpSchema from "../schemas/SignUpSchema";
import Firebase from "../../database/firebase";
import styles from "../styles/SignUpStyle";
import BackgroundApp from "../../components/BackgroundApp";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localUri: null,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: null,
      isNameTouched: false,
      isNameValid: false,
      nameError: [],
      isEmailTouched: false,
      isEmailValid: false,
      emailError: [],
      isPasswordTouched: false,
      isPasswordValid: false,
      passwordError: [],
      isConfirmPasswordTouched: false,
      isConfirmPasswordValid: false,
      confirmPasswordError: [],
      isSecureTextEntry: true,
      isConfirmSecureTextEntry: true,
    };
    this.updateSecureTextEntry = this.updateSecureTextEntry.bind(this);
    this.updateConfirmSecureTextEntry = this.updateConfirmSecureTextEntry.bind(
      this
    );
    this.checkNameValidation = this.checkNameValidation.bind(this);
    this.checkEmailValidation = this.checkEmailValidation.bind(this);
    this.checkPasswordValidation = this.checkPasswordValidation.bind(this);
    this.checkConfirmPasswordValidation = this.checkConfirmPasswordValidation.bind(
      this
    );
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentDidMount() {
    this.getPhotoPermission();
  }

  getPhotoPermission = async () => {
    if (Constants.platform.android) {
      const { status } = await Permission.askAsync(Permission.CAMERA_ROLL);

      if (status != "granted") {
        alert("Nós precisamos de permissão para acessar o seu rolo de camera.");
      }
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
    });

    if (!result.cancelled) {
      this.setState({ localUri: result.uri });
    }
  };

  _handleNameInputChange(value) {
    this.setState({ name: value });
  }

  _handleEmailInputChange(value) {
    this.setState({ email: value });
  }

  _handlePasswordInputChange(value) {
    this.setState({ password: value });
  }

  _handleConfirmPasswordInputChange(value) {
    this.setState({ confirmPassword: value });
  }

  updateSecureTextEntry() {
    this.setState({ isSecureTextEntry: !this.state.isSecureTextEntry });
  }

  updateConfirmSecureTextEntry() {
    this.setState({
      isConfirmSecureTextEntry: !this.state.isConfirmSecureTextEntry,
    });
  }

  checkNameValidation() {
    const validationResult = validate({ name: this.state.name }, SignUpSchema);
    // validationResult será indefinido se não houver erros no schema.
    if (validationResult["name"] == undefined) {
      this.setState({
        isNameTouched: true,
        isNameValid: true,
        nameError: [],
      });
    } else {
      this.setState({
        isNameTouched: true,
        isNameValid: false,
        nameError: validationResult["name"],
      });
    }
  }

  checkEmailValidation() {
    const validationResult = validate(
      { emailAddress: this.state.email },
      SignUpSchema
    );
    // validationResult is undefined if there are no errors
    if (validationResult["emailAddress"] == undefined) {
      this.setState({
        isEmailTouched: true,
        isEmailValid: true,
        emailError: [],
      });
    } else {
      this.setState({
        isEmailTouched: true,
        isEmailValid: false,
        emailError: validationResult["emailAddress"],
      });
    }
  }

  checkPasswordValidation() {
    const validationResult = validate(
      { password: this.state.password },
      SignUpSchema
    );
    // validationResult is undefined if there are no errors
    if (validationResult["password"] == undefined) {
      this.setState({
        isPasswordTouched: true,
        isPasswordValid: true,
        passwordError: [],
      });
    } else {
      this.setState({
        isPasswordTouched: true,
        isPasswordValid: false,
        passwordError: validationResult["password"],
      });
    }
  }

  checkConfirmPasswordValidation() {
    const validationResult = validate(
      {
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
      },
      SignUpSchema
    );
    // validationResult is undefined if there are no errors
    if (validationResult["confirmPassword"] == undefined) {
      this.setState({
        isConfirmPasswordTouched: true,
        isConfirmPasswordValid: true,
        confirmPasswordError: [],
      });
    } else {
      this.setState({
        isConfirmPasswordTouched: true,
        isConfirmPasswordValid: false,
        confirmPasswordError: validationResult["confirmPassword"],
      });
    }
  }

  handleRegister() {
    const { name, email, password, localUri } = this.state;
    Firebase.shared
      .signUpWithEmail(email, password)
      .then(() => {
        Firebase.shared
          .createUserAsync(name, email, localUri)
          .catch((error) => {
            this.setState({ errorMessage: error.code });
          });
        this.props.navigation.navigate("App");
      })
      .catch((error) => {
        this.setState({
          errorMessage:
            error.code == "auth/email-already-in-use"
              ? "O endereço de e-mail já se encontra em uso por outra conta."
              : error.message,
        });
      });
  }

  render() {
    const icon = {
      name: this.state.isNameValid ? "check-circle" : "close-circle",
      email: this.state.isEmailValid ? "check-circle" : "close-circle",
      password: this.state.isPasswordValid ? "check-circle" : "close-circle",
      confirmPassword: this.state.isConfirmPasswordValid
        ? "check-circle"
        : "close-circle",
    };
    const recolor = {
      name: this.state.isNameTouched
        ? this.state.isNameValid
          ? "#26E636"
          : "#e74c3c"
        : "#000A06",
      email: this.state.isEmailTouched
        ? this.state.isEmailValid
          ? "#26E636"
          : "#e74c3c"
        : "#000A06",
      password: this.state.isPasswordTouched
        ? this.state.isPasswordValid
          ? "#26E636"
          : "#e74c3c"
        : "#000A06",
      confirmPassword: this.state.isConfirmPasswordTouched
        ? this.state.isConfirmPasswordValid
          ? "#26E636"
          : "#e74c3c"
        : "#000A06",
    };
    const nameInputStyle = [styles.inputContainer];
    if (this.state.isNameTouched) {
      if (!this.state.isNameValid) {
        nameInputStyle.push({
          borderBottomColor: "#e74c3c",
          borderBottomWidth: 1,
        });
      } else {
        nameInputStyle.push({
          borderBottomColor: "#26E636",
          borderBottomWidth: 1,
        });
      }
    }
    const emailInputStyle = [styles.inputContainer];
    if (this.state.isEmailTouched) {
      if (!this.state.isEmailValid) {
        emailInputStyle.push({
          borderBottomColor: "#e74c3c",
          borderBottomWidth: 1,
        });
      } else {
        emailInputStyle.push({
          borderBottomColor: "#26E636",
          borderBottomWidth: 1,
        });
      }
    }
    const passwordInputStyles = [styles.inputContainer];
    if (this.state.isPasswordTouched) {
      if (!this.state.isPasswordValid) {
        passwordInputStyles.push({
          borderBottomColor: "#e74c3c",
          borderBottomWidth: 1,
        });
      } else {
        passwordInputStyles.push({
          borderBottomColor: "#26E636",
          borderBottomWidth: 1,
        });
      }
    }
    const confirmPasswordInputStyles = [styles.inputContainer];
    if (this.state.isConfirmPasswordTouched) {
      if (!this.state.isConfirmPasswordValid) {
        confirmPasswordInputStyles.push({
          borderBottomColor: "#e74c3c",
          borderBottomWidth: 1,
        });
      } else {
        confirmPasswordInputStyles.push({
          borderBottomColor: "#26E636",
          borderBottomWidth: 1,
        });
      }
    }
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#009362" style="light" />
        <BackgroundApp />
        <Animatable.View
          animation="bounceIn"
          duration={2000}
          style={styles.header}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {this.state.localUri !== null ? (
              <TouchableOpacity onPress={this.pickImage}>
                <Image
                  source={{ uri: this.state.localUri }}
                  style={styles.photo}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.avatar} onPress={this.pickImage}>
                <Icons
                  name="camera-plus"
                  size={40}
                  color="rgba(255,255,255,0.4)"
                />
              </TouchableOpacity>
            )}
          </TouchableWithoutFeedback>
        </Animatable.View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <TouchableOpacity
                style={styles.goBack}
                onPress={() => this.props.navigation.goBack()}
              >
                <Icons name="chevron-left" color="#000A06" size={30} />
                <Text style={styles.backText}>Voltar</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Crie sua conta</Text>
              <Text style={styles.subTitle}>
                Deixe-nos saber qual o seu nome, e-mail e sua senha.
              </Text>
              {this.state.errorMessage != null ? (
                <View>
                  <Text style={styles.errorMessage}>
                    {this.state.errorMessage}
                  </Text>
                </View>
              ) : null}
              <View>
                <View style={nameInputStyle}>
                  <Icons name="account" color={recolor.name} size={20} />
                  <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    placeholderTextColor="rgba(0,0,0,0.2)"
                    returnKeyType="next"
                    onSubmitEditing={() => this.emailInput.focus()}
                    autoCorrect={false}
                    onChangeText={(value) => this._handleNameInputChange(value)}
                    onEndEditing={this.checkNameValidation}
                    value={this.state.name}
                  />
                  {this.state.isNameTouched ? (
                    <Animatable.View animation="bounceIn">
                      <Icons name={icon.name} color={recolor.name} size={20} />
                    </Animatable.View>
                  ) : null}
                </View>
                {!this.state.isNameValid ? (
                  <View>
                    {this.state.nameError.map((error, index) => (
                      <Text key={index} style={styles.errorMessage}>
                        {error}
                      </Text>
                    ))}
                  </View>
                ) : null}
                <View style={emailInputStyle}>
                  <Icons name="at" color={recolor.email} size={20} />
                  <TextInput
                    style={styles.input}
                    placeholder="Endereço de E-mail"
                    placeholderTextColor="rgba(0,0,0,0.2)"
                    ref={(input) => (this.emailInput = input)}
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value) =>
                      this._handleEmailInputChange(value)
                    }
                    onEndEditing={this.checkEmailValidation}
                    value={this.state.email}
                  />
                  {this.state.isEmailTouched ? (
                    <Animatable.View animation="bounceIn">
                      <Icons
                        name={icon.email}
                        color={recolor.email}
                        size={20}
                      />
                    </Animatable.View>
                  ) : null}
                </View>
                {!this.state.isEmailValid ? (
                  <View>
                    {this.state.emailError.map((error, index) => (
                      <Text key={index} style={styles.errorMessage}>
                        {error}
                      </Text>
                    ))}
                  </View>
                ) : null}
                <View style={passwordInputStyles}>
                  <Icons name="lock" color={recolor.password} size={20} />
                  <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="rgba(0,0,0,0.2)"
                    ref={(input) => (this.passwordInput = input)}
                    returnKeyType="next"
                    onSubmitEditing={() => this.confirmPasswordInput.focus()}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={this.state.isSecureTextEntry}
                    onChangeText={(value) =>
                      this._handlePasswordInputChange(value)
                    }
                    onEndEditing={this.checkPasswordValidation}
                    value={this.state.password}
                  />
                  {this.state.isPasswordTouched ? (
                    <Animatable.View
                      animation="bounceIn"
                      style={{ marginRight: 10 }}
                    >
                      <Icons
                        name={icon.password}
                        color={recolor.password}
                        size={20}
                      />
                    </Animatable.View>
                  ) : null}
                  <TouchableOpacity onPress={this.updateSecureTextEntry}>
                    {this.state.isSecureTextEntry ? (
                      <Icons name="eye-off" color="#000A06" size={20} />
                    ) : (
                      <Icons name="eye" color="#26E636" size={20} />
                    )}
                  </TouchableOpacity>
                </View>
                {!this.state.isPasswordValid ? (
                  <View>
                    {this.state.passwordError.map((error, index) => (
                      <Text key={index} style={styles.errorMessage}>
                        {error}
                      </Text>
                    ))}
                  </View>
                ) : null}
                <View style={confirmPasswordInputStyles}>
                  <Icons
                    name="lock-reset"
                    color={recolor.confirmPassword}
                    size={20}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirme sua Senha"
                    placeholderTextColor="rgba(0,0,0,0.2)"
                    ref={(input) => (this.confirmPasswordInput = input)}
                    returnKeyType="done"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={this.state.isConfirmSecureTextEntry}
                    onChangeText={(value) =>
                      this._handleConfirmPasswordInputChange(value)
                    }
                    onEndEditing={this.checkConfirmPasswordValidation}
                    value={this.state.confirmPassword}
                  />
                  {this.state.isConfirmPasswordTouched ? (
                    <Animatable.View
                      animation="bounceIn"
                      style={{ marginRight: 10 }}
                    >
                      <Icons
                        name={icon.confirmPassword}
                        color={recolor.confirmPassword}
                        size={20}
                      />
                    </Animatable.View>
                  ) : null}
                  <TouchableOpacity onPress={this.updateConfirmSecureTextEntry}>
                    {this.state.isConfirmSecureTextEntry ? (
                      <Icons name="eye-off" color="#000A06" size={20} />
                    ) : (
                      <Icons name="eye" color="#26E636" size={20} />
                    )}
                  </TouchableOpacity>
                </View>
                {!this.state.isConfirmPasswordValid ? (
                  <View>
                    {this.state.confirmPasswordError.map((error, index) => (
                      <Text key={index} style={styles.errorMessage}>
                        {error}
                      </Text>
                    ))}
                  </View>
                ) : null}
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={this.handleRegister}
              >
                <Text style={styles.buttonText}>Criar sua conta</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.signUp}>
                <Text style={styles.signUpText}>Já possui uma conta?</Text>
                <Text
                  style={[
                    styles.signUpText,
                    {
                      marginLeft: 5,
                      color: "#009362",
                      fontFamily: "Bold",
                      fontSize: 16,
                    },
                  ]}
                  onPress={() => this.props.navigation.navigate("Login")}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Animatable.View>
      </View>
    );
  }
}
