import Select from "react-select";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function Filters({ value, onChange, onApply, theme = "light" }) {
  const isDark = theme === "dark";

  // Category options — exactly matching your CSV
  const categoryOptions = [
    { label: "Temperature Sensors", value: "temperature sensors" },
    { label: "Pressure Sensors", value: "pressure sensors" },
    { label: "Gas Sensors", value: "gas sensors" },
    { label: "Light Sensors", value: "light sensors" },
    { label: "Motion / Distance Sensors", value: "motion / distance sensors" },
    { label: "Moisture Sensors", value: "moisture sensors" },
    { label: "Accelerometer / Gyroscope Sensors", value: "accelerometer / gyroscope sensors" },
    { label: "Flame / Fire Sensors", value: "flame / fire sensors" },
    { label: "Sound Sensors", value: "sound sensors" },
    { label: "Vibration Sensors", value: "vibration sensors" },
  ];

  // Interface options
  const ifaceOptions = [
    { label: "Digital", value: "digital" },
    { label: "Analog", value: "analog" },
    { label: "I2C", value: "i2c" },
    { label: "SPI", value: "spi" },
    { label: "I2C/SPI", value: "i2c/spi" },
    { label: "UART", value: "uart" },
  ];

  // Handlers
  const handleCategoryChange = (selected) => {
    const vals = selected ? selected.map((s) => s.value) : [];
    onChange({ ...value, category: vals });
  };

  const handleIfaceChange = (selected) => {
    const vals = selected ? selected.map((s) => s.value) : [];
    onChange({ ...value, iface: vals });
  };

  const handlePriceChange = (val) => {
    onChange({ ...value, priceMax: val });
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: isDark ? "#111" : "#fff",
      borderColor: isDark ? "#444" : "#ccc",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDark ? "#111" : "#fff",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: isDark ? "#333" : "#eee",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: isDark ? "#fff" : "#000",
    }),
  };

  return (
    <div className="flex flex-col gap-5">
      <h2
        className={`font-semibold text-lg ${
          isDark ? "text-green-400" : "text-gray-900"
        }`}
      >
        Filters
      </h2>

      {/* Category filter */}
      <div>
        <label className={`${isDark ? "text-gray-300" : "text-gray-700"} text-sm mb-1 block`}>
          Sensor Categories
        </label>
        <Select
          isMulti
  value={Array.isArray(value?.category)
    ? categoryOptions.filter((opt) => value.category.includes(opt.value))
    : []}
  options={categoryOptions}
  onChange={handleCategoryChange}
  styles={customStyles}
  placeholder="Select categories..."
        />
      </div>

      {/* Interface filter */}
      <div>
        <label className={`${isDark ? "text-gray-300" : "text-gray-700"} text-sm mb-1 block`}>
          Interface
        </label>
        <Select
          isMulti
  value={Array.isArray(value?.iface)
    ? ifaceOptions.filter((opt) => value.iface.includes(opt.value))
    : []}
  options={ifaceOptions}
  onChange={handleIfaceChange}
  styles={customStyles}
  placeholder="Select interfaces..."
        />
      </div>

      {/* Price slider */}
      <div>
        <label className={`${isDark ? "text-gray-300" : "text-gray-700"} text-sm mb-1 block`}>
          Max Price (${value.priceMax || 10})
        </label>
        <Slider
          min={0}
          max={20}
          step={0.5}
          value={value.priceMax || 10}
          onChange={handlePriceChange}
          trackStyle={{ backgroundColor: isDark ? "#22c55e" : "#2563eb" }}
          handleStyle={{
            borderColor: isDark ? "#22c55e" : "#2563eb",
            backgroundColor: isDark ? "#22c55e" : "#2563eb",
          }}
          railStyle={{ backgroundColor: isDark ? "#333" : "#ddd" }}
        />
      </div>

      {/* Apply button */}
      <button
        onClick={onApply}
        className={`mt-3 font-semibold px-4 py-2 rounded-lg ${
          isDark
            ? "bg-green-600 hover:bg-green-500 text-black"
            : "bg-gray-900 hover:bg-gray-800 text-white"
        }`}
      >
        Apply Filters
      </button>
    </div>
  );
}
