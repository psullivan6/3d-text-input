import React from 'react';
import './styles.css';

function UI({ onChange, onClick, textValue, lettersArray }) {
  return (
    <section className="UI">
      <h1>UI LAYER</h1>
      <ul>
        {lettersArray.map(({ id, letter }, index) => (
          <li key={`UILetters-${id}`}>{letter}</li>
        ))}
      </ul>
      <button onClick={onClick}>CLICK FER BOX</button>
      <input type="text" onChange={onChange} value={textValue} />
    </section>
  );
}

export default UI;
