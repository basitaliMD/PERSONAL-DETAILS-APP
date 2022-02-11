import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screens/profile";
import LogoutScreen from "../screens/logoutScreen";
import StackNavigator from "./StackNavigator";
import firebase from "firebase";
import CustomSidebarMenu from "../screens/CustomSideBarMenu";

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true
    };
  }
  
  fetchid=()=>{
    let theme;
      firebase
        .database()
        .ref("/users/" + firebase.auth().currentUser.uid)
        .on("value", function(snapshot) {
          theme = snapshot.val().current_theme;
        });
      this.setState({ light_theme: theme === "light" ? true : false });
  }
  
  componentDidMount() {
   this.fetchid();
  }

  render() {
    let props = this.props;
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: "blue",
          inactiveTintColor: this.state.light_theme ? "#6aff3d" : "white",
          itemStyle: { marginVertical: 5 }
        }}
        drawerContent={props => <CustomSidebarMenu {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={StackNavigator}
          options={{unmountOnBlur: true}}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="Logout"
          component={LogoutScreen}
          options={{ unmountOnBlur: true }}
        />
      </Drawer.Navigator>
    )
  }
}
