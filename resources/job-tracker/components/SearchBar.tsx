import { ReactNode } from "react";

type Props = {
  placeholder?: string;
  children?: ReactNode;
};

const SearchBar = ({ placeholder, children }: Props) => {
  return (
    <div className="bg-white rounded-b-lg shadow-sm p-4 flex flex-wrap gap-4 items-end">
      {children}
    </div>
  );
};

export default SearchBar;
