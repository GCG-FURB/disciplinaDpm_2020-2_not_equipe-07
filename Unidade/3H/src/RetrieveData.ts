import AsyncStorage from "@react-native-community/async-storage";
import React from "react";

export default class retrieveData extends React.Component {
    retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem("1");
        if (value !== null) {
          return value;
        }
      } catch (error) {
        console.log("Erro ao recuperar dados");
      }
    };
  };
  