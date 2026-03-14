"use client";

import React, { useState, useEffect } from 'react';
import { getCEOReport } from '@/lib/api';

export default function AnalyticsScreen() {
  const [reportText, setReportText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Simulate initial streaming or fetching for the CEO report
    const generateReport = async () => {
      setIsGenerating(true);
      try {
        const response = await getCEOReport();
        const textToStream = response.report || "老板，本月经营健康。利润同比增长明显...";

        let currentText = "";
        let idx = 0;
        const typingInterval = setInterval(() => {
          if (!isMounted) {
            clearInterval(typingInterval);
            return;
          }
          if (idx < textToStream.length) {
            currentText += textToStream.charAt(idx);
            setReportText(currentText);
            idx++;
          } else {
            clearInterval(typingInterval);
            setIsGenerating(false);
          }
        }, 30);

      } catch (error) {
        console.error("Report gen failed", error);
        if (isMounted) {
          setReportText("⚠️ 生成报告失败，请检查网络或配置。");
          setIsGenerating(false);
        }
      }
    };

    generateReport();

    return () => { isMounted = false; };
  }, []);

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-[1.5fr_1fr] gap-6 mb-6">
        {/* Income Structure */}
        <div className="bg-card border border-border-light rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="text-sm font-bold text-text-main flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full"></span>
              本月收入结构分析
            </div>
          </div>
          <div className="flex h-10 w-full rounded-full overflow-hidden mb-6 shadow-inner">
            <div className="h-full bg-primary" style={{ width: '45%' }}></div>
            <div className="h-full bg-info" style={{ width: '30%' }}></div>
            <div className="h-full bg-success" style={{ width: '15%' }}></div>
            <div className="h-full bg-warning" style={{ width: '10%' }}></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-bg-main rounded-lg border border-border-light">
              <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0"></div>
              <div>
                <div className="text-xs text-text-muted">主营业务收入</div>
                <div className="text-sm font-bold text-text-main">¥ 1,280,000 <span className="text-[10px] text-text-muted font-normal ml-1">45%</span></div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-bg-main rounded-lg border border-border-light">
              <div className="w-3 h-3 rounded-full bg-info flex-shrink-0"></div>
              <div>
                <div className="text-xs text-text-muted">服务与咨询</div>
                <div className="text-sm font-bold text-text-main">¥ 854,000 <span className="text-[10px] text-text-muted font-normal ml-1">30%</span></div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-bg-main rounded-lg border border-border-light">
              <div className="w-3 h-3 rounded-full bg-success flex-shrink-0"></div>
              <div>
                <div className="text-xs text-text-muted">软件授权</div>
                <div className="text-sm font-bold text-text-main">¥ 427,000 <span className="text-[10px] text-text-muted font-normal ml-1">15%</span></div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-bg-main rounded-lg border border-border-light">
              <div className="w-3 h-3 rounded-full bg-warning flex-shrink-0"></div>
              <div>
                <div className="text-xs text-text-muted">其他零星收入</div>
                <div className="text-sm font-bold text-text-main">¥ 284,000 <span className="text-[10px] text-text-muted font-normal ml-1">10%</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Tax Rate Analysis */}
        <div className="bg-card border border-border-light rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="text-sm font-bold text-text-main flex items-center gap-2">
              <span className="w-1 h-4 bg-success rounded-full"></span>
              企业税务复核健康率
            </div>
            <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded border border-success/20 font-semibold">高于行业均值 2.4%</span>
          </div>

          <div className="relative h-[160px] flex items-end justify-between px-4 pb-0 mt-4">
            <div className="absolute top-[30%] left-0 right-0 h-px bg-border-light border-dashed"></div>

            {[
              { m: 'Q1', r: 96.4, h: '96%', c: 'bg-primary' },
              { m: 'Q2', r: 94.9, h: '95%', c: 'bg-info' },
              { m: 'Q3', r: 95.1, h: '95%', c: 'bg-purple-400' },
              { m: 'Q4 (预计)', r: 98.8, h: '99%', c: 'bg-success shadow-[0_0_12px_rgba(16,185,129,0.3)] border border-success' }
            ].map((bar, i) => (
              <div key={i} className="flex flex-col justify-end items-center gap-2 w-12 h-full group cursor-pointer relative z-10">
                <div className="text-[10px] font-bold text-text-muted group-hover:text-text-main transition-colors">{bar.r}%</div>
                <div className={`w-full rounded-t-md opacity-90 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 ${bar.c}`} style={{ height: bar.h }}></div>
                <div className="text-xs text-text-muted mt-1 font-medium">{bar.m}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI CEO Report */}
      <div className="bg-gradient-to-br from-card to-blue-50/30 border border-primary/20 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-xl">🤖</div>
            <div>
              <div className="text-sm font-bold text-primary flex items-center gap-2">
                AI 老板经营周报
                {isGenerating && <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>}
              </div>
              <div className="text-xs text-text-muted mt-0.5" id="reportTime">{new Date().toLocaleDateString()} 生成 · Gemini大模型驱动</div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="btn btn-ghost !text-xs !py-1.5 !px-3 hover:text-primary hover:border-primary">重新生成</button>
            <button className="btn btn-primary !text-xs !py-1.5 !px-3 font-semibold shadow-md shadow-primary/20"
              onClick={() => alert("周报已发送至钉钉/企业微信群")}>通知高管群(发送件)</button>
          </div>
        </div>

        <div className="px-4 py-2 min-h-[160px]">
          <p className="text-sm text-text-main leading-relaxed whitespace-pre-wrap font-medium">
            {reportText || "等待Gemini模型响应中..."}
          </p>
        </div>
      </div>
    </div>
  );
}
