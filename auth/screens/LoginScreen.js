import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
import { validate } from "validate.js";

import Firebase from "../../database/firebase";
import styles from "../styles/LoginStyle";
import BackgroundApp from "../../components/BackgroundApp";
import LoginSchema from "../schemas/LoginSchema";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: null,
      isEmailTouched: false,
      isEmailValid: false,
      emailError: [],
      isPasswordTouched: false,
      isPasswordValid: false,
      passwordError: [],
      isSecureTextEntry: true,
    };
    this.updateSecureTextEntry = this.updateSecureTextEntry.bind(this);
    this.checkEmailValidation = this.checkEmailValidation.bind(this);
    this.checkPasswordValidation = this.checkPasswordValidation.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  _handleEmailInputChange(value) {
    this.setState({ email: value });
  }

  _handlePasswordInputChange(value) {
    this.setState({ password: value });
  }

  updateSecureTextEntry() {
    this.setState({ isSecureTextEntry: !this.state.isSecureTextEntry });
  }

  checkEmailValidation() {
    const validationResult = validate(
      { emailAddress: this.state.email },
      LoginSchema
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
      LoginSchema
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

  handleLogin() {
    const { email, password } = this.state;
    Firebase.shared
      .loginWithEmail(email, password)
      .catch((error) => this.setState({ errorMessage: error.message }));
  }

  render() {
    const icon = {
      email: this.state.isEmailValid ? "check-circle" : "close-circle",
      password: this.state.isPasswordValid ? "check-circle" : "close-circle",
    };
    const recolor = {
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
    };
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
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#009362" style="light" />
        <BackgroundApp />

        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animatable.Image
              animation="bounceIn"
              duration={2000}
              source={require("../../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Text style={styles.title}>Seja Bem Vindo!</Text>
            <Text style={styles.subTitle}>
              Informe suas credenciais abaixo e acesse a sua conta.
            </Text>
            {this.state.errorMessage != null ? (
              <View>
                <Text style={styles.errorMessage}>
                  {this.state.errorMessage}
                </Text>
              </View>
            ) : null}
            <View>
              <View style={emailInputStyle}>
                <Icons name="account" color={recolor.email} size={20} />
                <TextInput
                  style={styles.input}
                  placeholder="Endereço de E-mail"
                  placeholderTextColor="rgba(0,0,0,0.2)"
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(value) => this._handleEmailInputChange(value)}
                  onEndEditing={this.checkEmailValidation}
                  value={this.state.email}
                />
                {this.state.isEmailTouched ? (
                  <Animatable.View animation="bounceIn">
                    <Icons name={icon.email} color={recolor.email} size={20} />
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
                  returnKeyType="go"
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
              <TouchableOpacity style={{ marginTop: 10 }}>
                <Text
                  style={styles.forgotPassword}
                  onPress={() =>
                    this.props.navigation.navigate("ForgotPassword")
                  }
                >
                  Esqueceu sua senha?
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
              <Text style={styles.buttonText}>Faça login na sua conta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signUp}>
              <Text style={styles.signUpText}>Não possui uma conta?</Text>
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
                onPress={() => this.props.navigation.navigate("SignUp")}
              >
                Increva-se
              </Text>
            </TouchableOpacity>
          </TouchableWithoutFeedback>
        </Animatable.View>
      </View>
    );
  }
}
