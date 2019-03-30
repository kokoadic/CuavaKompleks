import React from 'react';
import { StyleSheet, Text, View,ActivityIndicator, TextInput, TouchableHighlight, Image } from 'react-native';

export default class App extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      city: '',
      forecast: {
        main: '-',
        description: '-',
        temp: 0,
        sunrise: 0,
        sunset: 0,
        pressure: 0,
        humidity: 0,
        sea_level: 0,
        grnd_level: 0,
        speed: 0,
        loading: false,

      }
    };
  }
  async getWeather() {

    try {
        this.setState({loading: true });
        let response = await fetch(
            'http://api.openweathermap.org/data/2.5/weather?q=' + this.state.city + '&appid=302eb6574c02ebe5a3058a6b3110751b&units=metric'
        );

        let responseJson = await response.json();
        return this.setState({
            loading: false,
            forecast: {
                main: responseJson.weather[0].main,
                description: responseJson.weather[0].description,
                temp: responseJson.main.temp,
                sunrise: responseJson.sys.sunrise,
                sunset: responseJson.sys.sunset,
                pressure: responseJson.main.pressure,
                humidity: responseJson.main.humidity,
                sea_level: responseJson.main.sea_level,
                grnd_level: responseJson.main.grnd_level,
                speed: responseJson.wind.speed
            }
        });
    } catch (error) {
        console.error(error);
        this.setState({loading: true });
    }
}
  render() {
    return (
    <View style={styles.containerMain}>
    <View style={styles.headerBar}>
            <Text style={styles.headerText}> Aplikasi Cuaca </Text>
        </View>
      <View style={styles.box1}>
          <Text style={styles.headerText}> Masukan Nama Kota </Text>
          <View style={styles.input}>
          <TextInput placeholder=" Masukan Nama kota "
              onChangeText={(city) => this.setState({ city })}/>
         </View>
            <TouchableHighlight activeOpacity={0.5} style={styles.button} onPress={() => this.getWeather()}>
            {
                 this.state.loading ? <ActivityIndicator color="white" size="large" style={styles.load} />
                    : <Text style={styles.footerText1}>Cari</Text>
            }
            </TouchableHighlight>
      </View>
      <View style={styles.box2}>
      <View style={styles.output1}>
        <View style={styles.iconContainer}>
          <Image source={description} style={styles.icon} />
       </View>
          <Text style={styles.Textbawah}>Temp : { this.state.forecast.description} </Text>
          </View>
          <View style={styles.output1}>
        <View style={styles.iconContainer}>
          <Image source={temp} style={styles.icon} />
       </View>
          <Text style={styles.Textbawah}> Wind Speed : { this.state.forecast.temp}°C </Text>
          </View>
          </View>
          <View style={styles.box2}>
          <View style={styles.output}>
        <View style={styles.iconContainer}>
          <Image source={main} style={styles.icon} />
       </View>
          <Text style={styles.Textbawah}> main : { this.state.forecast.main} </Text>
          </View>
          <View style={styles.output}>
        <View style={styles.iconContainer}>
          <Image source={wind} style={styles.icon} />
       </View>
          <Text style={styles.Textbawah}> Main Desc : { this.state.forecast.speed} </Text>
      </View>
    </View>
    <View style={styles.box2}>
      <View style={styles.output1}>
        <View style={styles.iconContainer}>
          <Image source={sunrise} style={styles.icon} />
       </View>
          <Text style={styles.Textbawah}> Sunrise : { this.state.forecast.sunrise}
          </Text>
          </View>
          <View style={styles.output1}>
        <View style={styles.iconContainer}>
          <Image source={sunset} style={styles.icon} />
       </View>
          <Text style={styles.Textbawah}> Sunset : { this.state.forecast.sunset} </Text>
          </View>
          </View>
          <View style={styles.box2}>
          <View style={styles.output}>
        <View style={styles.iconContainer}>
          <Image source={pressure} style={styles.icon} />
       </View>
          <Text style={styles.Textbawah}> Pressure : { this.state.forecast.pressure} </Text>
          </View>
          <View style={styles.output}>
        <View style={styles.iconContainer}>
          <Image source={humidity} style={styles.icon} />
       </View>
          <Text style={styles.Textbawah}> Humidity : { this.state.forecast.humidity} </Text>
      </View>
    </View>
    <View style={styles.box2}>
      <View style={styles.output1}>
        <View style={styles.iconContainer}>
          <Image source={sea_level} style={styles.icon} />
       </View>
          <Text style={styles.Textbawah}> Sea Level : { this.state.forecast.sea_level}
          </Text>
          </View>
          <View style={styles.output1}>
        <View style={styles.iconContainer}>
          <Image source={ground} style={styles.icon} />
       </View>
          <Text style={styles.Textbawah}> Ground Level : { this.state.forecast.grnd_level} </Text>
          </View>
          </View>


      <View style={styles.Footerbar}>
            <Text style={styles.footerText}> Copyright (C) Kukuh Adhicahyo - 1715051130</Text>
        </View>
</View>
    );
  }
}
const temp = require('./img/suhu.png');
const main = require('./img/cuaca.png');
const wind = require('./img/angin.png');
const sunrise = require('./img/sunrise.png');
const sunset = require('./img/sunset.png');
const pressure = require('./img/pressure.png');
const humidity = require('./img/humidity.png');
const sea_level = require('./img/levellaut.png');
const ground = require('./img/levelground.png');
const description = require('./img/main-desc.png');

const styles = StyleSheet.create({
  containerMain: {
    backgroundColor: '#e8eaff',
    flex: 1,
    flexDirection: 'column',
   },
   iconContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 45,
    width: 45,
  },

  icon: {
    tintColor: '#74CCFF',
    height: 20,
    width: 20,
  },
  box1: {
    flex: 0.4,
    backgroundColor: '#4AB4E8',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',

  },

  box2: {
    flex: 0.1,
    backgroundColor: '#e8eaff',
    marginLeft: 10,
    marginRight: 10,

    marginBottom:-1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',


},

  button: {
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F99010',
    flexDirection: 'row',



  },
  input: {
    width: 270,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',

  },
  output: {
    width: "53%",
    height: 45,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#C0CAC7',
    flexDirection: 'row',
    paddingRight: 20,
        marginBottom:5,

  },

  output1: {
    width: "53%",
    height: 45,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#D8DCDD',
    flexDirection: 'row',
    paddingRight: 15,
        marginBottom:5,

  },


  headerBar: {
    backgroundColor: "#4AB4E8",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 9,
    paddingTop: 11,
    height: 60,

    width: "100%",
    position: "relative",
},
Footerbar: {
  backgroundColor: "#e8eaff",
  justifyContent: "center",
  alignItems: "center",
  paddingLeft: 100,
  paddingRight: 100,
  paddingBottom: 0.5,
  paddingTop: 45,
  height: 60,

  width: "100%",
  position: "relative",
},

headerText: {

    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontWeight: 'bold'
},
footerText: {
  fontSize: 10,
  color: "black",
  textAlign: "center",
  fontWeight: 'bold'
},
footerText1: {
  fontSize: 14,
  color: "white",
  textAlign: "center",
  fontWeight: 'bold'
},
Textbawah: {
  fontSize: 11,
  color: "black",
  fontWeight: 'bold',

},
load: {
    position: "relative",

    alignItems: "center",
    justifyContent: "center"
  },
});
