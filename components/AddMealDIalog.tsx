import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Portal, Dialog, TextInput, Button } from "react-native-paper";

interface Props {
  visible: boolean;
  onConfirm: (grams: string) => void;
  onDismiss: () => void;
}

const AddMealDialog = ({ visible, onConfirm, onDismiss }: Props) => {
  const [gramsInput, setGramsInput] = useState<string>("");

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => {
          onDismiss();
          setGramsInput("");
        }}
      >
        <Dialog.Title>How many grams?</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Grams"
            value={gramsInput}
            onChangeText={(text: string) =>
              setGramsInput(text.replace(/[^0-9]/g, ""))
            }
            mode="outlined"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              onDismiss();
              setGramsInput("");
            }}
          >
            Cancel
          </Button>
          <Button
            onPress={() => {
              onDismiss();
              onConfirm(gramsInput);
            }}
          >
            Done
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({});

export default AddMealDialog;
