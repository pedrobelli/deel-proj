import { useState } from "react";

import styles from "./Typeahead.module.css";

const Typeahead = () => {
  const tempOptions: string[] = [
    "Lord of the Rings",
    "Star Wars",
    "Star Wars II",
    "Star Wars III",
    "Everything Everywhere All at Once",
    "Spider Man No Way Home",
  ];

  const [typeaheadText, setTypeaheadText] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [activeOption, setActiveOption] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  const changeHandler = (event: any) => {
    const tempText = event.target.value;
    setTypeaheadText(tempText);

    if (tempText.length > 2) {
      setOptions(
        tempOptions.filter(
          (option: any) =>
            option.toLowerCase().indexOf(typeaheadText.toLowerCase()) > -1
        )
      );
      setShowOptions(true);
      setActiveOption(0);
    } else if (tempText.length <= 2) {
      setShowOptions(false);
    }
  };

  const keyDownHandler = (event: any) => {
    if (event.keyCode === 13) {
      setSelectedMovie(options[activeOption]);
      setTypeaheadText("");
      setShowOptions(false);
      setActiveOption(0);
    } else if (event.keyCode === 38) {
      if (activeOption === 0) {
        return;
      }
      setActiveOption(activeOption - 1);
    } else if (event.keyCode === 40) {
      if (activeOption + 1 === options.length) {
        return;
      }
      setActiveOption(activeOption + 1);
    }
  };

  const clickHandler = (event: any) => {
    setSelectedMovie(event.currentTarget.innerText);
    setTypeaheadText("");
    setShowOptions(false);
    setActiveOption(0);
  };

  const showOptionsList = () => {
    if (options.length) {
      return <ul className="options">
        {options.map((optionName, index) => {
          return (
            <li className={`${index === activeOption && styles['active-option']}`} key={optionName} onClick={clickHandler}>
              {optionName}
            </li>
          );
        })}
      </ul>
    } else {
      return (
        <div className={styles['no-option-found']}>
          <p>No option found!</p>
        </div>
      );
    }

  };

  return (
    <>
      <div className={styles.typeahead}>
        <input type="text" value={typeaheadText} onChange={changeHandler} onKeyDown={keyDownHandler}/>
        {showOptions && showOptionsList()}
        {selectedMovie.length > 0 && <p>{selectedMovie}</p>}
      </div>
    </>
  );
};

export default Typeahead;
