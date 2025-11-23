import { ReactNode } from "react";

type Props = {
  placeholder?: string;
  children?: ReactNode;
};

const InlineSearchBar = ({ placeholder, children }: Props) => {
  return (
    <div className="mx-3 flex justify-between items-center">
      {children}
    </div>
  );
};

export default InlineSearchBar;
