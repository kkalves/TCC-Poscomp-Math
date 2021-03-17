import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Title, Caption, Drawer } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Firebase from "../database/firebase";
import * as firebase from "firebase";

import exampleImage from "../assets/defaultImage.jpg";

const exampleImageUri = Image.resolveAssetSource(exampleImage).uri;

export default class DrawerContent extends Component {
  constructor(props) {
    super(props),
      (this.state = {
        user: {
          name: "",
          email: "",
          photo: exampleImageUri,
        },
      });
    this.subscriber = firebase
      .firestore()
      .collection("Users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          if (
            documentSnapshot.data().userId === firebase.auth().currentUser.uid
          ) {
            this.setState({
              user: {
                name: documentSnapshot.data().name,
                email: documentSnapshot.data().email,
                photo:
                  documentSnapshot.data().photo != undefined
                    ? documentSnapshot.data().photo
                    : exampleImageUri,
              },
            });
          }
        });
      });
  }

  signOutUser = () => {
    Firebase.shared.singOut();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...this.props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <Avatar.Image
                source={{ uri: this.state.user.photo }}
                size={120}
              />
              <View style={{ alignItems: "center" }}>
                <Title style={styles.title}>{this.state.user.name}</Title>
                <Caption style={styles.caption}>
                  {this.state.user.email}
                </Caption>
              </View>
            </View>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                labelStyle={styles.label}
                icon={() => <Icon name="home" color="#fff" size={30} />}
                label="Página Inicial"
                onPress={() => {
                  this.props.navigation.navigate("Home");
                }}
              />
              <DrawerItem
                labelStyle={styles.label}
                icon={() => <Icon name="account" color="#fff" size={30} />}
                label="Perfil"
                onPress={() => {
                  this.props.navigation.navigate("Profile");
                }}
              />
              <DrawerItem
                labelStyle={styles.label}
                icon={() => (
                  <Icon name="book-open-page-variant" color="#fff" size={30} />
                )}
                label="Quizz"
                onPress={() => {
                  this.props.navigation.navigate("Quiz");
                }}
              />
              <DrawerItem
                labelStyle={styles.label}
                icon={() => <Icon name="information" color="#fff" size={30} />}
                label="Sobre"
                onPress={() => {
                  this.props.navigation.navigate("About");
                }}
              />
            </Drawer.Section>
          </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            labelStyle={styles.label}
            icon={() => <Icon name="exit-to-app" color="#fff" size={30} />}
            label="Sair"
            onPress={this.signOutUser}
          />
        </Drawer.Section>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#007f55",
    borderBottomWidth: 1,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    marginTop: 10,
    fontFamily: "ExtraBold",
    textAlign: "center",
  },
  caption: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
    fontFamily: "Regular",
    lineHeight: 14,
    marginBottom: 10,
  },
  drawerSection: {
    marginTop: 15,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Medium",
    marginLeft: 3,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    marginRight: 15,
    fontFamily: "Bold",
  },
  paragraph: {
    fontFamily: "Bold",
    marginRight: 3,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#007f55",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
