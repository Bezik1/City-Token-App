import { Button, Group, Text } from "@mantine/core";
import { Goerli, useEthers } from "@usedapp/core";

const WalletConnect = () => {
  const { activateBrowserWallet, account, deactivate, chainId, switchNetwork } =
    useEthers();
  if (account) {
    if (chainId === Goerli.chainId) {
      return <Button onClick={deactivate}>Disconnect</Button>;
    } else {
      return (
        <Group position="right">
          <Text color="red">Wrong network</Text>
          <Button onClick={() => switchNetwork(Goerli.chainId)}>
            Switch network
          </Button>
        </Group>
      );
    }
  } else {
    return <Button onClick={activateBrowserWallet}>Connect to MetaMask</Button>;
  }
};

export default WalletConnect