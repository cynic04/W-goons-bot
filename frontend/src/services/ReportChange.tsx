import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react'

interface ReportChangeType {
  reportChanged: boolean;
  setReportChanged: (changed: boolean) => void;
}

interface ReportChangeProviderProps {
  children: ReactNode;
}

const ReportChange = createContext<ReportChangeType | null>(null);

export function ReportChangeProvider({ children }: ReportChangeProviderProps) {
    const [reportChanged, setReportChanged] = useState(false);
    const updateReport = (changed: boolean) => setReportChanged(changed);

    return (
        <ReportChange.Provider value={{ reportChanged, setReportChanged: updateReport }}>
            {children}
        </ReportChange.Provider>
    );
}

export function useReportChange() {
    const context = useContext(ReportChange);
    if (!context) {
        throw new Error('useReportChangeContext must be used within a ReportChange provider');
    }
    return context;
}