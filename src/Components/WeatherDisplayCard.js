export function WeatherDisplayCard({
  locationName,
  temprature,
  atmosphere,
  highTemprature,
  lowTemprature,
  imageUrl,
}) {
  return (
    <div className={"body"}>
      <h2>{locationName}</h2>
      <img src={imageUrl} alt={imageUrl} />
      <h1>{temprature}</h1>
      <h3>{atmosphere}</h3>
      <h3>
        H: {highTemprature} L: {lowTemprature}
      </h3>
    </div>
  );
}
