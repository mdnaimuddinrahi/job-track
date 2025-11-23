import { ReactNode } from "react";

export default function CompaniesLayout({children}: {children: ReactNode}) {
    return (
    <div className="px-3">
        {children}
    </div>
      
    );
}