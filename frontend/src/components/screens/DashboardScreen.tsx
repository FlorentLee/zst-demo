"use client";

import React, { useState, useEffect } from 'react';
import { getLedger } from '@/lib/api';

export interface LedgerItem {
  id: number;
  invoice_number?: string;
  invoice_type?: string;
  amount?: number;
  total_amount?: number;
  created_at?: string;
  compliance_score?: number;
}

export default function DashboardScreen() {
  const [ledgerItems, setLedgerItems] = useState<LedgerItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Poll ledger data from backend
  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const response = await getLedger();
        console.log("=== DEBUG: Dashboard Ledger Data ===", response);
        setLedgerItems(response.items || response || []);
      } catch (error) {
        console.error("Failed to fetch ledger:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLedger();
    const interval = setInterval(fetchLedger, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border-light shadow-sm rounded-xl p-5 relative overflow-hidden transition-all duration-200 hover:border-primary hover:shadow-md">
          <div className="absolute top-4 right-4 text-3xl opacity-20 filter grayscale">💰</div>
          <div className="text-xs text-text-muted font-medium mb-1.5 uppercase tracking-wide">本月处理票据金额</div>
          <div className="text-3xl font-bold leading-none mb-2 text-text-main">¥ 2,847,320</div>
          <div className="text-xs text-text-muted flex items-center gap-1.5">
            <span className="text-success font-medium bg-success/10 px-1.5 py-0.5 rounded text-[10px]">↑ 18.6%</span>
            <span>较上月</span>
          </div>
        </div>

        <div className="bg-card border border-border-light shadow-sm rounded-xl p-5 relative overflow-hidden transition-all duration-200 hover:border-info hover:shadow-md">
          <div className="absolute top-4 right-4 text-3xl opacity-20 filter grayscale">🧾</div>
          <div className="text-xs text-text-muted font-medium mb-1.5 uppercase tracking-wide">AI处理票据数</div>
          <div className="text-3xl font-bold leading-none mb-2 text-text-main">1,284</div>
          <div className="text-xs text-text-muted flex items-center gap-1.5">
            <span className="text-success font-medium bg-success/10 px-1.5 py-0.5 rounded text-[10px]">↑ 43张</span>
            <span>今日新增</span>
          </div>
        </div>

        <div className="bg-card border border-border-light shadow-sm rounded-xl p-5 relative overflow-hidden transition-all duration-200 hover:border-success hover:shadow-md">
          <div className="absolute top-4 right-4 text-3xl opacity-20 filter grayscale">✅</div>
          <div className="text-xs text-text-muted font-medium mb-1.5 uppercase tracking-wide">合规率</div>
          <div className="text-3xl font-bold leading-none mb-2 text-text-main">99.2%</div>
          <div className="text-xs text-text-muted flex items-center gap-1.5">
            <span className="text-success font-medium bg-success/10 px-1.5 py-0.5 rounded text-[10px]">↑ 0.3%</span>
            <span>较上季</span>
          </div>
        </div>

        <div className="bg-card border border-border-light shadow-sm rounded-xl p-5 relative overflow-hidden transition-all duration-200 hover:border-purple-500 hover:shadow-md">
          <div className="absolute top-4 right-4 text-3xl opacity-20 filter grayscale">⚡</div>
          <div className="text-xs text-text-muted font-medium mb-1.5 uppercase tracking-wide">审批流平均耗时</div>
          <div className="text-3xl font-bold leading-none mb-2 text-text-main">4.2h</div>
          <div className="text-xs text-text-muted flex items-center gap-1.5">
            <span className="text-success font-medium bg-success/10 px-1.5 py-0.5 rounded text-[10px]">↓ 68%</span>
            <span>AI加速后</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-6 mb-6">
        {/* Revenue Chart */}
        <div className="bg-card border border-border-light shadow-sm rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm font-bold text-text-main">月度财务流水趋势</div>
            <div className="flex gap-4">
              <span className="text-xs text-text-muted flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-info"></span> 收入</span>
              <span className="text-xs text-text-muted flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-warning"></span> 支出</span>
              <span className="text-xs text-text-muted flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-success"></span> 净利润</span>
            </div>
          </div>
          <div className="h-[200px] flex items-end gap-3 pb-6 relative px-2">
            {/* Grid lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-border-light"></div>
            <div className="absolute top-[33%] left-0 right-0 h-px bg-border-light"></div>
            <div className="absolute top-[66%] left-0 right-0 h-px bg-border-light"></div>

            {[
              { month: '7月', inc: '52%', exp: '30%', prof: '22%' },
              { month: '8月', inc: '61%', exp: '35%', prof: '26%' },
              { month: '9月', inc: '55%', exp: '40%', prof: '15%' },
              { month: '10月', inc: '78%', exp: '45%', prof: '33%' },
              { month: '11月', inc: '70%', exp: '38%', prof: '32%' },
              { month: '12月', inc: '88%', exp: '42%', prof: '46%' },
            ].map((col, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end cursor-pointer group relative z-10 hover:bg-bg-main/50 rounded-t-lg transition-colors">
                <div className="flex items-end gap-[2px] sm:gap-[4px] w-full justify-center h-full pb-1">
                  {/* Income Bar */}
                  <div className="w-[25%] max-w-[14px] bg-info rounded-t-[3px] opacity-80 group-hover:opacity-100 transition-all duration-300" style={{ height: col.inc }} title={`收入 (Income)`}></div>
                  {/* Expense Bar */}
                  <div className="w-[25%] max-w-[14px] bg-warning rounded-t-[3px] opacity-80 group-hover:opacity-100 transition-all duration-300" style={{ height: col.exp }} title={`支出 (Expense)`}></div>
                  {/* Profit Bar */}
                  <div className="w-[25%] max-w-[14px] bg-success rounded-t-[3px] opacity-85 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_8px_rgba(16,185,129,0.2)] group-hover:shadow-[0_0_12px_rgba(16,185,129,0.4)]" style={{ height: col.prof }} title={`净利润 (Profit)`}></div>
                </div>
                <div className="text-xs font-medium text-text-muted group-hover:text-primary transition-colors">{col.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Summary */}
        <div className="bg-card border border-border-light shadow-sm rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-bold text-text-main">风险预警</div>
            <span className="bg-danger/10 text-danger text-xs font-semibold px-2 py-0.5 rounded-full">3项需处理</span>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-start gap-3 p-3 -mx-3 rounded-lg hover:bg-bg-main transition-colors cursor-pointer group border border-transparent hover:border-border-light">
              <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-danger"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-text-main mb-0.5 group-hover:text-primary transition-colors">增值税申报数据异常</div>
                <div className="text-xs text-text-muted">发票金额与账簿差异 ¥42,800</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-danger/10 text-danger border border-danger/20 font-semibold mt-0.5">高危</span>
            </div>
            <div className="flex items-start gap-3 p-3 -mx-3 rounded-lg hover:bg-bg-main transition-colors cursor-pointer group border border-transparent hover:border-border-light">
              <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-warning"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-text-main mb-0.5 group-hover:text-primary transition-colors">企业所得税预缴提醒</div>
                <div className="text-xs text-text-muted">本季度截止 12月25日</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-warning/10 text-warning border border-warning/20 font-semibold mt-0.5">提醒</span>
            </div>
            <div className="flex items-start gap-3 p-3 -mx-3 rounded-lg hover:bg-bg-main transition-colors cursor-pointer group border border-transparent hover:border-border-light">
              <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-warning"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-text-main mb-0.5 group-hover:text-primary transition-colors">员工报销费用异常</div>
                <div className="text-xs text-text-muted">王某餐饮费疑似虚开</div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-warning/10 text-warning border border-warning/20 font-semibold mt-0.5">待核</span>
            </div>
          </div>
          <button className="w-full mt-2 btn btn-ghost !py-1.5 !text-xs text-text-muted group">
            查看全部风险项 <span className="group-hover:translate-x-1 transition-transform ml-1">→</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border-light shadow-sm rounded-xl">
        <div className="p-5 border-b border-border-light flex items-center justify-between">
          <div className="text-sm font-bold text-text-main">最近处理记录</div>
          <button className="text-xs text-primary font-medium hover:underline">查看全部</button>
        </div>

        <div className="p-2">
          <table className="w-full text-left border-spacing-0">
            <thead>
              <tr>
                <th className="text-xs text-text-muted font-medium py-3 px-4 border-b border-border-light bg-bg-main/50 rounded-tl-lg">票据编号</th>
                <th className="text-xs text-text-muted font-medium py-3 px-4 border-b border-border-light bg-bg-main/50">项目类型</th>
                <th className="text-xs text-text-muted font-medium py-3 px-4 border-b border-border-light bg-bg-main/50">金额</th>
                <th className="text-xs text-text-muted font-medium py-3 px-4 border-b border-border-light bg-bg-main/50">创建时间</th>
                <th className="text-xs text-text-muted font-medium py-3 px-4 border-b border-border-light bg-bg-main/50">AI识别</th>
                <th className="text-xs text-text-muted font-medium py-3 px-4 border-b border-border-light bg-bg-main/50 rounded-tr-lg">状态</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8 text-text-muted text-sm">正在加载 SQLite 账簿...</td></tr>
              ) : ledgerItems.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-text-muted text-sm">暂无动态记录，请前往票据上传测试</td></tr>
              ) : (
                ledgerItems.map((item) => (
                  <tr key={item.id} className="hover:bg-bg-main/50 transition-colors group">
                    <td className="py-3.5 px-4 text-xs font-mono text-text-main border-b border-border-light/50">{item.invoice_number || `SYS-${item.id}`}</td>
                    <td className="py-3.5 px-4 text-sm text-text-main border-b border-border-light/50">{item.invoice_type || '未知类型'}</td>
                    <td className="py-3.5 px-4 text-sm text-text-main font-semibold border-b border-border-light/50">¥ {(item.total_amount ?? item.amount ?? 0).toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-xs text-text-muted border-b border-border-light/50">{item.created_at ? new Date(item.created_at).toLocaleDateString() : '-'}</td>
                    <td className="py-3.5 px-4 text-sm border-b border-border-light/50">
                      {(item.compliance_score ?? 0) >= 90 ? (
                        <span className="text-success font-medium text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-success"></span> {item.compliance_score}%</span>
                      ) : (item.compliance_score ?? 0) > 0 ? (
                        <span className="text-warning font-medium text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-warning"></span> {item.compliance_score}%</span>
                      ) : (
                        <span className="text-text-muted text-xs">-</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-sm border-b border-border-light/50">
                      <span className="inline-block py-1 px-2.5 rounded text-xs font-semibold bg-success/10 text-success border border-success/20">已入账</span>
                    </td>
                  </tr>
                ))
              )}

              {/* Fallback mock items to match UI if too few dynamic items are present */}
              {ledgerItems.length < 3 && (
                <>
                  <tr className="hover:bg-bg-main/50 transition-colors">
                    <td className="py-3.5 px-4 text-xs font-mono text-text-main border-b border-border-light/50">EXP-2024-2018</td>
                    <td className="py-3.5 px-4 text-sm text-text-main border-b border-border-light/50">差旅费用</td>
                    <td className="py-3.5 px-4 text-sm text-text-main font-semibold border-b border-border-light/50">¥ 3,280</td>
                    <td className="py-3.5 px-4 text-xs text-text-muted border-b border-border-light/50">2024-12-17</td>
                    <td className="py-3.5 px-4 text-sm border-b border-border-light/50">
                      <span className="text-warning font-medium text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-warning"></span> 待核查</span>
                    </td>
                    <td className="py-3.5 px-4 text-sm border-b border-border-light/50">
                      <span className="inline-block py-1 px-2.5 rounded text-xs font-semibold bg-warning/10 text-warning border border-warning/20">审批中</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-bg-main/50 transition-colors">
                    <td className="py-3.5 px-4 text-xs font-mono text-text-main border-b border-border-light/50">INV-2024-4819</td>
                    <td className="py-3.5 px-4 text-sm text-text-main border-b border-border-light/50">增值税专用发票</td>
                    <td className="py-3.5 px-4 text-sm text-text-main font-semibold border-b border-border-light/50">¥ 42,800</td>
                    <td className="py-3.5 px-4 text-xs text-text-muted border-b border-border-light/50">2024-12-15</td>
                    <td className="py-3.5 px-4 text-sm border-b border-border-light/50">
                      <span className="text-danger font-medium text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-danger"></span> 数据异常</span>
                    </td>
                    <td className="py-3.5 px-4 text-sm border-b border-border-light/50">
                      <span className="inline-block py-1 px-2.5 rounded text-xs font-semibold bg-danger/10 text-danger border border-danger/20">需处理</span>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
