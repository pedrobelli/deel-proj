import styles from "./Typeahead.module.css";

const Typeahead = (props: any) => {
  const { options } = props;

  return (
    <>
      <div className={styles.typeahead}>
        <input type="text" />
      </div>
    </>
  );
};

export default Typeahead;
