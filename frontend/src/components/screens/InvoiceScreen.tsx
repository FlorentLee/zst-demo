"use client";

import React, { useState, useRef } from 'react';
import { analyzeInvoice } from '@/lib/api';

export interface InvoiceAnalyzeResponse {
  invoice_type: string;
  invoice_number: string;
  amount: number;
  compliance_score: number;
  risk_warning?: string;
}

export default function InvoiceScreen() {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<InvoiceAnalyzeResponse[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const parsed = await analyzeInvoice(formData);
      setResults(prev => [parsed, ...prev]);
      alert("✅ AI解析并入账完毕! 可以在工作台下方和 SQLite中 看到。");
    } catch (e) {
      alert("解析失败，请检查服务日志。");
    } finally {
      setAnalyzing(false);
    }
  };

  const onZoneClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0]);
          }
        }} 
      />
      
      {/* Upload Zone */}
      <div className="bg-white border border-border-light shadow-sm rounded-xl p-6 mb-6">
        <div 
          onClick={onZoneClick}
          className="border-2 border-dashed border-border-light bg-bg-main rounded-lg p-10 text-center cursor-pointer transition-all duration-200 hover:border-primary hover:bg-primary/5"
        >
          <div className="text-5xl mb-4 text-text-muted/50 filter grayscale mix-blend-multiply flex justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary opacity-80"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          </div>
          <div className="text-base font-bold text-text-main mb-2">点击或拖拽上传票据文件</div>
          <div className="text-xs text-text-muted">支持增值税发票、收据、费用单等。支持 PDF, JPG/PNG 格式，单文件不超过 10MB</div>
          <div className="mt-5 flex gap-3 justify-center">
            <button className="btn btn-primary shadow-sm" onClick={(e) => { e.stopPropagation(); onZoneClick(); }}>
              <span className="mr-1">🤖</span> 智能解析并入账
            </button>
            <button className="btn btn-ghost border border-border-light bg-white hover:bg-bg-main" onClick={(e) => { e.stopPropagation(); onZoneClick(); }}>
              <span className="mr-1">📷</span> 手机扫码上传
            </button>
          </div>
        </div>
      </div>

      {/* AI Processing Banner */}
      {analyzing && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></span>
            <span className="text-primary font-bold text-sm">深思考引擎运行中：火山视觉多模态校验与 RAG 政策合规审计...</span>
          </div>
          <div className="h-1.5 bg-bg-main rounded-full overflow-hidden w-full relative">
             <div className="absolute top-0 bottom-0 left-0 w-2/3 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.6)]"></div>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm font-bold text-text-main flex items-center gap-2">
          <span className="w-1 h-4 bg-primary rounded-full"></span>
          已识别出库票据 <span className="text-xs text-text-muted font-normal ml-1">( 按处理时间排序 )</span>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost !py-1.5 !px-3 !text-xs border border-border-light bg-white hover:bg-bg-main">筛选过滤</button>
          <button className="btn btn-primary !py-1.5 !px-3 !text-xs">批量确认入账</button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-2 gap-5">
        {/* Dynamic Items from Backend */}
        {results.map((r, idx) => {
          const hasRisk = r.risk_warning && r.risk_warning.length > 0;
          return (
            <div key={idx} className={`bg-card border rounded-xl p-5 flex gap-4 items-start shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${hasRisk ? 'border-danger/30 hover:border-danger' : 'border-border-light hover:border-primary'}`}>
              <div className={`w-14 h-16 rounded-lg flex items-center justify-center text-2xl shrink-0 ${hasRisk ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'}`}>
                🧾
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div className="text-sm font-bold text-text-main truncate group-hover:text-primary transition-colors">{r.invoice_type || '智能识别票据'}</div>
                  <div className={`text-lg font-black shrink-0 ${hasRisk ? 'text-danger' : 'text-text-main'}`}>¥ {r.amount}</div>
                </div>
                <div className="text-[11px] text-text-muted mb-3 font-mono">流水/发票号：{r.invoice_number || '解析无编号'}</div>
                
                {hasRisk ? (
                  <div className="py-2 px-3 bg-danger/5 border border-danger/20 rounded-md text-[11px] text-danger flex gap-1.5 items-start">
                     <span className="shrink-0 mt-0.5">⚠️</span> 
                     <span className="leading-snug">{r.risk_warning}</span>
                  </div>
                ) : (
                  <div className="py-2 px-3 bg-success/5 border border-success/20 rounded-md text-[11px] text-success flex gap-1.5 items-center font-medium">
                     <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-success"></span> AI 校验合规 · 置信度 {r.compliance_score}%
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* Existing Static Mocks to preserve UI fidelity per instructions */}
        <div className="bg-card border border-border-light rounded-xl p-5 flex gap-4 items-start shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-primary cursor-pointer">
          <div className="w-14 h-16 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-2xl shrink-0">
            🧾
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <div className="text-sm font-bold text-text-main truncate group-hover:text-primary transition-colors">增值税专用发票 · 北京联通科技</div>
              <div className="text-lg font-black text-text-main shrink-0">¥ 84,600.00</div>
            </div>
            <div className="text-[11px] text-text-muted mb-3 font-mono">发票号：0123456789 · 2024-12-18</div>
            <div className="py-2 px-3 bg-success/5 border border-success/20 rounded-md text-[11px] text-success flex gap-1.5 items-center font-medium">
               <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-success"></span> AI 校验准确率 99.8% · 已验真 · 无重复
            </div>
          </div>
        </div>

        <div className="bg-card border border-border-light rounded-xl p-5 flex gap-4 items-start shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-warning cursor-pointer group">
          <div className="w-14 h-16 rounded-lg bg-warning/10 text-warning flex items-center justify-center text-2xl shrink-0">
            🧾
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <div className="text-sm font-bold text-text-main truncate group-hover:text-primary transition-colors">差旅费用报销单 · 张建国</div>
              <div className="text-lg font-black text-text-main shrink-0">¥ 3,280.00</div>
            </div>
            <div className="text-[11px] text-text-muted mb-3 font-mono">报销单号：EXP-2024-2018 · 2024-12-17</div>
            <div className="py-2 px-3 bg-warning/10 border border-warning/20 rounded-md text-[11px] text-warning flex gap-1.5 items-center font-medium">
               <span className="shrink-0 mt-0.5">⚠️</span> AI预警：餐饮费疑似超标，建议人工复核
            </div>
          </div>
        </div>

        <div className="bg-card border border-border-light rounded-xl p-5 flex gap-4 items-start shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-primary cursor-pointer group">
          <div className="w-14 h-16 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-2xl shrink-0">
            📄
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <div className="text-sm font-bold text-text-main truncate group-hover:text-primary transition-colors">增值税普通发票 · 上海云端科技</div>
              <div className="text-lg font-black text-text-main shrink-0">¥ 128,000.00</div>
            </div>
            <div className="text-[11px] text-text-muted mb-3 font-mono">发票号：9876543210 · 2024-12-16</div>
            <div className="py-2 px-3 bg-success/5 border border-success/20 rounded-md text-[11px] text-success flex gap-1.5 items-center font-medium">
               <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-success"></span> AI 校验准确率 100% · 已验真 · 无重复
            </div>
          </div>
        </div>

        <div className="bg-card border border-border-light rounded-xl p-5 flex gap-4 items-start shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-danger cursor-pointer group">
          <div className="w-14 h-16 rounded-lg bg-danger/10 text-danger flex items-center justify-center text-2xl shrink-0">
            🧾
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <div className="text-sm font-bold text-text-main truncate group-hover:text-primary transition-colors">增值税专用发票 · 广州美林印刷</div>
              <div className="text-lg font-black text-danger shrink-0">¥ 42,800.00</div>
            </div>
            <div className="text-[11px] text-text-muted mb-3 font-mono">发票号：1122334455 · 2024-12-15</div>
            <div className="py-2 px-3 bg-danger/5 border border-danger/20 rounded-md text-[11px] text-danger flex gap-1.5 items-center font-medium">
               <span className="shrink-0 mt-0.5">⚠️</span> 风险拦截：与账簿数据不符，差异 ¥12,400
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
