import { useEffect, useRef, useState } from "react";
import { getJob } from "./api";

export default function useJobPoll() {
  const [job, setJob] = useState(null);
  const [polling, setPolling] = useState(false);
  const timer = useRef(null);

  async function start(jobId) {
    stop();
    setPolling(true);

    const tick = async () => {
      try {
        const data = await getJob(jobId);
        const j = data.job || data;
        setJob(j);

        if (j.status === "succeeded" || j.status === "failed") {
          stop();
          return;
        }
      } catch (e) {
        // keep polling briefly; network hiccups happen
      }
      timer.current = setTimeout(tick, 800);
    };

    tick();
  }

  function stop() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setPolling(false);
  }

  useEffect(() => () => stop(), []);

  return { job, polling, start, stop, setJob };
}
