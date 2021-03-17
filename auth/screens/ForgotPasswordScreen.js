import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { validate } from "validate.js";
import * as Animatable from "react-native-animatable";

import ForgetPasswordSchema from "../schemas/ForgetPasswordSchema";
import Firebase from "../../database/firebase";
import styles from "../styles/ForgotPasswordStyle";
import BackgroundApp from "../../components/BackgroundApp";

export default class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      errorMessage: null,
      isEmailTouched: false,
      isEmailValid: false,
      emailError: [],
    };
    this.checkEmailValidation = this.checkEmailValidation.bind(this);
  }

  _handleEmailInputChange(value) {
    this.setState({ email: value });
  }

  checkEmailValidation() {
    const validationResult = validate(
      { emailAddress: this.state.email },
      ForgetPasswordSchema
    );
    // validationResult is undefined if there are no errors
    if (validationResult == undefined) {
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

  handleForgotPassword = () => {
    const { email, isEmailValid } = this.state;
    // (error.code =='auth/user-not-found')
    ("Não encontramos nenhum usuário cadastrado com esse e-mail. O usuário pode ter sido excluído.");
    if (isEmailValid) {
      Firebase.shared
        .passwordReset(email)
        .then(
          Alert.alert(
            "Solicitação Enviada!",
            `Um e-mail foi enviado para o endereço ${this.state.email} contendo as instruções de redefinição da sua senha.`,
            [
              {
                text: "OK",
                onPress: () => this.props.navigation.navigate("Login"),
              },
            ],
            { cancelable: false }
          )
        )
        .catch((error) =>
          this.setState({
            errorMessage:
              error.code == "auth/user-not-found"
                ? "Não encontramos nenhum usuário cadastrado com esse e-mail. O usuário pode ter sido excluído."
                : error.message,
          })
        );
    } else {
      Alert.alert(
        "Alerta!",
        "Você deve informar um endereço de e-mail válido para redefinir sua senha."
      );
    }
  };

  render() {
    const icon = this.state.isEmailValid ? "check-circle" : "close-circle";
    const recolor = this.state.isEmailTouched
      ? this.state.isEmailValid
        ? "#26E636"
        : "#e74c3c"
      : "#000A06";
    const inputStyle = [styles.inputContainer];
    if (this.state.isEmailTouched) {
      if (!this.state.isEmailValid) {
        inputStyle.push({
          borderBottomColor: "#e74c3c",
          borderBottomWidth: 1,
        });
      } else {
        inputStyle.push({
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
          animation="fadeInLeftBig"
          style={styles.floatContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <TouchableOpacity
                style={styles.goBack}
                onPress={() => this.props.navigation.goBack()}
              >
                <Icons name="chevron-left" color="#000A06" size={30} />
                <Text style={styles.backText}>Voltar</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Esqueceu sua senha?</Text>
              <Text style={styles.subTitle}>
                Informe o endereço de e-mail associado a sua conta. Você irá
                receber um e-mail com as instruções para redefinir sua senha.
              </Text>
              {this.state.errorMessage != null ? (
                <View>
                  <Text style={styles.errorMessage}>
                    {this.state.errorMessage}
                  </Text>
                </View>
              ) : null}
              <View style={inputStyle}>
                <Icons name="account" color={recolor} size={20} />
                <TextInput
                  style={styles.input}
                  placeholder="Endereço de E-mail"
                  placeholderTextColor="rgba(0,0,0,0.2)"
                  returnKeyType="done"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(value) => this._handleEmailInputChange(value)}
                  onEndEditing={this.checkEmailValidation}
                  value={this.state.email}
                />
                {this.state.isEmailTouched ? (
                  <Animatable.View animation="bounceIn">
                    <Icons name={icon} color={recolor} size={20} />
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
              <TouchableOpacity
                style={styles.button}
                onPress={this.handleForgotPassword}
              >
                <Text style={styles.buttonText}>Redefinir sua senha</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Animatable.View>
      </View>
    );
  }
}
