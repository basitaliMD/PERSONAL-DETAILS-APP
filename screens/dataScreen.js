import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Speech from 'expo-speech';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import firebase from 'firebase';
let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class DataScreen extends React.Component {
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

  fetchUser = () => {
    let theme;
    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({ light_theme: theme === 'light' })
      })
  }

  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate('Home');
    } else if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }>
                Your Data
              </Text>
            </View>
          </View>
          <View style={styles.dataContainer}>
            <ScrollView
              style={
                this.state.light_theme
                  ? styles.dataCardLight
                  : styles.dataCard
              }>
              <Image
                source={require("../assets/logo2.png")}
                style={styles.image}>
              </Image>
              <View style={styles.dataContainer}>
                <View style={styles.dataTextContainer}>
                  <Text
                    style={
                      this.state.light_theme
                        ? styles.nameTextLight
                        : styles.nameText
                    }>
                    Name - {this.props.route.params.details.name}
                  </Text>
                </View>
              </View>
              <View style={styles.dataTextContainer}>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.dobTextLight
                      : styles.dobText
                  }>
                  DOB - {this.props.route.params.details.DOB}
                </Text>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.fatherTextLight
                      : styles.fatherText
                  }>
                  Father - {this.props.route.params.details.father}
                </Text>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.motherTextLight
                      : styles.motherText
                  }>
                  Mother - {this.props.route.params.details.mother}
                </Text>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.adharNoTextLight
                      : styles.adharNoText
                  }>
                  AdharNo - {this.props.route.params.details.adharNo}
                </Text>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.panNoTextLight
                      : styles.panNoText
                  }>
                  PanNo - {this.props.route.params.details.panNo}
                </Text>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.drivingLicTextLight
                      : styles.drivingLicText
                  }>
                  DrivingLic - {this.props.route.params.details.drivingLic}
                </Text>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.presentAdrsTextLight
                      : styles.presentAdrsText
                  }>
                  PresentAdrs - {this.props.route.params.details.presentAdrs}
                </Text>
                <Text
                  style={
                    this.state.light_theme
                    ? styles.permanentAdrsTextLight
                    : styles.permanentAdrsText
                  }>
                PermanentAdrs -{this.props.route.params.details.permanentAdrs}
                </Text>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.qualificationTextLight
                      : styles.qualificationText
                  }>
                Qualification - {this.props.route.params.details.qualification}
                </Text>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.jobDetailTextLight
                      : styles.jobDetailText
                  }>
                  JobDetail - {this.props.route.params.details.jobDetail}
                </Text>
                <Text
                  style={
                    this.state.light_theme
                      ? styles.phoneNoTextLight
                      : styles.phoneNoText
                  }>
                  PhoneNo - {this.props.route.params.details.phoneNo}
                </Text>
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
    backgroundColor: '#15193c',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 70,
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  appTitleTextLight: {
    color: 'black',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  dataContainer: {
    flex: 1,
  },
  dataCard: {
    margin: RFValue(20),
    backgroundColor: '#2f345d',
    borderRadius: RFValue(20),
  },
  dataCardLight: {
    margin: RFValue(20),
    backgroundColor: 'white',
    borderRadius: RFValue(20),
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: '100%',
    alignSelf: 'center',
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: 'contain',
  },
  dataTextContainer: {
    flex: 0.8,    
    margin: 7.5,
  },
  nameText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    color: 'white',
  },
  nameTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    color: 'black',
  },
  dobText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(15),
    color: 'white',
  },
  dobTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(15),
    color: 'black',
  },
  fatherText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'white',
  },
  fatherTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'black',
  },
  motherText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'white',
  },
  motherTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'black',
  },
  adharNoText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'white',
  },
  adharNoTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'black',
  },
  panNoText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'white',
  },
  panNoTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'black',
  },
  drivingLicText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'white',
  },
  drivingLicTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'black',
  },
  presentAdrsText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'white',
  },
  presentAdrsTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'black',
  },
  permanentAdrsText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'white',
  },
  permanentAdrsTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'black',
  },
  qualificationText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'white',
  },
  qualificationTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'black',
  },
  jobDetailText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'white',
  },
  jobDetailTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'black',
  },
  phoneNoText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'white',
  },
  phoneNoTextLight: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(20),
    color: 'black',
  },
})