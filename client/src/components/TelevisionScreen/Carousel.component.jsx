import CarouselItem from "./CarouselItem.component";
import styles from "./TelevisionScreen.module.css";

const Carousel = (props) => {
  const { active, setActive, items, handleObjectClick } = props;
  const itemCount = items.length;
  const MAX_VISIBILITY = 3; // Set this to your desired value

  return (
    <div className={styles.carousel}>
      {active > 0 && (
        <button
          className={`${styles.nav} ${styles.left}`}
          onClick={() => setActive(active - 1)}
        >
          Prev
        </button>
      )}
      {items.map((item, index) => (
        <div
          key={index}
          className={styles.card_container}
          style={{
            "--active": index === active ? 1 : 0,
            "--offset": (active - index) / 3,
            "--direction": Math.sign(active - index),
            "--abs-offset": Math.abs(active - index) / 3,
            "pointer-events": active === index ? "auto" : "none",
            opacity: Math.abs(active - index) >= MAX_VISIBILITY ? "0" : "1",
            display:
              Math.abs(active - index) > MAX_VISIBILITY ? "none" : "block",
          }}
        >
          <CarouselItem
            handleObjectClick={handleObjectClick}
            title={item.title}
            content={item.content}
            src={item.src}
            alt={item.alt}
            src2={item.src2}
            alt2={item.alt2}
            src3={item.src3}
            alt3={item.alt3}
            url={item.url}
            url2={item.url2}
          />
        </div>
      ))}
      {active < itemCount - 1 && (
        <button
          className={`${styles.nav} ${styles.right}`}
          onClick={() => setActive(active + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Carousel;
