import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from "firebase";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
}

export default class DataCardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      details_id: this.props.details.key,
      details_data: this.props.details.value,
    }
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" });
      })
  }

  render() {
    let details = this.state.details_data;
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate("DataScreen", {
              details: details,
              details_id:this.state.details_id
            })
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View
            style={
              this.state.light_theme
                ? styles.cardContainerLight
                : styles.cardContainer
            }
          >
            <Image
              source={require('../assets/logo2.png')}
              style={styles.logoImage}
            ></Image>

            <View style={styles.nameContainer}>
              <View style={styles.nameTextContainer}>
                <Text         
                  style={
                    this.state.light_theme
                      ? styles.nameTextLight
                      : styles.nameText
                  }
                >
                  {details.name}
                </Text>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.descriptionTextLight
                      : styles.descriptionText
                  }
                >
                  {this.props.details.description}
                </Text>
              </View>
            </View>     
          </View>
        </TouchableOpacity>
      )
    }
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2)
  },
  logoImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  nameContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  nameTextContainer: {
    flex: 0.8
  },
  nameText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "white"
  },
  nameTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "black"
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(13),
    color: "white"
  },
  descriptionTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(13),
    color: "black"
  },
})