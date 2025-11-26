import { ReactNode } from "react";

type Props = {
  placeholder?: string;
  children?: ReactNode;
};

const InlineSearchBar = ({ placeholder, children }: Props) => {
  return (
    <div className="p-3 flex justify-start items-center gap-4 border-b border-gray-200">
      {children}
    </div>
  );
};

export default InlineSearchBar;
