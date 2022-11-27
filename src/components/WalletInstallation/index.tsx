import { Space, Text, Title } from "@mantine/core";

const WalletInstallation = () => {
  return (
    <>
      <Space h="xl" />
      <Title>MetaMask is required</Title>
      <Text>
        Follow the link to install
        <Text
          variant="link"
          component="a"
          href="https://metamask.io/download.html"
        >
          Meta Mask
        </Text>
      </Text>
    </>
  );
};

export default WalletInstallation