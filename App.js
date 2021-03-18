import React from "react";
import { Image } from "react-native";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

import InitialNavigation from "./routes/InitialNavigation.js";

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      isAssetsLoaded: false,
      isFontLoaded: false,
    };
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require("./assets/Background.png"),
      require("./assets/logo.png"),
      require("./assets/HomeModel.png"),
      require("./assets/BG_Quiz/BGQuizModel.png"),
      require("./assets/BG_Quiz/BGQuizText.png"),
      require("./assets/BG_Quiz/BGQuizTitle.png"),
      require("./assets/BG_Quiz/BGFinishQuizMediumModel.png"),
      require("./assets/QuizImage.png"),
      require("./assets/Raiox.png"),
    ]);

    await Font.loadAsync({
      Regular: require("./assets/fonts/Montserrat-Regular.otf"),
      Medium: require("./assets/fonts/Montserrat-Medium.otf"),
      Semibold: require("./assets/fonts/Montserrat-SemiBold.otf"),
      Bold: require("./assets/fonts/Montserrat-Bold.otf"),
      ExtraBold: require("./assets/fonts/Montserrat-ExtraBold.otf"),
    });

    await Promise.all([...imageAssets]);
  }

  handleFinishLoading = () => {
    this.setState({
      isReady: true,
    });
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={this.handleFinishLoading}
          onError={console.warn}
        />
      );
    }
    return <InitialNavigation />;
  }
}
