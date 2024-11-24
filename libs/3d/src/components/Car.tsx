import { Box } from '@react-three/drei'
import { Color } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { MathUtils, Vector3 } from 'three'
import { radians } from '../util/constants'

interface CarProps {
  color?: Color
  position?: Vector3
  size?: [number, number, number]
  searching?: boolean
  comment?: boolean
  trail?: boolean
  forward?: boolean
}

export const Car: React.FC<CarProps> = ({
  color = '#fff',
  position = new Vector3(0, 0, 0),
  forward = true,
  trail = true,
  searching = false,
  comment = false,
  size,
}) => {
  const [vehicleSize, setVehicleSize] = useState<[number, number, number]>([
    0, 0, 0,
  ])

  useEffect(() => {
    const newSize = size || [
      MathUtils.randFloat(1.9, 2.3),
      0.1,
      MathUtils.randFloat(4, 5.6),
    ]
    setVehicleSize(newSize)
  }, [size])

  return (
    <>
      <Box
        position={position}
        rotation={[radians(0), radians(90), 0]}
        args={vehicleSize}
      >
        <meshBasicMaterial color={color} />
      </Box>
    </>
  )
}
