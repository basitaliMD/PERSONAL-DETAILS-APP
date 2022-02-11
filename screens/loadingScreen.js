import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import firebase from "firebase";
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false
    }
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("DashboardScreen")
      } else {
        this.props.navigation.navigate("LoginScreen")
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}> 
          Loading...
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    fontWeight: "BOLD",
    fontSize: 20,
    color: "#17b2ff",
  },
})