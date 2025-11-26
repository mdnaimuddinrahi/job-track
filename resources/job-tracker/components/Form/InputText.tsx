"use client";

type InputTextBarProps = {
  name?: string | "";
  id?: string | null;
  label?: string;
  placeholder?: string | null;
};

export default function InputText({name, id, label, placeholder}: InputTextBarProps) {
  return (
    <div className="relative w-full">
        <input
            type="text"
            id={id ?? name}
            className="peer w-full px-2 py-2 border border-gray-400 rounded-md text-sm bg-transparent focus:outline-none focus:border-blue-500"
            placeholder={placeholder ?? " "} 
        />

        <label
            htmlFor={id ?? name}
            className="absolute left-3 -top-2 bg-white px-1 text-xs text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-600"
        >{label ?? name}
        </label>
    </div>
  );
}