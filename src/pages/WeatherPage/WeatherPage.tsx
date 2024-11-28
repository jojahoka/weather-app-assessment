import "./styles.scss";
import { SensorData } from "./types";

import LineChart from "../../components/LineChart/LineChart";
import { mockApi } from "../../functions/mockApi";
import { useCallback, useEffect, useMemo, useState } from "react";
import Sidepanel from "../../components/Sidepanel/Sidepanel";
import WidgetBlock from "../../components/WidgetBlock/WidgetBlock";
import Input from "../../components/Input/Input";
import Switch from "../../components/Switch/Switch";
import InputLabel from "../../components/InputLabel/InputLabel";
import { toast } from "react-toastify";

const WeatherPage = () => {
  const [intervalValue, setIntervalValue] = useState(500);
  const [toggleTemperature, setToggleTemperature] = useState<boolean>(true);
  const [toggleAirPressure, setToggleAirPressure] = useState<boolean>(true);
  const [toggleAirHumidity, setToggleAirHumidity] = useState<boolean>(true);
  const [toggleErrors, setToggleErrors] = useState<boolean>(true);

  const [temperatureValue, setTemperatureValue] = useState<number>();
  const [airPressureData, setAirPressureData] = useState<SensorData[]>([]);
  const [airHumidityData, setAirHumidityData] = useState<SensorData[]>([]);

  const fetchData = useCallback(() => {
    try {
      const newData = mockApi();

      newData.forEach((data: SensorData) => {
        if (typeof data.value != "number") return;

        if (data.type === "temperature") {
          // Sorteer data in eigen array
          // Deze stap zou ook overgeslagen kunnen worden en alles in 1 array op te slaan
          setTemperatureValue(Math.round(data.value * 100) / 100);
        }
        if (data.type === "pressure") {
          setAirPressureData((prevState) => [...prevState, data]);
        }
        if (data.type === "humidity") {
          setAirHumidityData((prevState) => [...prevState, data]);
        }
      });
    } catch (error: unknown) {
      if (error instanceof Error && toggleErrors) {
        toast.error(error.message, {
          theme: "dark",
          position: "top-left",
        });
      } else {
        console.log(error);
      }
    }
  }, [toggleErrors]);

  useEffect(() => {
    const myInterval = setInterval(fetchData, intervalValue);

    return () => clearInterval(myInterval);
  }, [fetchData, intervalValue]);

  const airPressureStats = useMemo(() => {
    if (!airPressureData || airPressureData.length === 0) {
      return { average: 0, max: 0, min: 0 };
    }

    const currentTimestamp = Date.now();

    const lastFiveMinutesData = airPressureData.filter(
      (data) => currentTimestamp - data.timestamp <= 5 * 60 * 1000
    );

    if (lastFiveMinutesData.length === 0) {
      return { average: 0, max: 0, min: 0 };
    }

    // Retourneer alleen de waardes van de laatste 5 minuten
    const values = lastFiveMinutesData.map((data) => data.value);

    // Retourneer het totaal aan waardes (om gemiddelde te kunnen berekenen)
    const total = values.reduce((sum, value) => sum + value, 0);

    // Bereken gemiddelde met het totaal en de lengte van de array met waardes en rond af
    const average = Math.round(total / values.length);
    const max = Math.round(Math.max(...values) * 100) / 100;
    const min = Math.round(Math.min(...values) * 100) / 100;

    return { average, max, min };
  }, [airPressureData]);

  const airHumidityGraphValues = useMemo(() => {
    if (!airHumidityData || airHumidityData.length === 0)
      return { labels: [], values: [] };

    const currentTimestamp = Date.now();

    const lastFiveMinutesData = airHumidityData.filter(
      (data) => currentTimestamp - data.timestamp <= 5 * 60 * 1000
    );

    // Formateer data zodat ik het kan gebruiken in de grafiek
    const dataLabels = lastFiveMinutesData.map((data) => {
      const date = new Date(data.timestamp);
      return `${date.getHours()}:${String(date.getMinutes()).padStart(
        2,
        "0"
      )}:${String(date.getSeconds()).padStart(2, "0")}`;
    });
    const dataValues = lastFiveMinutesData.map((data) => data.value);

    return { labels: dataLabels, values: dataValues };
  }, [airHumidityData]);

  return (
    <div className="weather-page">
      <div className="weather-page-widgets">
        {toggleAirPressure && (
          <WidgetBlock title="Air Pressure">
            <div className="air-pressure-grid">
              <div className="air-pressure-container">
                <div className="air-pressure-label">Minimum</div>
                <div className="air-pressure-value">{airPressureStats.min}</div>
              </div>
              <div className="air-pressure-container">
                <div className="air-pressure-label">Average</div>
                <div className="air-pressure-value">
                  {airPressureStats.average}
                </div>
              </div>
              <div className="air-pressure-container">
                <div className="air-pressure-label">Maximum</div>
                <div className="air-pressure-value">{airPressureStats.max}</div>
              </div>
            </div>
          </WidgetBlock>
        )}
        {toggleAirHumidity && (
          <WidgetBlock title="Air Humidity (%)">
            <LineChart
              labels={airHumidityGraphValues.labels}
              datasets={[
                {
                  data: airHumidityGraphValues.values,
                  borderColor: "rgba(71, 71, 71, 0.8)",
                  backgroundColor: "rgba(71, 71, 71, 0.2)",
                  pointRadius: 1,
                  tension: 0.5,
                  yAxisID: "y",
                },
              ]}
            />
          </WidgetBlock>
        )}
        {toggleTemperature && (
          <WidgetBlock title="Temperature">
            <div className="temperature-label">
              {temperatureValue ? temperatureValue + "°C" : "No data"}
            </div>
          </WidgetBlock>
        )}
      </div>
      <Sidepanel>
        <Input
          label="Data interval (ms)"
          value={intervalValue}
          onChange={(e) => setIntervalValue(Number(e))}
        />
        <InputLabel value={"Toggle Temperature"} />
        <Switch onChange={setToggleTemperature} value={toggleTemperature} />
        <InputLabel value={"Toggle Air Humidity"} />
        <Switch onChange={setToggleAirHumidity} value={toggleAirHumidity} />
        <InputLabel value={"Toggle Air Pressure"} />
        <Switch onChange={setToggleAirPressure} value={toggleAirPressure} />
        <InputLabel value={"Toggle errors"} />
        <Switch onChange={setToggleErrors} value={toggleErrors} />
      </Sidepanel>
    </div>
  );
};

export default WeatherPage;
