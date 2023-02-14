import { useState } from "react";

import styles from "./Typeahead.module.css";
import useHttp from "../../hooks/use-http";
import { Show } from "../../models/Show";

interface BoldResult {
  results: string[];
  resultFindCount: string[];
}

const Typeahead = () => {
  const { sendRequest } = useHttp();

  const [typeaheadText, setTypeaheadText] = useState("");
  const [selectedShow, setSelectedShow] = useState<Show>(new Show());
  const [options, setOptions] = useState<Show[]>([]);
  const [activeOption, setActiveOption] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

  const changeHandler = async (event: any) => {
    const query = event.target.value;
    setTypeaheadText(query);

    if (query.length > 2) {
      const shows = await sendRequest(query);

      setOptions(shows);
      setShowOptions(true);
      setActiveOption(0);
    } else if (query.length <= 2) {
      setShowOptions(false);
    }
  };

  const keyDownHandler = (event: any) => {
    if (event.keyCode === 13) {
      setSelectedShow(options[activeOption]);
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
    setSelectedShow(event.currentTarget.innerText);
    setTypeaheadText("");
    setShowOptions(false);
    setActiveOption(0);
  };

  // function that returns a list of places where the text was found and the occurrences
  const boldResultPart = (optionName: string): BoldResult => {
    const regex = new RegExp(typeaheadText, "ig");
    return {
      results: optionName.split(regex),
      resultFindCount: [...optionName.matchAll(regex)].map((x) => x[0]),
    };
  };

  const showOptionsList = () => {
    if (options.length) {
      return (
        <ul className={styles.options}>
          {options.map((option, index) => {
            const { results, resultFindCount } = boldResultPart(option.title);

            const bolded = results.map((value, index) =>
              index > 0 ? (
                <span key={index}>
                  {<strong>{resultFindCount[index - 1]}</strong>}
                  {value}
                </span>
              ) : (
                value
              )
            );

            return (
              <li
                className={`${
                  index === activeOption && styles["active-option"]
                }`}
                key={option.id}
                onClick={clickHandler}
              >
                {bolded}
              </li>
            );
          })}
        </ul>
      );
    } else {
      return (
        <div className={styles["no-option-found"]}>
          <p>No option found!</p>
        </div>
      );
    }
  };

  return (
    <>
      <div className={styles.typeahead}>
        <h1 className={styles.title}>Type to search for a show</h1>
        <div className={styles["input-wrapper"]}>
          <p className={styles.tip}>
            *the search will start after you type 3 characters
          </p>
          <input
            type="text"
            className={styles.input}
            value={typeaheadText}
            onChange={changeHandler}
            onKeyDown={keyDownHandler}
          />
        </div>
        {showOptions && showOptionsList()}
        {selectedShow.id && <p>You selected the show: <strong>{selectedShow.title} ({selectedShow.year})</strong> </p>}
      </div>
    </>
  );
};

export default Typeahead;
