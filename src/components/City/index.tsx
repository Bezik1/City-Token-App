import { Canvas } from "@react-three/fiber"
import { Stage, MeshReflectorMaterial, OrbitControls } from "@react-three/drei"
import { Building } from "../../types"
import { Button } from "@mantine/core"
import BuildingCreationModal from "../BuildingCreationModal"
import { useState } from "react"
import { Goerli, useEthers } from "@usedapp/core"

const City = ({ buildings }: { buildings: Building[] }) =>{
    const { account, chainId } = useEthers()
    const [opened, setClose] = useState(false)

    return (
        <>
        <div id='canvas-wrapper'>
            <Canvas>
                <OrbitControls />
                <ambientLight />
                <pointLight color="blue" position={[-10, -10, 10]} intensity={0.002} />
                <Stage environment='city' intensity={0.6} shadows={false}>
                    <group>
                    {buildings.map((building, index) =>(
                        <mesh
                            castShadow
                            position={[building.position.x+index*1.5, building.height === 1 ? -0.5 : 0, building.position.z]} 
                            key={index} 
                        >
                            <boxBufferGeometry
                                args={[1, building.height, 1]}
                            />
                            <MeshReflectorMaterial
                                opacity={0.85}
                                transparent={true}
                                color={building.color} 
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