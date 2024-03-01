import React from "react";
import styles from "./TelevisionScreen.module.css";

const CarouselItem = ({
  title,
  src,
  src2,
  src3,
  alt,
  alt2,
  alt3,
  url,
  url2,
  handleObjectClick,
}) => {
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <img className={styles.cardImage} src={src} alt={alt} />
      <a href={url2} target="_blank" rel="noopener, noreferrer">
        <img className={styles.cardGitIcon} src={src2} alt={alt2} />
      </a>
      <a href={url} target="_blank" rel="noopener, noreferrer">
        <img className={styles.cardWebIcon} src={src3} alt={alt3} />
      </a>

      <button
        className="absolute left-[155px] top-[235px] rounded-sm bg-customOrange px-[8px] pb-[2px] text-[0.6rem] text-slate-100"
        onClick={() =>
          handleObjectClick("exitTelevision", [50, 40, 50], [0, 20, 0], 1.1)
        }
      >
        Exit
      </button>
    </div>
  );
};

export default CarouselItem;
