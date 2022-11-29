import { Header, Title, Container, Card, Badge, Text } from "@mantine/core"
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
      <Container 
        p="lg"
        sx={{
          zIndex: 1,
          pointerEvents: "none",
          marginTop: 100,
          marginLeft: 20,
          maxWidth: 350,
          height: "100vh",
          display: "flex",
          alignItems: "left",
          gap: 10,
          flexDirection: "column", 
        }}
      >
        {buildings.map((building, index) =>(
          <Card
            color="dark"
            key={index} 
            shadow="md" 
            sx={{ 
              width: 300,
              height: 400,
              padding: 10
            }}>
            <Badge>Floor #{index}</Badge>
            <Text weight={"bolder"}>{building.ownerName}</Text>
            <Text>{building.message}</Text>
          </Card>
        ))}
      </Container>
    </div>
  );
}

export default App;
