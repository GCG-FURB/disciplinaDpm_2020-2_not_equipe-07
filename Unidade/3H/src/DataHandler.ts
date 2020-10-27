import AsyncStorage from "@react-native-community/async-storage";
import React from "react";

class Pessoa {
  public nome: string;
  public idade: number;
  public endereco: Endereco;

  constructor(nome: string, idade: number, endereco: Endereco) {
    this.nome = nome;
    this.idade = idade;
    this.endereco = endereco;
  }
}

class Endereco {
  public endereco: string;
  public latitude: string;
  public longitude: string;

  constructor(endereco: string, latitude: string, longitude: string) {
    this.endereco = endereco;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

export class DataHandler extends React.Component {
  saveData(data): void {
    let endereco = this.createEndereco(data["endereco"]);
    let nome = data["nome"];
    let idade = data["nome"];
    let pessoa = new Pessoa(nome, idade, endereco);

    AsyncStorage.clear();
    AsyncStorage.setItem("1", JSON.stringify(pessoa));
  }

  createEndereco (endereco): Endereco {
    return new Endereco(endereco, endereco, endereco);
  };
}
