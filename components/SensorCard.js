export default function SensorCard({ sensor, theme = "light" }) {
  const isDark = theme === "dark";
  return (
    <div className={`rounded-xl border p-4 transition-theme hover:scale-[1.02] ${isDark ? "bg-gray-900 border-gray-700 hover:shadow-green-500/30" : "bg-white border-gray-200 hover:shadow-lg"}`}>
      {sensor.image ? (
        <img src={sensor.image} alt={sensor.name} className="w-full h-32 object-contain mb-3 rounded-lg" />
      ) : (
        <div className={`w-full h-32 mb-3 rounded-lg flex items-center justify-center text-sm ${isDark ? "bg-gray-800 text-gray-400" : "bg-gray-50 text-gray-500"}`}>
          Image will appear when provided
        </div>
      )}
      <h3 className={`font-semibold text-lg mb-1 ${isDark ? "text-green-400" : "text-gray-900"}`}>{sensor.name}</h3>
      <p className={`${isDark ? "text-gray-300" : "text-gray-600"} text-sm`}>{sensor.type}</p>
      <p className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm`}>Interface: {sensor.interface}</p>
      <p className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm`}>Range: {sensor.range}</p>
      <p className={`${isDark ? "text-green-400" : "text-gray-700"} text-sm font-medium`}>Price: {sensor.price}</p>
      {(sensor.datasheet || sensor.datasheet_pdf || sensor.datasheet_page) && (
        <a
          href={sensor.datasheet || sensor.datasheet_pdf || sensor.datasheet_page}
          target="_blank"
          rel="noopener noreferrer"
          className={`${isDark ? "text-green-400 hover:text-green-300" : "text-blue-600 hover:text-blue-500"} text-sm mt-2 inline-block`}
        >
          View Datasheet →
        </a>
      )}
    </div>
  );
}
