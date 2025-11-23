export default function InputSelectBar() {
    return (<div className="relative w-64">
  <select
    id="role"
    className="
      peer
      w-full
      px-3
      py-3
      border border-gray-400
      rounded-xl
      bg-transparent
      text-sm
      focus:outline-none
      focus:border-blue-500
    "
    defaultValue=""
  >
    <option value="" disabled hidden></option>
    <option value="admin">Admin</option>
    <option value="manager">Manager</option>
    <option value="viewer">Viewer</option>
  </select>

  <label
    htmlFor="role"
    className="
      absolute
      left-3
      -top-2
      bg-white
      px-1
      text-xs
      text-gray-600
      transition-all

      peer-focus:-top-2
      peer-focus:text-xs
      peer-focus:text-blue-600

      peer-[&:not([value=''])]:-top-2
      peer-[&:not([value=''])]:text-xs
    "
  >
    Role
  </label>
</div>
);
}