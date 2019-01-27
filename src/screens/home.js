import React from "react";
import { serverURL } from "../../App";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, StyleSheet, SafeAreaView, Alert } from "react-native";
import RNSpeedometer from "react-native-speedometer";
import { Audio, Location, Permissions } from "expo";

class Home extends React.Component {
  // stack navigator's page settings
  static navigationOptions = {
    header: null,
    title: "Home"
  };

  // called when component mounds
  componentDidMount() {
    // grab the updated vehicle's location every second
    setInterval(() => this.updateVehicleLocation(), 1000);
    this.setVehicleInfo();
  }

  // state of the Home page
  constructor(props) {
    super(props);

    // state
    this.state = {
      neighborSpeed: 0,
      id: "",
      make: "",
      model: "",
      year: ""
    };

    // expo audio player
    this.audioPlayer = new Audio.Sound();

    // speedometer labels
    this.speedometerLabels = [
      // set all the texts to blank, but keep default colors
      { name: "VERY SLOW", labelColor: "#f4ab44", activeBarColor: "#f4ab44" },
      { name: "Too Slow", labelColor: "#f2cf1f", activeBarColor: "#f2cf1f" },
      { name: "Steady", labelColor: "#00ff6b", activeBarColor: "#00ff6b" },
      { name: "Steady", labelColor: "#14eb6e", activeBarColor: "#14eb6e" },
      { name: "Too Fast", labelColor: "#ff5400", activeBarColor: "#ff5400" },
      { name: "VERY FAST", labelColor: "#ff2900", activeBarColor: "#ff2900" }
    ];
  }

  // handle the neighbor speed's state
  onSpeedChange = value => this.setState({ neighborSpeed: value });

  // play the warning sound
  async playWarningSound() {
    try {
      // unload all other audios, and load the warning sound file
      await this.audioPlayer.unloadAsync();
      await this.audioPlayer.loadAsync(require("../audio/warning.mp3"));
      await this.audioPlayer.playAsync();
    } catch (error) {
      console.warn("Failed to load Audio file! ", error);
    }
  }

  // return the speed of the neighbor vehicle
  async getClosestVechileSpeed() {
    try {
    } catch (error) {
      console.warn("Failed to get the speed of the vechile! ", error);
    }
  }

  // set the state of the vehicle information
  async setVehicleInfo() {
    fetch(serverURL + "/get_vehicle_info")
      .then(response => {
        return response.json();
      })
      .then(data => {
        Alert.alert("Data", data);
      })
      .catch(error => {
        Alert.alert("Oh no!", error.message);
        return;
      });
  }

  // update the vehicle's location
  async updateVehicleLocation() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      Location.getCurrentPositionAsync({ enableHighAccuracy: true })
        .then(position => {
          // send the vehicle's location
          this.sendVehicleLocation(
            position.coords.latitude,
            position.coords.longitude
          );
          return; // cancel the location promise
        })
        .catch(error => {
          alert(
            error + ": " + "Please make sure your location (GPS) is turned on."
          );
        });
    }
  }

  // send the vehicle location to the socket server
  async sendVehicleLocation(latitude, longitude) {}

  // return if the closest vechile's speed is at least too slow or too fast
  isSpeedDrastic() {
    var drasticChange = 10;

    return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.speedLimitContainer} />
        <SafeAreaView style={styles.speedometerContainer}>
          <RNSpeedometer
            value={this.state.neighborSpeed}
            labels={this.speedometerLabels}
            labelStyle={styles.speedometerLabel}
            labelNoteStyle={styles.speedometerLabel}
          />
        </SafeAreaView>
      </View>
    );
  }
}

// style sheet for the Home Component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  speedLimitContainer: {
    flex: 0.35
  },
  speedometerContainer: {
    flex: 0.65
  },
  speedometerLabel: {
    fontSize: 50,
    fontWeight: "bold"
  }
});

export default Home;
