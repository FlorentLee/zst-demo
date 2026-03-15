"use client";

import React from 'react';

export default function LedgerScreen() {
  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-6">
        {/* Main Ledger Table */}
        <div className="flex-1 bg-card border border-border-light rounded-xl p-4 md:p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-bold text-text-main flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full"></span>
              AI智能会计凭证本
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              自动化率 94%
            </span>
          </div>
          <div className="text-xs text-text-muted mb-5">🤖 系统已完成本月初始核算并生成凭证草稿，请确认无误后入账。</div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-spacing-0">
              <thead>
                <tr>
                  <th className="text-xs text-text-muted font-bold py-3 px-4 bg-bg-main border-y border-border-light rounded-tl-lg">凭证号</th>
                  <th className="text-xs text-text-muted font-bold py-3 px-4 bg-bg-main border-y border-border-light">摘要</th>
                  <th className="text-xs text-text-muted font-bold py-3 px-4 bg-bg-main border-y border-border-light">借方科目</th>
                  <th className="text-xs text-text-muted font-bold py-3 px-4 bg-bg-main border-y border-border-light">贷方科目</th>
                  <th className="text-xs text-text-muted font-bold py-3 px-4 bg-bg-main border-y border-border-light text-right">总金额</th>
                  <th className="text-xs text-text-muted font-bold py-3 px-4 bg-bg-main border-y border-border-light text-center">生成来源</th>
                  <th className="text-xs text-text-muted font-bold py-3 px-4 bg-bg-main border-y border-border-light rounded-tr-lg text-center">状态</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-bg-main/50 transition-colors group cursor-pointer">
                  <td className="py-3.5 px-4 text-xs font-mono text-primary font-medium border-b border-border-light/50">PZ-2412-001</td>
                  <td className="py-3.5 px-4 text-sm text-text-main font-medium border-b border-border-light/50 group-hover:text-primary transition-colors">采购办公用品</td>
                  <td className="py-3.5 px-4 text-xs text-text-muted border-b border-border-light/50">管理费用-办公费</td>
                  <td className="py-3.5 px-4 text-xs text-text-muted border-b border-border-light/50">银行存款</td>
                  <td className="py-3.5 px-4 text-sm font-bold text-text-main text-right border-b border-border-light/50">¥ 3,280</td>
                  <td className="py-3.5 px-4 text-xs text-center border-b border-border-light/50">
                    <span className="inline-block px-2 rounded-full bg-blue-50 text-blue-600 font-semibold text-[10px] border border-blue-100">AI扫描</span>
                  </td>
                  <td className="py-3.5 px-4 text-center border-b border-border-light/50">
                    <span className="inline-block py-1 px-2.5 rounded text-[10px] font-bold bg-success/10 text-success border border-success/20">已确认过账</span>
                  </td>
                </tr>
                <tr className="hover:bg-bg-main/50 transition-colors group cursor-pointer">
                  <td className="py-3.5 px-4 text-xs font-mono text-primary font-medium border-b border-border-light/50">PZ-2412-002</td>
                  <td className="py-3.5 px-4 text-sm text-text-main font-medium border-b border-border-light/50 group-hover:text-primary transition-colors">支付服务费 · 联通科技</td>
                  <td className="py-3.5 px-4 text-xs text-text-muted border-b border-border-light/50">管理费用-服务费</td>
                  <td className="py-3.5 px-4 text-xs text-text-muted border-b border-border-light/50">应付账款</td>
                  <td className="py-3.5 px-4 text-sm font-bold text-text-main text-right border-b border-border-light/50">¥ 84,600</td>
                  <td className="py-3.5 px-4 text-xs text-center border-b border-border-light/50">
                    <span className="inline-block px-2 rounded-full bg-blue-50 text-blue-600 font-semibold text-[10px] border border-blue-100">AI合规</span>
                  </td>
                  <td className="py-3.5 px-4 text-center border-b border-border-light/50">
                    <span className="inline-block py-1 px-2.5 rounded text-[10px] font-bold bg-success/10 text-success border border-success/20">已确认过账</span>
                  </td>
                </tr>
                <tr className="bg-warning/5 hover:bg-warning/10 transition-colors group cursor-pointer">
                  <td className="py-3.5 px-4 text-xs font-mono text-primary font-medium border-b border-border-light/50">PZ-2412-003</td>
                  <td className="py-3.5 px-4 text-sm text-text-main font-medium border-b border-border-light/50 group-hover:text-primary transition-colors">员工差旅报销</td>
                  <td className="py-3.5 px-4 text-xs text-text-muted border-b border-border-light/50">管理费用-差旅费</td>
                  <td className="py-3.5 px-4 text-xs text-text-muted border-b border-border-light/50">其他应付款</td>
                  <td className="py-3.5 px-4 text-sm font-bold text-text-main text-right border-b border-border-light/50">¥ 3,280</td>
                  <td className="py-3.5 px-4 text-xs text-center border-b border-border-light/50">
                    <span className="inline-block px-2 rounded-full bg-amber-50 text-amber-600 font-semibold text-[10px] border border-amber-200">引擎阻断</span>
                  </td>
                  <td className="py-3.5 px-4 text-center border-b border-border-light/50">
                    <span className="inline-block py-1 px-2.5 rounded text-[10px] font-bold bg-warning text-white shadow-sm hover:shadow-md transition-shadow">待人工复核</span>
                  </td>
                </tr>
                <tr className="hover:bg-bg-main/50 transition-colors group cursor-pointer">
                  <td className="py-3.5 px-4 text-xs font-mono text-primary font-medium border-b border-border-light/50">PZ-2412-004</td>
                  <td className="py-3.5 px-4 text-sm text-text-main font-medium border-b border-border-light/50 group-hover:text-primary transition-colors">收到客户货款</td>
                  <td className="py-3.5 px-4 text-xs text-text-muted border-b border-border-light/50">银行存款</td>
                  <td className="py-3.5 px-4 text-xs text-text-muted border-b border-border-light/50">应收账款</td>
                  <td className="py-3.5 px-4 text-sm font-bold text-success text-right border-b border-border-light/50">¥ 128,000</td>
                  <td className="py-3.5 px-4 text-xs text-center border-b border-border-light/50">
                    <span className="inline-block px-2 rounded-full bg-blue-50 text-blue-600 font-semibold text-[10px] border border-blue-100">AI银企直联</span>
                  </td>
                  <td className="py-3.5 px-4 text-center border-b border-border-light/50">
                    <span className="inline-block py-1 px-2.5 rounded text-[10px] font-bold bg-success/10 text-success border border-success/20">已确认过账</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5 pt-4 border-t border-border-light flex gap-3 items-center">
            <button className="btn btn-primary font-medium shadow-sm">一键确认无误凭证</button>
            <button className="btn btn-ghost border border-border-light font-medium bg-white hover:bg-bg-main text-text-main">导出账套数据包</button>
            <span className="text-xs text-text-muted ml-auto justify-self-end">本月还有 1 张凭证待处理</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Balance Sheet Stub */}
        <div className="bg-card border border-border-light rounded-xl p-6 shadow-sm flex flex-col hover:border-primary/30 transition-colors">
          <div className="text-sm font-bold text-text-main mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1 h-4 bg-info rounded-full"></span>
              关键指标：资产负债
            </div>
            <button className="text-xs text-primary hover:underline font-medium">查看财报</button>
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <div className="flex justify-between items-center py-2.5 border-b border-border-light border-dashed">
              <span className="text-xs text-text-muted flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-border-dark"></span> 流动资产</span>
              <span className="text-sm font-bold text-text-main">¥ 4,280,000</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-border-light border-dashed">
              <span className="text-xs text-text-muted flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-border-dark"></span> 固定资产</span>
              <span className="text-sm font-bold text-text-main">¥ 1,840,000</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-border-light border-dashed">
              <span className="text-xs text-text-muted flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-danger"></span> 流动负债</span>
              <span className="text-sm font-bold text-danger">¥ 920,000</span>
            </div>
            <div className="flex justify-between items-center py-3 mt-auto bg-bg-main px-3 rounded-lg border border-border-light mt-2">
              <span className="text-sm font-bold text-text-main">净资产预估</span>
              <span className="text-lg font-black text-primary">¥ 5,200,000</span>
            </div>
          </div>
        </div>

        {/* Income Statment Stub */}
        <div className="bg-card border border-border-light rounded-xl p-6 shadow-sm flex flex-col hover:border-primary/30 transition-colors">
          <div className="text-sm font-bold text-text-main mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1 h-4 bg-success rounded-full"></span>
              关键指标：利润情况
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <div className="flex justify-between items-center py-2.5 border-b border-border-light border-dashed">
              <span className="text-xs text-text-muted flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-success"></span> 营业收入 (本月)</span>
              <span className="text-sm font-bold text-text-main">¥ 2,847,320</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-border-light border-dashed">
              <span className="text-xs text-text-muted flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-warning"></span> 营业成本</span>
              <span className="text-sm font-bold text-text-main">¥ 1,680,440</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-border-light border-dashed">
              <span className="text-xs text-text-muted flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-warning"></span> 期间费用</span>
              <span className="text-sm font-bold text-text-main">¥ 421,480</span>
            </div>
            <div className="flex justify-between items-center py-3 mt-auto bg-success/5 px-3 rounded-lg border border-success/20 mt-2">
              <span className="text-sm font-bold text-success text-text-main">本月净利润</span>
              <span className="text-lg font-black text-success">¥ 745,400</span>
            </div>
          </div>
        </div>

        {/* Cashflow Stub */}
        <div className="bg-card border border-border-light rounded-xl p-6 shadow-sm flex flex-col hover:border-primary/30 transition-colors">
          <div className="text-sm font-bold text-text-main mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1 h-4 bg-purple-500 rounded-full"></span>
              关键指标：现金流
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <div className="flex justify-between items-center py-2.5 border-b border-border-light border-dashed">
              <span className="text-xs text-text-muted flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span> 经营活动流入</span>
              <span className="text-sm font-bold text-text-main">+¥ 624,800</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-border-light border-dashed">
              <span className="text-xs text-text-muted flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-danger"></span> 投资活动流出</span>
              <span className="text-sm font-bold text-text-main">-¥ 180,000</span>
            </div>
            <div className="flex justify-between items-center py-2.5 border-b border-border-light border-dashed">
              <span className="text-xs text-text-muted flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-border-dark"></span> 筹资活动流出</span>
              <span className="text-sm font-bold text-text-muted">¥ 0</span>
            </div>
            <div className="flex justify-between items-center py-3 mt-auto bg-purple-500/5 px-3 rounded-lg border border-purple-500/20 mt-2">
              <span className="text-sm font-bold text-purple-600 text-text-main">本期净现金流</span>
              <span className="text-lg font-black text-purple-600">+¥ 444,800</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
