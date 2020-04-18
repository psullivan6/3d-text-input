import React, { Suspense, useState } from 'react';
import { Canvas } from 'react-three-fiber';
import { Physics, usePlane, useBox } from 'use-cannon';
import Letter from './components/Letter';
import OrbitControls from './components/OrbitControls';
import UI from './components/UI';

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1009, 1000]} />
      {/* <meshLambertMaterial attach="material" color="azure" /> */}
      <shadowMaterial attach="material" color="#171717" />
    </mesh>
  );
}

const colors = [
  '#c0d3b1',
  '#c6d41a',
  '#CE0F67',
  '#0858c1',
  '#8df0e4',
  '#436ac7',
  '#57decd',
  '#20cd7d',
  '#26c5b8',
  '#91811b',
  '#57545d',
];

function Cube(props) {
  const [ref] = useBox(() => ({
    mass: 1,
    position: [0, 10, 0],
    // rotation: [0.4, 0.2, 0.5],
    ...props,
  }));

  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color={colors[props.index]} />
    </mesh>
  );
}

function App() {
  const [cubes, setCubes] = useState([]);
  const [textValue, setTextValue] = useState('');
  const [lettersArray, setLettersArray] = useState([]);

  function handleClick() {
    const index = cubes.length;
    setCubes([...cubes, index + 1]);
  }

  function handleChange({ target, target: { value }, timeStamp }) {
    const cursorStart = target.selectionStart;
    // const cursorEnd = target.selectionEnd;

    const letter = value.slice(-1);
    const id = `${letter}-${Math.floor(timeStamp)}`;

    if (value.length > textValue.length) {
      console.log('ADD LETTER', id);
      setLettersArray([
        ...lettersArray,
        {
          letter,
          id,
        },
      ]);
    } else {
      console.log('REMOVE LETTER', cursorStart);
      const newArray = [...lettersArray];
      newArray.splice(cursorStart, 1);
      setLettersArray(newArray);
    }

    setTextValue(value);
    // setLettersArray(value.split(''));
  }

  return (
    <>
      <UI
        lettersArray={lettersArray}
        onChange={handleChange}
        onClick={handleClick}
        textValue={textValue}
      />
      <Canvas
        shadowMap
        sRGB
        gl={{ alpha: false }}
        camera={{ position: [5, 5, 10], fov: 50 }}
      >
        <color attach="background" args={['lightblue']} />
        <hemisphereLight intensity={0.35} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <axesHelper args={[5]} />
        <OrbitControls />
        <Physics>
          <Plane />
          {lettersArray.map(({ id, letter }, index) => (
            // <Cube key={`${index}-${letter}`} letter={letter} index={index} />
            <Suspense key={`fallback-${id}`} fallback={<Cube />}>
              <Letter
                key={id}
                url="/alphabet.gltf"
                letter={letter}
                scale={[41, 41, 41]}
              />
            </Suspense>
          ))}
        </Physics>
      </Canvas>
    </>
  );
}

export default App;
