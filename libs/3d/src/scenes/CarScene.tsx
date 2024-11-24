import { OrbitControls, PerspectiveCamera, Plane } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { Car } from '../components/Car'
import { Spawner } from '../components/Spawner'
import {
  radians,
  roadColor,
  WORLD_DURATION,
  WORLD_END,
  WORLD_START,
} from '../util/constants'

interface ICarSceneProps {
  camera?: React.ReactNode
  children?: React.ReactNode
  className?: string
  orbitControls?: boolean
  hideAllComments?: boolean
}

export const CarScene = ({
  children,
  camera,
  className = 'h-[calc(100vh-2rem)]',
  orbitControls = true,
  hideAllComments = false,
}: ICarSceneProps) => {
  const carStyle: React.CSSProperties = {
    background:
      'linear-gradient(to top right, hsl(0, 0%, 8%), hsl(52, 0%, 18%))',
  }

  return (
    <Canvas style={carStyle}>
      {camera || (
        <PerspectiveCamera
          makeDefault
          fov={45}
          near={0.1}
          far={1000}
          position={[40, 200, 40]}
          rotation={[radians(60), 0, 0]}
        />
      )}
      {children}

      {orbitControls ? (
        <OrbitControls
          minPolarAngle={radians(0)}
          maxPolarAngle={radians(30)}
          //   minAzimuthAngle={radians(0)}
          //   maxAzimuthAngle={radians(270)}
          minDistance={30}
          maxDistance={180}
        />
      ) : null}

      <Plane
        args={[1000, 24]}
        position={[0, -0.2, 0]}
        rotation={[radians(-90), 0, 0]}
      >
        <meshBasicMaterial color={roadColor} />
      </Plane>
      <Spawner
        spawnInterval={8.2}
        duration={WORLD_DURATION - 6}
        startPosition={new THREE.Vector3(WORLD_START, 0, -10)}
        endPosition={new THREE.Vector3(WORLD_END, 0, -10)}
      >
        <Car forward={false} searching comment={!hideAllComments && true} />
      </Spawner>
    </Canvas>
  )
}
