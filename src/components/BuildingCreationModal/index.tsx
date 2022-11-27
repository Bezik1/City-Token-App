import {
  Button,
  ColorInput,
  Group,
  Modal,
  NumberInput,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useCreateBuilding } from "../../hooks/useCreateBuilding";
import { StrToHexColor } from "../../utils/ColorUtils";

const BuildingCreationModal = ({
  opened,
  onClose,
}: { opened: boolean, onClose: () => void }) => {
  const form = useForm({
    initialValues: {
      ownerName: "",
      message: "",
      height: 0,
      positionX: 0,
      positionZ: 0,
      color: "#b07c5e",
      windowsTint: "#b9eaed",
    },
  });

  const { loading, success, error, send } = useCreateBuilding();

  useEffect(() => {
    if (success) {
      onClose();
    }
  }, [success]);

  const handleSubmit = async (values: typeof form.values) => {
    await send(
      values.ownerName,
      values.message,
      [values.positionX, 0, values.positionZ],
      values.height,
      StrToHexColor(values.color),
    );
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Create a new building">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Owner name"
          placeholder="Satoshi Nakamoto"
          {...form.getInputProps("ownerName")}
        />
        <Space h="md" />
        <TextInput
          label="Message"
          placeholder="Hello world!"
          {...form.getInputProps("message")}
        />
        <Space h="md" />
        <NumberInput
          label="Position x:"
          placeholder={1}
          defaultValue={1}
          {...form.getInputProps("positionX")}
        />
        <NumberInput
          label="Position z:"
          placeholder={1}
          defaultValue={1}
          {...form.getInputProps("positionZ")}
        />
        <Space h="md" />
        <NumberInput
          label="Building Height"
          placeholder={1}
          defaultValue={1}
          required
          {...form.getInputProps("height")}
        />
        <Space h="md" />
        <ColorInput label="Color" required {...form.getInputProps("color")} />
        <Space h="md" />
        {!!error && (
          <>
            <Space h="md" />
            <Text color="red">An error occurred...</Text>
          </>
        )}
        <Group position="right">
          <Button type="submit" loading={loading}>
            {loading ? 'Minting...' : 'Mint'}
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default BuildingCreationModal