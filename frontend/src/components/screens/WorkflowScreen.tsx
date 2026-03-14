"use client";

import React from 'react';

export default function WorkflowScreen() {
  return (
    <div className="p-6 max-w-[1400px] mx-auto h-[calc(100vh-80px)] flex gap-6">
      {/* Left Node Palette */}
      <div className="w-[240px] shrink-0 bg-card border border-border-light rounded-xl shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-border-light bg-bg-main/50">
          <div className="text-sm font-bold text-text-main flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full"></span>
            节点组件库
          </div>
          <div className="text-xs text-text-muted mt-1">拖拽以自定义审批流</div>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
          {/* Node Items */}
          <div className="bg-slate-800 text-slate-100 p-3 rounded-lg border-2 border-transparent hover:border-slate-500 cursor-grab flex items-center gap-3 shadow-sm transition-all">
            <div className="text-xl">🟢</div>
            <div className="text-sm font-medium">触发器 (Trigger)</div>
          </div>
          <div className="bg-slate-800 text-slate-100 p-3 rounded-lg border-2 border-transparent hover:border-blue-500 cursor-grab flex items-center gap-3 shadow-sm transition-all">
            <div className="text-xl">🤖</div>
            <div className="text-sm font-medium">AI 自动审核</div>
          </div>
          <div className="bg-slate-800 text-slate-100 p-3 rounded-lg border-2 border-transparent hover:border-emerald-500 cursor-grab flex items-center gap-3 shadow-sm transition-all">
            <div className="text-xl">👤</div>
            <div className="text-sm font-medium">人工审批节点</div>
          </div>
          <div className="bg-slate-800 text-slate-100 p-3 rounded-lg border-2 border-transparent hover:border-amber-500 cursor-grab flex items-center gap-3 shadow-sm transition-all">
            <div className="text-xl">📊</div>
            <div className="text-sm font-medium">条件分支网关</div>
          </div>
          <div className="bg-slate-800 text-slate-100 p-3 rounded-lg border-2 border-transparent hover:border-purple-500 cursor-grab flex items-center gap-3 shadow-sm transition-all">
            <div className="text-xl">📧</div>
            <div className="text-sm font-medium">发送通知节点</div>
          </div>
          <div className="bg-slate-800 text-slate-100 p-3 rounded-lg border-2 border-transparent hover:border-teal-500 cursor-grab flex items-center gap-3 shadow-sm transition-all">
            <div className="text-xl">📒</div>
            <div className="text-sm font-medium">自动入账执行</div>
          </div>
        </div>
      </div>

      {/* Right Flow Canvas */}
      <div className="flex-1 bg-card border border-border-light rounded-xl shadow-sm flex flex-col relative overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] bg-white">
        
        {/* Canvas Header */}
        <div className="absolute top-0 left-0 right-0 p-5 flex items-center justify-between pointer-events-none z-10">
          <div>
            <h2 className="text-xl font-black text-text-main flex items-center gap-2">
              费用报销标准审批流
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-success/10 border border-success/20 text-success text-xs font-bold rounded-full ml-2">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                运行中
              </span>
            </h2>
            <div className="text-xs font-semibold text-text-muted mt-1 pointer-events-auto cursor-pointer hover:underline">
              适用于：全公司所有部门 · ID: WF-EXP-001
            </div>
          </div>
          <div className="flex gap-2 pointer-events-auto">
            <button className="btn btn-ghost !py-1.5 bg-white border border-border-light shadow-sm text-text-main hover:text-primary">历史版本</button>
            <button className="btn btn-primary !py-1.5 shadow-sm">发布改动</button>
          </div>
        </div>

        {/* Canvas Body (Nodes Flow) */}
        <div className="flex-1 flex flex-col items-center justify-center pt-24 px-10 pb-20 relative overflow-auto pointer-events-auto">
          
          <div className="flex items-center w-full max-w-[900px] justify-between relative mt-8">
            {/* Connection Line Background */}
            <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-border-dark -translate-y-1/2 z-0"></div>

            {/* Node 1: Employee Submit */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer">
              <div className="w-14 h-14 bg-white border-2 border-border-dark rounded-xl flex items-center justify-center text-2xl shadow-sm transition-transform group-hover:scale-110 group-hover:border-primary group-hover:shadow-md">
                👤
              </div>
              <div className="mt-3 bg-white px-3 py-1 rounded bg-opacity-90 border border-border-light shadow-sm text-sm font-bold text-text-main whitespace-nowrap">
                员工提交
              </div>
            </div>

            {/* Arrow */}
            <div className="relative z-10 text-border-dark text-xl font-bold bg-white w-6 h-6 flex items-center justify-center rounded-full">➔</div>

            {/* Node 2: AI Pre-Audit */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer">
              <div className="w-14 h-14 bg-primary/5 border-2 border-primary rounded-xl flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-transform group-hover:scale-110">
                🤖
              </div>
              <div className="mt-3 bg-primary text-white px-3 py-1 rounded shadow-md text-sm font-bold whitespace-nowrap relative">
                AI 预审
                {/* Active Indicator Pulse */}
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                </span>
              </div>
            </div>

            {/* Arrow */}
            <div className="relative z-10 text-border-dark text-xl font-bold bg-white w-6 h-6 flex items-center justify-center rounded-full">➔</div>

            {/* Node 3: Amount Condition */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer">
              <div className="w-14 h-14 bg-white border-2 border-warning rounded-xl rotate-45 flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 group-hover:shadow-md">
                <span className="-rotate-45 text-xl font-black text-warning">¥</span>
              </div>
              <div className="mt-5 bg-white px-3 py-1 rounded bg-opacity-90 border border-border-light shadow-sm text-sm font-bold text-text-main whitespace-nowrap">
                金额判断
              </div>
            </div>

            {/* Arrow */}
            <div className="relative z-10 text-border-dark text-xl font-bold bg-white w-6 h-6 flex items-center justify-center rounded-full">➔</div>

            {/* Node 4: Manager Approval */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer">
              <div className="w-14 h-14 bg-white border-2 border-border-dark rounded-xl flex items-center justify-center text-2xl shadow-sm transition-transform group-hover:scale-110 group-hover:border-primary group-hover:shadow-md">
                👨‍💼
              </div>
              <div className="mt-3 bg-white px-3 py-1 rounded bg-opacity-90 border border-border-light shadow-sm text-sm font-bold text-text-main whitespace-nowrap">
                主管审批
              </div>
            </div>

            {/* Arrow */}
            <div className="relative z-10 text-border-dark text-xl font-bold bg-white w-6 h-6 flex items-center justify-center rounded-full">➔</div>

            {/* Node 5: Finance Audit */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer">
              <div className="w-14 h-14 bg-white border-2 border-border-dark rounded-xl flex items-center justify-center text-2xl shadow-sm transition-transform group-hover:scale-110 group-hover:border-primary group-hover:shadow-md">
                💰
              </div>
              <div className="mt-3 bg-white px-3 py-1 rounded bg-opacity-90 border border-border-light shadow-sm text-sm font-bold text-text-main whitespace-nowrap">
                财务核准
              </div>
            </div>
          </div>

          {/* AI Node Config Panel */}
          <div className="mt-16 bg-blue-50/80 border border-primary/20 rounded-xl p-5 w-full max-w-[800px] shadow-sm relative overflow-hidden backdrop-blur-sm pointer-events-auto">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
             
             <div className="flex items-center gap-2 mb-4">
               <span className="text-xl">⚙️</span>
               <h3 className="text-sm font-bold text-primary">AI 节点智能配置 (Agent 审查集)</h3>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
               <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-primary/10 shadow-sm transition-colors hover:border-primary/30">
                 <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-sm">✓</div>
                 <div className="text-sm font-bold text-text-main">发票真伪验证与查重</div>
               </div>
               <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-primary/10 shadow-sm transition-colors hover:border-primary/30">
                 <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-sm">✓</div>
                 <div className="text-sm font-bold text-text-main">费用类型及税率合规检查</div>
               </div>
               <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-primary/10 shadow-sm transition-colors hover:border-primary/30">
                 <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-sm">✓</div>
                 <div className="text-sm font-bold text-text-main">异常金额智能标记 (RAG)</div>
               </div>
               <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-primary/10 shadow-sm transition-colors hover:border-primary/30">
                 <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-sm">✓</div>
                 <div className="text-sm font-bold text-text-main">收款账户主体一致性比对</div>
               </div>
             </div>
             
             <div className="mt-4 pt-4 border-t border-primary/10 flex justify-between items-center text-xs">
               <span className="text-text-muted">当票据解析金额大于设定阈值时，触发后置人工审批。</span>
               <button className="text-primary font-bold hover:underline">高级配置 →</button>
             </div>
          </div>

        </div>

        {/* Bottom Stats Widget */}
        <div className="absolute bottom-6 right-6 bg-white border border-border-light rounded-xl shadow-lg p-5 w-[360px] pointer-events-auto">
          <div className="text-sm font-bold text-text-main mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full"></span>
              本月流程监控
            </div>
            <span className="text-xs text-text-muted">实时更新</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-bg-main p-3 rounded-lg border border-border-light">
              <div className="text-xs text-text-muted mb-1 font-semibold">已完成</div>
              <div className="text-2xl font-black text-text-main">284</div>
            </div>
            <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
              <div className="text-xs text-primary mb-1 font-bold">审批中</div>
              <div className="text-2xl font-black text-primary">12</div>
            </div>
            <div className="bg-danger/5 p-3 rounded-lg border border-danger/20">
              <div className="text-xs text-danger mb-1 font-bold">已拒绝</div>
              <div className="text-2xl font-black text-danger">3</div>
            </div>
            <div className="bg-purple-500/5 p-3 rounded-lg border border-purple-500/20">
              <div className="text-xs text-purple-600 mb-1 font-bold">平均耗时</div>
              <div className="text-2xl font-black text-purple-600 flex items-baseline gap-1">4.2 <span className="text-sm font-bold text-purple-500">h</span></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
