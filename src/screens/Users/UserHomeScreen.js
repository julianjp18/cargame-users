import React, { useState } from "react";
import { StyleSheet, View, Text, Picker } from "react-native";
import { useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import WelcomeServicio from "../../components/WelcomeServicio";
import TextInput from "../../components/UI/Input";
import { primaryColor, accentColor } from "../../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { CATEGORIES_LIST } from "../../constants/Utils";
import moment from "moment";
import Button from "../../components/UI/Button";
import { LinearGradient } from "expo-linear-gradient";

const linearGradientTitle = (title) => (
  <View style={styles.linearGradientTitleContainer}>
    <LinearGradient
      start={{ x: -1, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[primaryColor, accentColor]}
      style={styles.linearGradientContainer}
    >
      <Text style={styles.linearGradientTitle}>{title}</Text>
    </LinearGradient>
  </View>
);

const UserHomeScreen = (props) => {
  const [selectedValue, setSelectedValue] = useState("manana");
  moment.locale();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const typeServiceId = useSelector((state) => state.auth.typeServiceSelected);
  const categorySelected = CATEGORIES_LIST.find(
    (category) => category.id === typeServiceId
  );

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatePickerModal = () => {
    setShow(!show);
  };

  const inputChangeHandler = () => {};

  return typeServiceId ? (
    <View style={styles.homeContainer}>
      <WelcomeServicio navigation={props.navigation} />
      <ScrollView>
        <View style={styles.inputTextAreaContainer}>
          <TextInput
            label="Descripción (*)"
            placeholder="Aquí debes escribir que vas a enviar incluyendo tamaños y medidas. Ej: 1 cama doble, 1 nevera grande, 2 cajas medianas de 30 x 40cm.."
            isTextArea
          />
        </View>
       
        <View style={styles.arriveDateContainer}>
          <Text>Franja horaria</Text>
          <Picker
            selectedValue={selectedValue}
            style={styles.TravelContent}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="Mañana" value="manana" />
            <Picker.Item label="Tarde" value="tarde" />
          </Picker>
        
          {linearGradientTitle("Fecha de recogida")}
          <Text onPress={showDatePickerModal} style={styles.dateTravelContent}>
            {moment(date).format("ll")}
          </Text>
          {show && (
            <DateTimePicker
              testID="date-travel"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
       
        <View style={styles.userInfoContainer}>
          {linearGradientTitle("Datos de quien recibe")}
          <View style={styles.userInfoContent}>
            <TextInput
              id="name"
              label="Nombres y apellidos de quien recibe(*)"
              keyboardType="default"
              minLength={5}
              required
              autoCapitalize="words"
              errorText="¡UPS! Por favor ingresa tu nombre y apellido correctamente."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <TextInput
              id="phone"
              label="Celular (*)"
              keyboardType="numeric"
              required
              minLength={10}
              maxLength={10}
              autoCapitalize="none"
              errorText="¡UPS! Por favor ingresa un número de celular correcto."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          </View>
          <View style={styles.userBoton}>
            <Button title={`Siguiente`} />
          </View>
        </View>
      </ScrollView>
    </View>
  ) : (
    <View>
      <Text>Error</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    height: "100%",
  },
  inputTextAreaContainer: {
    marginTop: "4%",
    marginHorizontal: "2%",
  },
  linearGradientTitleContainer: {
    marginTop: "3%",
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderColor: "#87ceeb",
  },
  linearGradientTitle: {
    paddingVertical: "3%",
    paddingLeft: "5%",
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff",
  },
  userInfoContent: {
    marginTop: "1%",
    marginHorizontal: "2%",
  },
  dateTravelContent: {
    textAlign: "center",
    paddingVertical: "4%",
    paddingHorizontal: "30%",
    marginTop: "3%",
    marginBottom: "15%",
    marginHorizontal: "2%",
    borderColor: primaryColor,
    borderWidth: 1,
    borderRadius: 15,
  },
  TravelContent: {
  marginTop:'-18%',
  marginBottom: '-15%'
   
  },
  franja: {
    marginTop: '2%',
  },
  userBoton: {
    paddingVertical: "4%",
    paddingHorizontal: "15%",
    marginTop: "-8%",
  },
});

export default UserHomeScreen;
