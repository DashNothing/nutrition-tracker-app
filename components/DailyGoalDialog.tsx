import React from "react";
import { Portal, Dialog, TextInput, Button } from "react-native-paper";

interface Props {
  visible: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
  onTextChange: (text: string) => void;
  dailyGoal: string;
}

const DailyGoalDialog = ({
  visible,
  onConfirm,
  onDismiss,
  onTextChange,
  dailyGoal,
}: Props) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={() => onDismiss()}>
        <Dialog.Title>Change my daily goal</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="My daily goal"
            value={dailyGoal}
            onChangeText={(text) => {
              onTextChange(text);
            }}
            mode="outlined"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => onDismiss()}>Cancel</Button>
          <Button onPress={() => onConfirm()}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DailyGoalDialog;
