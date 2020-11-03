import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Button, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
class Pessoa {
  constructor(nome, idade, endereco) {
    this.nome = nome;
    this.idade = idade;
    this.endereco = endereco;
  }
}
class Endereco {
  constructor(endereco, latitude, longitude) {
    this.endereco = endereco;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
class HandleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    let endereco = await this.createEndereco(this.state["endereco"]);
    let nome = this.state["nome"];
    let idade = this.state["idade"];
    let pessoa = new Pessoa(nome, idade, endereco);
    console.log(endereco);
    await AsyncStorage.clear();
    await AsyncStorage.setItem("1", JSON.stringify(pessoa));
    alert("Dados salvos localmente");
  }

  async createEndereco(endereco) {
    let response = await fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyA8dThs16mRcmgEuorMMnp0CuH22VQNriw&address=" +
        endereco
    );
    let json = await response.json();
    let longitude = -1;
    let latitude = -1;
    if (json) {
      console.log(endereco)
      let location = json.results[0].geometry.location;
      latitude = location.lat;
      longitude = location.lng;
    }

    return new Endereco(endereco, longitude, latitude);
  }

  async handleRecovery(event) {
    const dataRecovered = await AsyncStorage.getItem("1");
    alert(dataRecovered);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Nome"
          onChangeText={value => this.setState({ nome: value })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Idade"
          onChangeText={value => this.setState({ idade: value })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Endereço"
          onChangeText={value => this.setState({ endereco: value })}
        />
        <Button 
          style={styles.button}
          onPress={this.handleSubmit} 
          title="Salvar" 
          color="#841584" />
        <Button
          style={styles.button}
          onPress={this.handleRecovery}
          title="Recuperar"
          color="#841584"
        />
        <StatusBar style="auto" />
      </View>
    );
  }
}

export default function App() {
  return <HandleForm />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    textAlign: "center",
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    width: "100%",
    height: 50,
    fontSize: 25,
    margin:5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5
  },
});
