import React from "react";

interface Props {
    children: React.ReactNode
}

export const AppLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="layout-app-container">
            {children}
        </div>
    )
}