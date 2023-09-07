import Timer from "./components/timer/timer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Timer />
    </main>
  );
}
