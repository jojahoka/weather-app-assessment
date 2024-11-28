interface SensorData {
  id: string;
  type: "temperature" | "humidity" | "pressure";
  value: number;
  timestamp: number;
}

import { faker } from "@faker-js/faker";

let lastTemperatureValue = 10;
let lastPressureValue = 10;
let lastHumidityvalue = 50;

const hasError = () => faker.number.int({ min: 1, max: 10 }) === 1;

export const mockApi = (): SensorData[] => {
  if (hasError()) {
    throw new Error("Mock API error: Sensors are unreadable.");
  }

  return [mockTemperature(), mockHumidity(), mockPressure()];
};

export const mockTemperature = (): SensorData => {
  const newTemperatureValue =
    lastTemperatureValue +
    faker.number.float({ min: -0.1, max: 0.1, fractionDigits: 2 });

  lastTemperatureValue = newTemperatureValue;

  return {
    id: faker.string.uuid(),
    type: "temperature",
    value: newTemperatureValue,
    timestamp: Date.now(),
  };
};

export const mockHumidity = (): SensorData => {
  const newHumidityValue =
    lastHumidityvalue +
    faker.number.float({ min: -0.5, max: 0.5, fractionDigits: 2 });

  lastHumidityvalue = newHumidityValue;

  return {
    id: faker.string.uuid(),
    type: "humidity",
    value: newHumidityValue,
    timestamp: Date.now(),
  };
};

export const mockPressure = (): SensorData => {
  const newPressureValue =
    lastPressureValue +
    faker.number.float({ min: -0.5, max: 0.5, fractionDigits: 2 });

  lastPressureValue = newPressureValue;

  return {
    id: faker.string.uuid(),
    type: "pressure",
    value: newPressureValue,
    timestamp: Date.now(),
  };
};
