import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

const SearchSection = ({ children }: Props) => {
  return (
    <div className="px-3 pt-1 pb-2 flex justify-start items-center gap-2 border-b border-gray-200">
      {children}
    </div>
  );
};

export default SearchSection;
