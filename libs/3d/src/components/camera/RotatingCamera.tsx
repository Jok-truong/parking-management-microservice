import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

import { useRef, useState } from 'react'

export const RotatingCamera = ({
  speed = 0.003,
  minFov = 30,
  maxFov = 60,
  radius = 80,
}) => {
  const [fov, setFov] = useState(() => THREE.MathUtils.randInt(minFov, maxFov))
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={fov}
        near={0.1}
        far={1000}
        position={[0, 100, 0]}
      />
    </>
  )
}
