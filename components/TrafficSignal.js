import styles from "./TrafficSignal.module.css";

export function TrafficSignal({ active, location, isTurning = false }) {
  return (
    <div>
      <h3>{location}</h3>
      <div className={`${styles.trafficSignal}`}>
        <div className={`${styles.signal} ${active === "R" && styles.red}`} />
        <div
          className={`${styles.signal} ${active === "Y" && styles.yellow}`}
        />
        <div className={`${styles.signal} ${active === "G" && styles.green}`} />
        {isTurning && (
          <div
            className={`${styles.signal} ${active === "O" && styles.orange}`}
          />
        )}
      </div>
    </div>
  );
}
