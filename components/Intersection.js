import { useCallback, useState, useEffect } from "react";

import { TrafficSignal } from "../components/TrafficSignal";

import { loop, sleep, intersectionStateMachine } from "../util";

import { intersectionState } from "../data";

import styles from "./Intersection.module.css";

export function Intersection({}) {
  const [lights, setLights] = useState([]);
  const [controller, setController] = useState({});
  const [cars, setCars] = useState({
    n1: 0,
    n2: 0,
    e1: 0,
    e2: 0,
    s1: 0,
    s2: 0,
    w1: 0,
    w2: 0,
  });

  const addCar = useCallback(
    (direction) => {
      const isCarAtRedLight = getWhichLightIsCarAt(direction, lights) === "R";
      isCarAtRedLight &&
        setCars((prevCars) => ({
          ...prevCars,
          [direction]: prevCars[direction] + 1,
        }));
      const isCarAlreadyAtLight = getIsCarAlreadyAtLight(direction, cars);
      const carsAtOtherLights = getCarsAtOtherLights(direction, cars);
      if (isCarAtRedLight && carsAtOtherLights === 0 && !isCarAlreadyAtLight) {
        controller.abort();
      }
    },
    [cars, controller, lights]
  );

  useEffect(() => {
    getDirectionOfCarsAtGreenAndOrangeLights(lights).forEach((direction) => {
      setCars((prevCars) => ({ ...prevCars, [direction]: 0 }));
    });
  }, [lights]);

  useEffect(() => {
    loop({
      setLights,
      setController,
      intersectionState,
      intersectionStateMachine,
      sleep,
    });
  }, []);
  return (
    <div className={styles.intersection}>
      <div className={styles.north}>
        <div className={styles.lights}>
          <div className={styles.light}>
            <div>cars: {cars.n1}</div>
            <button type="button" onClick={() => addCar("n1")}>
              Add 🚙
            </button>
            <TrafficSignal
              location="n1"
              active={lights.n1}
              cars={cars}
              isTurning
            />
          </div>
          <div className={styles.light}>
            <div>cars: {cars.n2}</div>
            <button type="button" onClick={() => addCar("n2")}>
              Add 🚙
            </button>
            <TrafficSignal location="n2" active={lights.n2} cars={cars} />
          </div>
        </div>
      </div>
      <div className={styles.eastwest}>
        <div className={styles.lights}>
          <div className={styles.light}>
            <div>cars: {cars.w1}</div>
            <button type="button" onClick={() => addCar("w1")}>
              Add 🚙
            </button>
            <TrafficSignal
              location="w1"
              active={lights.w1}
              cars={cars}
              isTurning
            />
          </div>
          <div className={styles.light}>
            <div>cars: {cars.w2}</div>
            <button type="button" onClick={() => addCar("w2")}>
              Add 🚙
            </button>
            <TrafficSignal location="w2" active={lights.w2} cars={cars} />
          </div>
        </div>
        <div className={styles.lights}>
          <div className={styles.light}>
            <div>cars: {cars.e1}</div>
            <button type="button" onClick={() => addCar("e1")}>
              Add 🚙
            </button>
            <TrafficSignal
              location="e1"
              active={lights.e1}
              cars={cars}
              isTurning
            />
          </div>
          <div className={styles.light}>
            <div>cars: {cars.e2}</div>
            <button type="button" onClick={() => addCar("e2")}>
              Add 🚙
            </button>
            <TrafficSignal location="e2" active={lights.e2} cars={cars} />
          </div>
        </div>
      </div>
      <div className={styles.south}>
        <div className={styles.lights}>
          <div className={styles.light}>
            <div>cars: {cars.s1}</div>
            <button type="button" onClick={() => addCar("s1")}>
              Add 🚙
            </button>
            <TrafficSignal
              location="s1"
              active={lights.s1}
              cars={cars}
              isTurning
            />
          </div>
          <div className={styles.light}>
            <div>cars: {cars.s2}</div>
            <button type="button" onClick={() => addCar("s2")}>
              Add 🚙
            </button>
            <TrafficSignal location="s2" active={lights.s2} cars={cars} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function getWhichLightIsCarAt(direction, lights) {
  return lights[direction];
}

export function getIsCarAlreadyAtLight(direction, cars) {
  return cars[direction] > 0;
}

export function getCarsAtOtherLights(direction, cars) {
  return Object.keys(cars)
    .filter((key) => key !== direction)
    .reduce((acc, key) => acc + cars[key], 0);
}

export function getDirectionOfCarsAtGreenAndOrangeLights(lights) {
  return Object.entries(lights)
    .filter(([, light]) => light === "G" || light === "O")
    .map(([direction]) => direction);
}
