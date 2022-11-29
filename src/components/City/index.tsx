import { Canvas } from "@react-three/fiber"
import { Stage, MeshReflectorMaterial, OrbitControls } from "@react-three/drei"
import { Building } from "../../types"
import { Badge, Button, Modal, Text } from "@mantine/core"
import BuildingCreationModal from "../BuildingCreationModal"
import { useState } from "react"
import { Goerli, useEthers } from "@usedapp/core"
import { Vector3 } from "three"

const City = ({ buildings }: { buildings: Building[] }) =>{
    const { account, chainId } = useEthers()
    const [infoOpened, infoSetOpened] = useState(false)
    const [buildingInfo, setBuildingInfo] = useState<Building>({
        ownerName: '',
        message: '',
        position: new Vector3(0, 0, 0),
        height: 0,
        color: ''
    })
    const [opened, setClose] = useState(false)

    const onInfoSetOpened = () => infoSetOpened(false)

    const handleClick = (building: Building) =>{
        setBuildingInfo(building)
        infoSetOpened(true)
    }

    return (
        <>
        <Modal opened={infoOpened} onClose={onInfoSetOpened} title="Building Info">
            <Text color="blue">Owner: {buildingInfo.ownerName}</Text>
            <Text>Message: {buildingInfo.message}</Text>
            <Text>Building height: {buildingInfo.height}</Text>
            <div className="canvas-model">
                <Canvas>
                    <OrbitControls />
                    <ambientLight />
                    <pointLight color="white" position={[-1, -1, 1]} />
                    <Stage 
                        environment='city' 
                        intensity={0.6} 
                        shadows={false} 
                        adjustCamera={2 / buildingInfo.height + 0.4}
                    >
                        <mesh castShadow>
                            <boxBufferGeometry
                                args={[1, buildingInfo.height, 1]}
                            />
                            <MeshReflectorMaterial
                                color={buildingInfo.color === '#00' ? 'black' : buildingInfo.color} 
                                mirror={0.1}
                                blur={[300, 100]}
                                metalness={0.2} 
                                roughness={0.8}
                                />
                        </mesh>
                    </Stage>
                </Canvas>
            </div>
        </Modal>
        <div id='canvas-wrapper'>
            <Canvas>
                <OrbitControls />
                <ambientLight />
                <pointLight color="blue" position={[-10, -10, 10]} intensity={0.002} />
                <Stage environment='city' intensity={0.6} shadows={false}>
                    <group>
                    {buildings.map((building, index) =>(
                        <mesh
                            onClick={() => handleClick(building)}
                            castShadow
                            position={[building.position.x+index*1.5, building.height*0.5, building.position.z]} 
                            key={index} 
                        >
                            <boxBufferGeometry
                                args={[1, building.height, 1]}
                            />
                            <MeshReflectorMaterial
                                opacity={0.85}
                                transparent={true}
                                color={building.color === '#00' ? 'black' : building.color} 
                                mirror={0.6}
                                blur={[300, 100]}
                                metalness={0.2} 
                                roughness={0.8}
                                />
                        </mesh>
                    ))}
                    </group>
                </Stage>
            </Canvas>
        </div>
        <Button
            onClick={() => setClose(true)}
            variant="light"
            radius="xl"
            disabled={!account || chainId !== Goerli.chainId}
            sx={{
            position: "fixed",
            bottom: 42,
            right: 42,
            }}
        >
            Mint a new building
      </Button>
      <BuildingCreationModal
        opened={opened}
        onClose={() => setClose(false)}
      />
    </>
    )
}

export default City