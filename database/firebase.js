import firebaseConfig from "./firebaseConfig";
import * as firebase from "firebase";
import "firebase/firestore";

/**
 * Classe de conexão com o banco de dados firebase, é através dela que iremos
 * realizar a autenticação e as operações de banco de dados no sistema.
 */
class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  /**
   * Método de autenticação de usuário utilizando endereço de e-mail e senha de usuário.
   *
   * @param {string} email Endereço de e-mail informado pelo usuário para ser
   * realizado o autenticação do usuário no firebase.
   * @param {string} password Senha informada pelo usuário para ser realizado a
   * autenticação do usuário no firebase.
   */
  loginWithEmail = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
    // .catch((error) => console.error(error));
  };

  /**
   * Método para envio do link para o endereço de e-mail do usuário cadastrado
   * no aplicativo, para ser realizado a recuperação de senha.
   *
   * @param {string} email Endereço de e-mail cadastrado no aplicativo para ser
   * enviado as instruções de recuperação de senha.
   */
  passwordReset = (email) => {
    return firebase.auth().sendPasswordResetEmail(email);
  };

  /**
   * Método para registro de usuários ao banco de dados utilizando
   * endereço de e-mail e senha.
   *
   * @param {string} email Endereço de e-mail informado pelo usuário para
   * novo registro no banco de dados.
   * @param {string} password Senha informado pelo usuário para novo registro
   * no banco de dados.
   */
  signUpWithEmail = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  /**
   * Método para deslogar o usuário conectado ao aplicativo
   */
  singOut = () => {
    return firebase.auth().signOut();
  };

  /**
   * Método para realizar a verificação se já existe algum usuário
   * logado no aplicativo
   * @param {} user
   */
  checkUserAuth = (user) => {
    return firebase.auth().onAuthStateChanged(user);
  };

  /**
   * Método assincrono para criação dos usuários no banco de dados.
   * @param {string} name Nome do usuário para realizar o novo registro no
   * banco de dados
   * @param {string} email Endereço de e-mail informado pelo usuário para
   * realizar o novo registro no banco de dados.
   * @param {string} localUri Uri da imagem que será adicionada no banco de dados
   */
  createUserAsync = async (name, email, localUri) => {
    console.log("LOCAL URI: " + localUri);
    let remoteUri = await this.uploadPhotoAsync(localUri);
    console.log("IMAGE URI: " + remoteUri);
    const uid = firebase.auth().currentUser.uid;
    console.log("UID: " + uid);
    return firebase
      .firestore()
      .collection("Users")
      .add({ name: name, email: email, photo: remoteUri, userId: uid });
  };

  uploadPhotoAsync = async (uri) => {
    const path = `photos/${Date.now()}.jpg`;

    return new Promise(async (res, rej) => {
      const response = await fetch(uri);
      const file = await response.blob();

      let upload = firebase.storage().ref(path).put(file);

      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err.stack);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  /**
   * Método assincrono para criação dos quiz respondidos no banco de dados.
   * @param {string} name Nome do usuário para realizar o novo registro no
   * banco de dados
   * @param {string} email Endereço de e-mail informado pelo usuário para
   * realizar o novo registro no banco de dados.
   * @param {string} localUri Uri da imagem que será adicionada no banco de dados
   */
  createQuizScoreAsync = async (
    answerTotalNumber,
    answerCorrect,
    answerCorrectBySubjects,
    answerCorrectByYear
  ) => {
    const uid = firebase.auth().currentUser.uid;
    console.log("UID: " + uid);
    return await firebase.firestore().collection("Quiz").add({
      userID: uid,
      answerTotalNumber: answerTotalNumber,
      answerCorrect: answerCorrect,
      answerCorrectBySubjects: answerCorrectBySubjects,
      answerCorrectByYear: answerCorrectByYear,
    });
  };
}

Firebase.shared = new Firebase();
export default Firebase;
