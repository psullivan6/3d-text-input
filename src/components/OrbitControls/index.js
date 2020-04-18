import React, { useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { extend, useFrame, useThree } from 'react-three-fiber';

extend({ OrbitControls });

const Controls = props => {
  const { camera, gl } = useThree();
  const controls = useRef();

  useFrame(() => controls.current.update());

  return (
    <orbitControls ref={controls} args={[camera, gl.domElement]} {...props} />
  );
};

export default Controls;
