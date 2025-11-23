export default function InputTextBar() {
  return (
    <div className="relative w-full mx-3">
        <input
            type="text"
            id="name"
            className="
            peer
            w-full
            px-3
            py-3
            border border-gray-400
            rounded-xl
            text-sm
            bg-transparent
            focus:outline-none
            focus:border-blue-500
            "
            placeholder=" "   // IMPORTANT!
        />

        <label
            htmlFor="name"
            className="
            absolute
            left-3
            -top-2
            bg-white
            px-1
            text-xs
            text-gray-600
            transition-all
            peer-placeholder-shown:top-3
            peer-placeholder-shown:text-sm
            peer-placeholder-shown:text-gray-400
            peer-focus:-top-2
            peer-focus:text-xs
            peer-focus:text-blue-600
            "
        >
            Naming
        </label>
        </div>
  );
}