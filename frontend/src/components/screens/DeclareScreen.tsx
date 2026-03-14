"use client";

import React from 'react';

export default function DeclareScreen() {
  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="mb-6 flex items-center justify-between">
         <div>
            <h1 className="text-xl font-bold text-text-main mb-1">税务申报工作台</h1>
            <p className="text-xs text-text-muted">AI自动计算税金并生成申报表，支持一键申报至税局端。</p>
         </div>
         <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-3">
             <div className="text-3xl">📅</div>
             <div>
                <div className="text-xs font-bold text-primary">本月申报截止日</div>
                <div className="text-sm font-black text-text-main">2024年12月25日 <span className="text-danger ml-1 text-xs">仅剩 11 天</span></div>
             </div>
         </div>
      </div>

      <div className="grid grid-cols-[1fr_300px] gap-6">
        {/* Main Declare Forms */}
        <div className="flex flex-col gap-5">
           
           {/* VAT Tax */}
           <div className="bg-card border border-border-light rounded-xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4 border-b border-border-light pb-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-info/10 text-info flex items-center justify-center text-xl font-bold">增</div>
                    <div>
                       <div className="text-base font-bold text-text-main">增值税及附加税费申报表（一般纳税人）</div>
                       <div className="text-xs text-text-muted mt-0.5">所属期：2024-11-01 至 2024-11-30</div>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-xs text-text-muted mb-0.5">AI 核算应缴税额</div>
                    <div className="text-xl font-black text-text-main">¥ 48,260.45</div>
                 </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-5">
                 <div className="bg-bg-main p-3 rounded-lg border border-border-light">
                   <div className="text-[11px] text-text-muted mb-1">销项税额</div>
                   <div className="text-sm font-bold text-text-main">¥ 186,400.00</div>
                 </div>
                 <div className="bg-bg-main p-3 rounded-lg border border-border-light">
                   <div className="text-[11px] text-text-muted mb-1">进项税额</div>
                   <div className="text-sm font-bold text-text-main">¥ 142,650.00</div>
                 </div>
                 <div className="bg-bg-main p-3 rounded-lg border border-border-light">
                   <div className="text-[11px] text-text-muted mb-1">进项税额转出</div>
                   <div className="text-sm font-bold text-text-main">¥ 4,510.45</div>
                 </div>
                 <div className="bg-bg-main p-3 rounded-lg border border-border-light">
                   <div className="text-[11px] text-text-muted mb-1">本期应补(退)税额</div>
                   <div className="text-sm font-bold text-text-main">¥ 48,260.45</div>
                 </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                 <div className="flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                   <span className="text-xs font-semibold text-success">表表比对合规，无异常风险</span>
                 </div>
                 <div className="flex gap-3">
                   <button className="btn btn-ghost !py-1.5 border border-border-light text-text-main">预览申报表</button>
                   <button className="btn btn-primary !py-1.5 shadow-sm">一键申报并缴款</button>
                 </div>
              </div>
           </div>

           {/* Income Tax */}
           <div className="bg-card border border-border-light rounded-xl p-6 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-4 border-b border-border-light pb-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-warning/10 text-warning flex items-center justify-center text-xl font-bold">企</div>
                    <div>
                       <div className="text-base font-bold text-text-main">企业所得税季度预缴纳税申报表</div>
                       <div className="text-xs text-text-muted mt-0.5">所属期：2024-10-01 至 2024-12-31</div>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-xs text-text-muted mb-0.5">预计应缴税额</div>
                    <div className="text-xl font-black text-warning">¥ 0.00</div>
                 </div>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mb-4 flex items-start gap-3">
                 <div className="text-xl shrink-0 mt-0.5">💡</div>
                 <div>
                   <div className="text-sm font-bold text-primary mb-1">AI 节税筹划方案实施中</div>
                   <div className="text-xs text-text-muted leading-relaxed font-medium">
                     本季度利润总额预计为 ¥420,000，AI 已自动应用<span className="text-primary font-bold">研发费用加计扣除 (100%)</span>及<span className="text-primary font-bold">小微企业税收优惠政策</span>。调整后应纳税所得额为负数，本期无需预缴企业所得税。约合<span className="text-success font-bold">节省现金流流出 ¥105,000</span>。
                   </div>
                 </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                 <div className="flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                   <span className="text-xs font-semibold text-success">智能填报完成，数据已就绪</span>
                 </div>
                 <div className="flex gap-3">
                   <button className="btn btn-ghost !py-1.5 border border-border-light text-text-main">预览申报表</button>
                   <button className="btn btn-primary !py-1.5 shadow-sm">一键零申报</button>
                 </div>
              </div>
           </div>

        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-5">
           
           <div className="bg-card border border-border-light rounded-xl p-5 shadow-sm">
             <div className="text-sm font-bold text-text-main mb-4 flex items-center gap-2">
               <span className="w-1 h-4 bg-primary rounded-full"></span>申报记录状态
             </div>
             
             <div className="relative pl-5 border-l-2 border-border-light space-y-5 py-2">
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-white border-2 border-danger shadow-sm"></div>
                  <div className="text-xs font-bold text-danger mb-0.5">待申报 / 待缴款</div>
                  <div className="text-[11px] text-text-muted">本月还有2个税种待处理</div>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-white border-2 border-success shadow-sm"></div>
                  <div className="text-xs font-bold text-success mb-0.5">个税申报成功代扣代缴</div>
                  <div className="text-[11px] text-text-muted">2024-12-05 14:30</div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-white border-2 border-success shadow-sm"></div>
                  <div className="text-xs font-bold text-success mb-0.5">上月个税申报缴款完成</div>
                  <div className="text-[11px] text-text-muted">2024-11-12 09:15</div>
                </div>
             </div>
             
             <button className="mt-5 w-full btn btn-ghost !py-1.5 text-xs border border-border-light hover:bg-bg-main">查看历史申报记录库 →</button>
           </div>
           
           <div className="bg-gradient-to-br from-card to-primary/5 border border-primary/20 rounded-xl p-5 shadow-sm">
             <div className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
               🤖 AI 税局通道检测
             </div>
             <div className="text-xs text-text-muted mb-4 leading-relaxed font-medium">
               已自动连接各省电子税务局，接口状态正常，当前网络延迟 24ms。
             </div>
             <div className="flex flex-col gap-2">
               <div className="flex justify-between items-center bg-white/50 border border-primary/10 rounded px-3 py-2">
                 <span className="text-[11px] text-text-main font-bold">国税局接口</span>
                 <span className="px-1.5 py-0.5 rounded bg-success/10 text-success text-[10px] font-bold">在线</span>
               </div>
               <div className="flex justify-between items-center bg-white/50 border border-primary/10 rounded px-3 py-2">
                 <span className="text-[11px] text-text-main font-bold">自然人电子税务局</span>
                 <span className="px-1.5 py-0.5 rounded bg-success/10 text-success text-[10px] font-bold">在线</span>
               </div>
             </div>
           </div>
           
        </div>
      </div>
    </div>
  );
}
