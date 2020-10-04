import ReactDOM from "react-dom"
import React, { useRef } from "react"
import { Canvas, ReactThreeFiber, useFrame } from "react-three-fiber"
import { Html } from "drei"
import "./styles.css"
import * as THREE from "three"

function Dodecahedron({ time, ...props }) {
    return (
        <mesh {...props}>
            <dodecahedronBufferGeometry attach="geometry" />
            <meshStandardMaterial attach="material" roughness={0.75} emissive="#404057" />
            <Html scaleFactor={10}>
                <div className="content">
                    Suspense <br />
                    {time}ms
        </div>
            </Html>
        </mesh>
    )
}

function Content() {
    const ref = useRef<THREE.Group>(null);
    
    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.01
        }
    });
    
    return (
        <group ref={ref}>
            <Dodecahedron time={500} position={[-2, 0, 0]} />
            <Dodecahedron time={1000} position={[0, -2, -3]} />
            <Dodecahedron time={1500} position={[2, 0, 0]} />
        </group>
    )
}

ReactDOM.render(
    <Canvas concurrent style={{ background: "#0e0e0f" }} camera={{ position: [0, 0, 7.5] }}>
        <pointLight color="indianred" />
        <pointLight position={[10, 10, -10]} color="orange" />
        <pointLight position={[-10, -10, 10]} color="lightblue" />
        <Content />
    </Canvas>,
    document.getElementById("root")
)
