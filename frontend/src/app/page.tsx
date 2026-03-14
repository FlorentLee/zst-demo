"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

import DashboardScreen from '@/components/screens/DashboardScreen';
import InvoiceScreen from '@/components/screens/InvoiceScreen';
import WorkflowScreen from '@/components/screens/WorkflowScreen';
import RiskScreen from '@/components/screens/RiskScreen';
import AnalyticsScreen from '@/components/screens/AnalyticsScreen';
import DeclareScreen from '@/components/screens/DeclareScreen';
import LedgerScreen from '@/components/screens/LedgerScreen';
import SettingsScreen from '@/components/screens/SettingsScreen';

export default function AppContainer() {
  const [activeScreen, setActiveScreen] = useState("dashboard");

  // Map screen IDs to their respective Titles
  const screenTitles: Record<string, string> = {
    dashboard: "工作台总览",
    invoice: "AI票据识别",
    workflow: "审批工作流",
    ledger: "智能记账",
    declare: "税务申报",
    risk: "风险预警",
    analytics: "经营分析",
    settings: "系统设置",
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case "dashboard": return <DashboardScreen />;
      case "invoice": return <InvoiceScreen />;
      case "workflow": return <WorkflowScreen />;
      case "ledger": return <LedgerScreen />;
      case "declare": return <DeclareScreen />;
      case "risk": return <RiskScreen />;
      case "analytics": return <AnalyticsScreen />;
      case "settings": return <SettingsScreen />;
      default: return <div className="p-6">敬请期待 ({activeScreen})...</div>;
    }
  };

  return (
    <div className="flex h-screen w-full bg-bg-main overflow-hidden">
      {/* Sidebar fixed to left */}
      <Sidebar 
        currentScreen={activeScreen} 
        onNavigate={setActiveScreen} 
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-bg-main relative">
        {/* Topbar sticky to top */}
        <Topbar 
          title={screenTitles[activeScreen] || "智税通"} 
        />
        
        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto content-scroll">
            {renderActiveScreen()}
        </div>
      </main>
    </div>
  );
}
