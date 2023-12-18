export function* intersectionStateMachine(states) {
  let tick = 0;
  while (true) {
    yield states[tick++ % states.length];
  }
}

export function sleep(ms, signal) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve();
    }, ms);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        resolve();
      },
      { once: true }
    );
  });
}

export async function loop({
  setLights,
  setController,
  intersectionState,
  intersectionStateMachine,
  sleep,
}) {
  for await (const state of intersectionStateMachine(intersectionState)) {
    const controller = new AbortController();
    setController(controller);
    const signal = controller.signal;
    setLights(state.state);
    await sleep(state.duration, signal, state);
  }
}
