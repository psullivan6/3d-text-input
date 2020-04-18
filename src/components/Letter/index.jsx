import React from 'react';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useBox } from 'use-cannon';

function Letter({ url, letter, ...props }) {
  const gltf = useLoader(GLTFLoader, url);
  const [ref] = useBox(() => ({
    mass: 1,
    position: [0, 5, 0],
    // rotation: [0.4, 0.2, 0.5],
    rotation: [Math.PI / 2, 0, 0],
    ...props,
  }));

  const object = gltf.nodes[letter.toUpperCase()].clone();

  // return <primitive object={gltf.scene} dispose={null} {...props} />;

  return (
    <primitive
      ref={ref}
      receiveShadow
      castShadow
      object={object}
      dispose={false}
      {...props}
    />
  );
}

export default Letter;
