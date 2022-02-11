import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
  Alert,
  TouchableOpacity
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from "firebase";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class CreateDataScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
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

  async addData() {
    if (
      this.state.name &&
      this.state.DOB &&
      this.state.father &&
      this.state.mother &&
      this.state.adharNo &&
      this.state.panNo &&
      this.state.drivingLic &&
      this.state.presentAdrs &&
      this.state.permanentAdrs &&
      this.state.qualification &&
      this.state.jobDetail &&
      this.state.phoneNo 

    ) {
      let createData = {
        name: this.state.name,
        DOB: this.state.DOB,
        father: this.state.father,
        mother: this.state.mother,
        adharNo: this.state.adharNo,
        panNo: this.state.panNo,
        drivingLic: this.state.drivingLic,
        presentAdrs: this.state.presentAdrs,
        permanentAdrs: this.state.permanentAdrs,
        qualification: this.state.qualification,
        jobDetail: this.state.jobDetail,
        phoneNo: this.state.phoneNo,
        author: firebase.auth().currentUser.displayName,
        created_on: new Date(),
        author_uid: firebase.auth().currentUser.uid,
      }

      await firebase
        .database()
        .ref(
          "/posts/" +
            Math.random()
              .toString(36)
              .slice(2)
        )
        .set(createData)
        .then(function(snapshot) {})
      this.props.setUpdateToTrue()
      this.props.navigation.navigate("Feed")
    } else {
  
    }
  }

  fetchUser = () => {
    let theme
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", snapshot => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === "light" })
      })
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } 
    else {
      return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }
              >
                New Data
              </Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <ScrollView>
            <Image 
             source={require("../assets/logo2.png")}
            style={styles.previewImage}
            >  
            </Image>
              <View style={{ marginHorizontal: RFValue(10) }}>
                <TextInput
                  style={
                    this.state.light_theme
                      ? styles.inputFontLight
                      : styles.inputFont
                  }
                  onChangeText={name => this.setState({ name })}
                  placeholder={"Name"}
                  placeholderTextColor={
                    this.state.light_theme ? "black" : "white"
                  }
                />
                <TextInput
                  style={[
                    this.state.light_theme
                      ? styles.inputFontLight
                      : styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig
                  ]}
                  onChangeText={DOB => this.setState({ DOB })}
                  placeholder={"DOB"}
                  multiline={true}
                  keyboardType = "numeric"
                  numberOfLines={4}
                  placeholderTextColor={
                    this.state.light_theme ? "black" : "white"
                  }
                />
                <TextInput
                  style={[
                    this.state.light_theme
                      ? styles.inputFontLight
                      : styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig
                  ]}
                  onChangeText={father => this.setState({ father })}
                  placeholder={"father Name"}
                  multiline={true}
                  numberOfLines={20}
                  placeholderTextColor={
                    this.state.light_theme ? "black" : "white"
                  }
                />
                <TextInput
                  style={[
                    this.state.light_theme
                      ? styles.inputFontLight
                      : styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig
                  ]}
                  onChangeText={mother => this.setState({ mother })}
                  placeholder={"mother Name"}
                  multiline={true}
                  numberOfLines={4}
                  placeholderTextColor={
                    this.state.light_theme ? "black" : "white"
                  }
                />
                <TextInput
                  style={[
                    this.state.light_theme
                      ? styles.inputFontLight
                      : styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig
                  ]}
                  onChangeText={adharNo => this.setState({ adharNo })}
                  placeholder={"adhar.No"}
                  keyboardType = "numeric"
                  multiline={true}
                  numberOfLines={4}
                  placeholderTextColor={
                    this.state.light_theme ? "black" : "white"
                  }
                />
                <TextInput
                  style={[
                    this.state.light_theme
                      ? styles.inputFontLight
                      : styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig
                  ]}
                  onChangeText={panNo => this.setState({ panNo })}
                  placeholder={"Pan.No"}
                  multiline={true}
                  numberOfLines={4}
                  placeholderTextColor={
                    this.state.light_theme ? "black" : "white"
                  }
                />
                <TextInput
                  style={[
                    this.state.light_theme
                      ? styles.inputFontLight
                      : styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig
                  ]}
                onChangeText={drivingLic => this.setState({ drivingLic })}
                placeholder={"driving License"}
                multiline={true}
                numberOfLines={4}
                  placeholderTextColor={
                    this.state.light_theme ? "black" : "white"
                  }
                />
                <TextInput
                  style={[
                    this.state.light_theme
                      ? styles.inputFontLight
                      : styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig
                  ]}
                onChangeText={presentAdrs => this.setState({ presentAdrs })}
                placeholder={"present address"}
                multiline={true}
                numberOfLines={4}
                  placeholderTextColor={
                    this.state.light_theme ? "black" : "white"
                  }
                />
                <TextInput
                  style={[
                    this.state.light_theme
                      ? styles.inputFontLight
                      : styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig
                  ]}
                  onChangeText={permanentAdrs => this.setState({ permanentAdrs })}
              placeholder={"permanent address"}
              multiline={true}
              maxLength = {50}
                  numberOfLines={4}
                  placeholderTextColor={
                    this.state.light_theme ? "black" : "white"
                  }
                />
                <TextInput
                  style={[
                    this.state.light_theme
                      ? styles.inputFontLight
                      : styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig
                  ]}
                  onChangeText={qualification => this.setState({ qualification })}
                  placeholder={"qualification"}
                  multiline={true}
                  numberOfLines={4}
                  placeholderTextColor={
                    this.state.light_theme ? "black" : "white"
                  }
                />
                <TextInput
                  style={[
                    this.state.light_theme
                      ? styles.inputFontLight
                      : styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig
                  ]}
                  onChangeText={jobDetail => this.setState({ jobDetail })}
                  placeholder={"job Details"}
                  multiline={true}
                  numberOfLines={4}
                  placeholderTextColor={
                    this.state.light_theme ? "black" : "white"
                  }
                />
                <TextInput
                  style={[
                    this.state.light_theme
                      ? styles.inputFontLight
                      : styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig
                  ]}
                  onChangeText={phoneNo => this.setState({ phoneNo })}
                  placeholder={"phone.No"}
                  keyboardType = "numeric"
                  multiline={true}
                  maxLength = {10}
                  numberOfLines={4}
                  placeholderTextColor={
                    this.state.light_theme ? "black" : "white"
                  }
                />
              </View>
              <View style={styles.submitButtonContainer}>
                <TouchableOpacity style={styles.submitButton}
                  onPress={
                    this.addData(),
                    createButtonAlert
                  }
                >
                  <Text style={styles.submitText}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 50,
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  fieldsContainer: {
    flex: 0.85
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain"
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    fontFamily: "Bubblegum-Sans"
  },
  inputFontLight: {
    height: RFValue(40),
    borderColor: "black",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "black",
    fontFamily: "Bubblegum-Sans"
  },
  inputFontExtra: {
    marginTop: RFValue(15)
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5)
  },
  submitButtonContainer: {
    marginTop: RFValue(20),
    alignItems: "center",
    justifyContent: "center"
  },
  submitButton: {
    width: 100,
    height: 40,
    backgroundColor: "#ff1f1f",
    borderRadius: 7.5,
    justifyContent: "center",
    alignSelf: "center",
  },
  submitText: {
   fontSize: 25,
   fontFamily: "Bubblegum-Sans",
   color:"white",
   alignText: "center",
   alignSelf: "center",
   justifyContent: "center",
  }
})

const createButtonAlert = () =>
  Alert.alert(
    "NOTE:",
    "You Details have been created",
    [
      {
        text: "Ok",
        onPress: () => console.log("Ok")
      }
    ]
  )