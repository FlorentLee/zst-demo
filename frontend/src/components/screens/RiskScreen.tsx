"use client";

import React from 'react';

export default function RiskScreen() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex gap-6 mb-6">
        <div className="flex-1 bg-card border border-border-light rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 hover:shadow-md">
          <div className="text-xs font-semibold text-text-muted mb-3 uppercase tracking-wider">企业综合税务健康分</div>
          <div className="text-6xl font-black mb-2 text-warning">78<span className="text-xl ml-1 text-text-muted font-bold">分</span></div>
          <div className="text-xs font-semibold px-2.5 py-1 rounded-md bg-warning/10 text-warning border border-warning/20">中等风险 · 需关注3项</div>
          <div className="w-full max-w-[80%] h-2 bg-bg-main rounded-full overflow-hidden mt-5">
            <div className="h-full bg-warning w-[78%] rounded-full"></div>
          </div>
        </div>
        
        <div className="flex-1 bg-card border border-border-light rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 hover:shadow-md">
          <div className="text-xs font-semibold text-text-muted mb-3 uppercase tracking-wider">最新政策变更匹配</div>
          <div className="text-6xl font-black mb-2 text-primary">5<span className="text-xl ml-1 text-text-muted font-bold">条</span></div>
          <div className="text-xs font-semibold px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">RAG实时检索更新</div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-text-muted">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            更新: 增值税小规模免税调整
          </div>
        </div>
        
        <div className="flex-1 bg-card border border-border-light rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 hover:shadow-md">
          <div className="text-xs font-semibold text-text-muted mb-3 uppercase tracking-wider">高危待处理事项</div>
          <div className="text-6xl font-black mb-2 text-danger">3<span className="text-xl ml-1 text-text-muted font-bold">项</span></div>
          <div className="text-xs font-semibold px-2.5 py-1 rounded-md bg-danger/10 text-danger border border-danger/20">需在截止日前处理</div>
          <div className="mt-4 flex gap-3 justify-center w-full">
            <div className="text-xs font-medium flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-danger"></span> 高危 1</div>
            <div className="text-xs font-medium flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning"></span> 中危 2</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_350px] gap-6">
        <div className="bg-card border border-border-light rounded-xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-border-light flex items-center justify-between">
            <div className="text-sm font-bold text-text-main flex items-center gap-2">
              <span className="w-1 h-4 bg-danger rounded-full"></span>
              风险明细列表
            </div>
            <button className="text-xs text-primary font-medium hover:underline">一键AI处理</button>
          </div>
          
          <div className="p-4 flex flex-col gap-3">
            <div className="flex gap-4 p-4 bg-bg-main border border-border-light rounded-lg cursor-pointer transition-all duration-200 hover:border-danger hover:shadow-md hover:bg-white group">
              <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center text-danger shrink-0 text-lg">⚠️</div>
              <div className="flex-1">
                 <div className="text-sm font-bold text-text-main mb-1 group-hover:text-primary transition-colors">增值税申报数据与账簿不符</div>
                 <div className="text-xs text-text-muted mb-2 leading-relaxed">发票进项 ¥284,600 与账簿记录 ¥241,800 差异 ¥42,800，疑似漏记无进项票入账。</div>
                 <div className="flex items-center gap-2">
                   <span className="text-[10px] bg-danger/10 text-danger px-2 py-0.5 rounded font-semibold border border-danger/20">高危风险</span>
                   <span className="text-[10px] text-text-muted">截止日期：2024年12月25日</span>
                 </div>
              </div>
              <div className="text-right flex flex-col justify-between items-end min-w-[100px]">
                 <div className="text-sm font-bold text-text-main">罚款预估 <span className="text-danger">¥8,500</span></div>
                 <button className="btn btn-primary !py-1 !px-3 !text-xs mt-2 w-full">AI自动平账</button>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-bg-main border border-border-light rounded-lg cursor-pointer transition-all duration-200 hover:border-warning hover:shadow-md hover:bg-white group">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center text-warning shrink-0 text-lg">📅</div>
              <div className="flex-1">
                 <div className="text-sm font-bold text-text-main mb-1 group-hover:text-primary transition-colors">Q4企业所得税预缴截止提醒</div>
                 <div className="text-xs text-text-muted mb-2 leading-relaxed">本季度预计应缴企业所得税约 ¥186,400，需在12月25日前完成申报，避免滞纳金。</div>
                 <div className="flex items-center gap-2">
                   <span className="text-[10px] bg-warning/10 text-warning px-2 py-0.5 rounded font-semibold border border-warning/20">税期提醒</span>
                   <span className="text-[10px] text-text-muted">智税通可一键生成申报表</span>
                 </div>
              </div>
              <div className="text-right flex flex-col justify-between items-end min-w-[100px]">
                 <div className="text-sm font-bold text-text-main">预缴额 <span className="text-warning">¥186k</span></div>
                 <button className="btn btn-ghost !py-1 !px-3 !text-xs mt-2 w-full">去申报</button>
              </div>
            </div>

            <div className="flex gap-4 p-4 bg-bg-main border border-border-light rounded-lg cursor-pointer transition-all duration-200 hover:border-warning hover:shadow-md hover:bg-white group">
              <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center text-warning shrink-0 text-lg">🔍</div>
              <div className="flex-1">
                 <div className="text-sm font-bold text-text-main mb-1 group-hover:text-primary transition-colors">员工报销费用异常检测</div>
                 <div className="text-xs text-text-muted mb-2 leading-relaxed">王某2024年11月餐饮费用 ¥8,400，超出公司报销标准 3.2倍，AI已标记待核查。</div>
                 <div className="flex items-center gap-2">
                   <span className="text-[10px] bg-warning/10 text-warning px-2 py-0.5 rounded font-semibold border border-warning/20">合规核查</span>
                   <span className="text-[10px] text-text-muted">建议：要求提供详细说明或退回报销</span>
                 </div>
              </div>
              <div className="text-right flex flex-col justify-between items-end min-w-[100px]">
                 <div className="text-sm font-bold text-text-main">异常金额 <span className="text-warning">¥8,400</span></div>
                 <button className="btn btn-ghost !py-1 !px-3 !text-xs mt-2 w-full">发起通知</button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Policy RAG */}
        <div className="bg-card border border-border-light rounded-xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-border-light">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold py-0.5 px-2 rounded-md tracking-wide">AI RAG 技术</span>
            </div>
            <div className="text-sm font-bold text-text-main mt-1">智能政策库推送</div>
            <div className="text-xs text-text-muted mt-1">根据企业画像实时匹配的涉税政策</div>
          </div>
          
          <div className="p-4 flex flex-col gap-3">
            <div className="p-3 bg-bg-main rounded-lg border border-border-light/50 hover:bg-primary/5 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-text-main flex items-center gap-1.5"><span className="text-primary">📋</span> 国家税务总局公告</div>
                <div className="text-[10px] text-text-muted">2024第21号</div>
              </div>
              <div className="text-xs text-text-muted leading-relaxed">
                小规模纳税人季度销售额不超15万免增值税，已自动同步至您的税率配置。
              </div>
              <div className="mt-2 text-[10px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">点击查看原文解读 →</div>
            </div>

            <div className="p-3 bg-bg-main rounded-lg border border-border-light/50 hover:bg-primary/5 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs font-bold text-text-main flex items-center gap-1.5"><span className="text-primary">📋</span> 研发费用加计扣除</div>
                <div className="text-[10px] text-text-muted">财税〔2024〕18号</div>
              </div>
              <div className="text-xs text-text-muted leading-relaxed">
                研发费用加计扣除比例提升至100%，AI已检测您公司符合条件，预计<span className="text-success font-semibold">可多扣除 ¥42万</span>。
              </div>
              <div className="mt-2 text-[10px] text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">点击应用筹划方案 →</div>
            </div>
            
            <button className="btn btn-ghost w-full mt-2 text-xs">进入完整政策库搜索</button>
          </div>
        </div>
      </div>
    </div>
  );
}
