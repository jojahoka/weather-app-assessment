export interface SensorData {
  id: string;
  type: "temperature" | "humidity" | "pressure";
  value: number;
  timestamp: number;
}
