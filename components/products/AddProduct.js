import * as ImagePicker from "expo-image-picker";
import { Image, Modal, Platform, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { observer } from "mobx-react";
import { Button, Input, Item, Label, View, Icon } from "native-base";
import productStore from "../../stores/productStore";

const AddProduct = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const handleopen = () => {
    setModalVisible(true);
  };
  const [product, setProduct] = useState({
    image:
      "https://www.generationsforpeace.org/wp-content/uploads/2018/07/empty-300x240.jpg",

    name: "",
    price: 0,
    category: "",
  });
  const handleSubmit = () => {
    productStore.addProduct(product);
    setModalVisible(false);
    setProduct({
      image:
        "https://www.generationsforpeace.org/wp-content/uploads/2018/07/empty-300x240.jpg",

      name: "",
      price: 0,
      category: "",
    });
  };

  const imageSize = (image) => {
    console.log(image);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      let localUri = result.uri;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      setProduct({
        ...product,
        image: { uri: localUri, name: filename, type },
      });
    }
  };

  return (
    <>
      <Icon
        onPress={handleopen}
        name="pluscircle"
        type="AntDesign"
        style={styles.icon}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Product has been Added.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon
              name="close"
              style={{
                color: "tomato",
                position: "absolute",
                top: 10,
                right: 10,
              }}
              onPress={() => setModalVisible(false)}
            />
            <TouchableOpacity onPress={pickImage}>
              <Item>
                {product.image && (
                  <Image
                    source={
                      product.image.uri
                        ? { uri: product.image.uri }
                        : { uri: product.image }
                    }
                    style={{ width: "100%", height: 300, marginLeft: -9 }}
                  />
                )}
              </Item>
              <Text note style={{ fontSize: 17, textAlign: "center" }}>
                Add Your Picture
              </Text>
            </TouchableOpacity>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input
                value={product.name}
                onChangeText={(name) => setProduct({ ...product, name })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Price</Label>
              <Input
                value={product.price}
                onChangeText={(price) => setProduct({ ...product, price })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Category</Label>
              <Input
                value={product.category}
                onChangeText={(category) =>
                  setProduct({ ...product, category })
                }
              />
            </Item>
            <Button style={styles.openButton} onPress={handleSubmit}>
              <Text style={styles.textStyle}>Add</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default observer(AddProduct);
const styles = StyleSheet.create({
  input: { marginHorizontal: 5, fontSize: 20, color: "#fff" },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "green",
    borderRadius: 10,
    width: 70,
    elevation: 2,
    justifyContent: "center",
    bottom: -20,
    left: "20%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  icon: {
    fontSize: 40,
    color: "green",
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
