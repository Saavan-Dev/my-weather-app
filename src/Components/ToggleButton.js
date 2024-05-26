export function ToggleButton({ placeHolderToggleValue, onTogglePlaceholder }) {
  return (
    <div id="app-cover">
      <div className={"row"}>
        <div className={"toggle-button-cover"}>
          <div className={"button-cover"}>
            <div className={"button b2"} id="button-10">
              <input
                type="checkbox"
                className={"checkbox"}
                value={placeHolderToggleValue}
                onClick={onTogglePlaceholder}
              />
              <div className={"knobs"}>
                <span>Yours</span>
              </div>
              <div className={"layer"}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
