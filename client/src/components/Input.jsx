export default function Input({label, error, ...props}){
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input {...props} className={"w-full border rounded-lg px-3 py-2 outline-none " + (error ? "border-red-500" : "border-gray-300")} />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  )
}