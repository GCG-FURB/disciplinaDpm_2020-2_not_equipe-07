import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import "./styles/global.css";

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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
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
      "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB8xoaQ2tvLexzFIPbJQ0ttEHNCn1JYoHw&address=" +
        endereco
    );
    let json = await response.json();
    let longitude = -1;
    let latitude = -1;
    if (json) {
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
        <form>
          <label>
            Nome:
            <input type="text" name="nome" onChange={this.handleChange} />
          </label>
          <label>
            Idade:
            <input type="text" name="idade" onChange={this.handleChange} />
          </label>
          <label>
            Endereço:
            <input type="text" name="endereco" onChange={this.handleChange} />
          </label>
          <button type="button" onClick={this.handleSubmit}>
            Salvar
          </button>
          <button type="button" onClick={this.handleRecovery}>
            Recuperar
          </button>
        </form>
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
});
