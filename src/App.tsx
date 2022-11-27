import { Header, Title, Container } from "@mantine/core"
import './App.css';
import City from "./components/City";
import WalletConnect from "./components/WalletConnect";
import WalletInstallation from "./components/WalletInstallation";
import { useCity } from "./hooks/useCity";

const App = () =>{
  const { ethereum } = window as any
  const { buildings } = useCity()

  return (
    <div className="App">
      <Header
        height={60}
        px="xl"
        sx={{
          display: "flex",
          position: "fixed",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title>City Token</Title>
        <WalletConnect />
      </Header>
      <Container p="lg">
        {!ethereum ? <WalletInstallation /> : <City buildings={buildings}/>}
      </Container>
    </div>
  );
}

export default App;
