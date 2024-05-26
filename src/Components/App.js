import { useState, useCallback, useEffect } from "react";
import { InputField } from "./InputField";
import { ToggleButton } from "./ToggleButton";
import { WeatherDisplayCard } from "./WeatherDisplayCard";
import axios from "axios";
import debounce from "lodash.debounce";

export default function App() {
  const [isPlaceholderToggled, setIsPlaceholderToggled] = useState(false);
  const [inputText, setInputText] = useState("");
  const [response1, setResponse1] = useState(null);
  const [response2, setResponse2] = useState(null);

  const api_key = process.env.REACT_APP_API_KEY;
  const base_URL = process.env.REACT_APP_BASE_URL;

  const togglePlaceholder = () => {
    setIsPlaceholderToggled(!isPlaceholderToggled);
    if (isPlaceholderToggled) {
      setInputText("");
      fetchWeatherData();
    }
  };

  const getForecastData = async (val) => {
    if (val.length !== 0) {
      try {
        const res = await axios.get(`${base_URL}/forecast.json`, {
          params: {
            q: val,
            days: 3,
            key: api_key,
          },
        });

        const forecastDay = res.data?.forecast?.forecastday?.[0];
        const day = forecastDay?.day;
        if (!day) {
          return null;
        }

        const condition = day?.condition;

        return {
          locationName: res.data.location.name,
          temp: day.avgtemp_c,
          conditionText: condition.text,
          highTemp: day.maxtemp_c,
          lowTemp: day.mintemp_c,
          conditionIcon: condition.icon,
        };
      } catch (error) {
        console.error("error: ", error);
        return null;
      }
    }
  };

  const fetchWeatherData = async () => {
    if (!isPlaceholderToggled) {
      const data = await getForecastData(inputText);
      setResponse1(data);
    } else {
      const data1 = await getForecastData("mumbai");
      const data2 = await getForecastData("delhi");
      setResponse1(data1);
      setResponse2(data2);
    }
  };

  const debouncedFetchWeatherData = useCallback(
    debounce(fetchWeatherData, 500),
    [inputText, isPlaceholderToggled]
  );

  useEffect(() => {
    debouncedFetchWeatherData();
  }, [inputText, isPlaceholderToggled, debouncedFetchWeatherData]);

  const handleInputValue = (val) => {
    setInputText(val);
  };

  return (
    <div className={"layout"}>
      <div className={"controls"}>
        <form id="locationForm">
          {!isPlaceholderToggled && (
            <>
              <InputField
                inputValue={inputText}
                onInputChange={handleInputValue}
              >
                Enter place name / postal code
              </InputField>
              {"     "}
            </>
          )}
          <ToggleButton
            placeHolderToggleValue={isPlaceholderToggled}
            onTogglePlaceholder={togglePlaceholder}
          />
          {!isPlaceholderToggled && response1 != null ? (
            <WeatherDisplayCard
              locationName={response1.locationName}
              temprature={`${response1.temp}°`}
              atmosphere={response1.conditionText}
              highTemprature={`${response1.highTemp}°`}
              lowTemprature={`${response1.lowTemp}°`}
              imageUrl={response1.conditionIcon}
            />
          ) : (
            <>Loading...</>
          )}
          {isPlaceholderToggled && response1 != null && response2 != null && (
            <div className="weatherDisplayCard2">
              {response1 && (
                <WeatherDisplayCard
                  locationName={response1.locationName}
                  temprature={`${response1.temp}°`}
                  atmosphere={response1.conditionText}
                  highTemprature={`${response1.highTemp}°`}
                  lowTemprature={`${response1.lowTemp}°`}
                  imageUrl={response1.conditionIcon}
                />
              )}
              {response2 && (
                <WeatherDisplayCard
                  locationName={response2.locationName}
                  temprature={`${response2.temp}°`}
                  atmosphere={response2.conditionText}
                  highTemprature={`${response2.highTemp}°`}
                  lowTemprature={`${response2.lowTemp}°`}
                  imageUrl={response2.conditionIcon}
                />
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
