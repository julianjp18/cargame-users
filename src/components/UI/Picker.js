import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Modal,
    TouchableHighlight,
    TouchableWithoutFeedback
} from "react-native";
import PropTypes from "prop-types";

export default class PickerCustom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pickerDisplayed: false
        }
    }

    setPickerValue(item) {
        this.props.onChange(item.value);
        this.togglePicker();
    }

    togglePicker() {
        this.setState({
            pickerDisplayed: !this.state.pickerDisplayed
        })
    }

    render() {
        const pickerValues = this.props.pickerValues || [];
        const { placeholder, disabled } = this.props
        const value = this.props.value ? pickerValues.find(e => e.value == this.props.value) : null
        return (
            <View>
                <TouchableHighlight style={styles.container} onPress={() => !disabled && this.togglePicker()}>
                    <Text style={styles.title}>
                        {(value && value.title) || placeholder}
                    </Text>
                </TouchableHighlight>
                <Modal visible={this.state.pickerDisplayed} animationType={"slide"} transparent={true} onRequestClose={() => this.togglePicker()}>
                    <TouchableWithoutFeedback onPress={() => this.togglePicker()}>
                        <View style={styles.modalOverlay} />
                    </TouchableWithoutFeedback>
                    <View style={styles.modal}>
                        <ScrollView persistentScrollbar={true}>
                            <Text style={[styles.itemText, { fontWeight: 'bold' }]}>{placeholder}</Text>
                            {pickerValues.map((value, index) => {
                                return <TouchableHighlight key={index} onPress={() => this.setPickerValue(value)} style={styles.item}>
                                    <Text style={styles.itemText}>{value.title}</Text>
                                </TouchableHighlight>;
                            })}
                            <TouchableHighlight onPress={() => this.togglePicker()} style={{ paddingTop: 7, paddingBottom: 7 }}>
                                <Text style={styles.itemText}>Cancel</Text>
                            </TouchableHighlight>
                        </ScrollView>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: "rgba(255,255,255,0.4)"
    },
    modalOverlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0)"
    },
    title: {
        textAlign: "left",
        marginTop: 5,
        height: "100%"
    },
    itemText: {
        fontSize: 20,
        textAlign: "center"
    },
    item: {
        paddingTop: 7,
        paddingBottom: 7,
        borderBottomWidth: 0.2,
        borderBottomColor: "#47315a",
        width: "100%"
    },
    modal: {
        margin: 20,
        padding: 20,
        backgroundColor: "#efefef",
        bottom: 20,
        left: 20,
        right: 20,
        position: "absolute",
        borderRadius: 7,
        maxHeight: 200,
        flex: 1
    }
});

PickerCustom.propTypes = {
    onChange: PropTypes.func.isRequired,
};