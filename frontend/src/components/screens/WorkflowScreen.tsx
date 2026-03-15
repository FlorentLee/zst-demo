"use client";

import React, { useState } from 'react';

type FlowTemplate = 'expense' | 'contract' | 'invoice' | 'new';

interface FlowNode {
  icon: string;
  title: string;
  desc: string;
  isAI?: boolean;
  isCondition?: boolean;
  isAdd?: boolean;
}

interface FlowTemplateData {
  title: string;
  id: string;
  status: string;
  nodes: FlowNode[];
  aiRules: string[];
  stats: { completed: number; pending: number; rejected: number; time: string };
}

export default function WorkflowScreen() {
  const [activeTab, setActiveTab] = useState<FlowTemplate>('expense');

  const templates: Record<FlowTemplate, FlowTemplateData> = {
    expense: {
      title: '费用报销审批流',
      id: 'WF-EXP-001',
      status: '运行中',
      nodes: [
        { icon: '🟢', title: '员工提交', desc: '填写报销单' },
        { icon: '🤖', title: 'AI预审', desc: '票据验真·合规检查', isAI: true },
        { icon: '📊', title: '金额判断', desc: '≤5000元 / >5000元', isCondition: true },
        { icon: '👤', title: '主管审批', desc: '部门负责人' },
        { icon: '👤', title: '财务审核', desc: 'CFO · >5000元' },
        { icon: '📒', title: '自动入账', desc: '生成凭证' },
      ],
      aiRules: [
        '发票真伪验证（国税API）',
        '发票查重（历史比对）',
        '费用类型合规检查',
        '餐饮/差旅限额判断',
        '供应商黑名单比对',
        '异常金额智能标记'
      ],
      stats: { completed: 284, pending: 12, rejected: 3, time: '4.2' }
    },
    contract: {
      title: '合同审批流',
      id: 'WF-CON-002',
      status: '运行中',
      nodes: [
        { icon: '🟢', title: '业务提交', desc: '上传合同草案' },
        { icon: '🤖', title: 'AI法务审核', desc: '条款风险/主客体校验', isAI: true },
        { icon: '📊', title: '条件分支', desc: '常规/重大合同', isCondition: true },
        { icon: '👤', title: '法务复核', desc: '重大合同' },
        { icon: '👤', title: '业务总监', desc: '签批' },
        { icon: '📒', title: '自动动作', desc: '归档&盖章' },
      ],
      aiRules: [
        '合同主体工商信息核验',
        '违约责任条款完整性检查',
        '支付条款合规性评估',
        '知识产权归属风险提示',
        '历史违约记录比对'
      ],
      stats: { completed: 156, pending: 8, rejected: 1, time: '8.5' }
    },
    invoice: {
      title: '发票审核流',
      id: 'WF-INV-003',
      status: '运行中',
      nodes: [
        { icon: '🟢', title: '供应商提交', desc: '上传发票' },
        { icon: '🤖', title: 'AI预审', desc: '票面信息提取&验真', isAI: true },
        { icon: '📊', title: '匹配订单', desc: '与采购订单比对', isCondition: true },
        { icon: '👤', title: '采购确认', desc: '差异复核' },
        { icon: '📒', title: '自动动作', desc: '进入付款池' },
      ],
      aiRules: [
        '购买方/销售方信息校验',
        '发票号码防伪核验',
        '价税合计金额计算核对',
        '采购订单物料自动匹配',
        '开票日期时效性检查'
      ],
      stats: { completed: 892, pending: 45, rejected: 18, time: '1.2' }
    },
    new: {
      title: '自定义新流程',
      id: 'WF-NEW-000',
      status: '草稿',
      nodes: [
        { icon: '🟢', title: '触发器', desc: '请选择触发条件' },
        { icon: '➕', title: '添加节点', desc: '拖拽左侧节点到此', isAdd: true },
      ],
      aiRules: [],
      stats: { completed: 0, pending: 0, rejected: 0, time: '0.0' }
    }
  };

  const currentTemplate = templates[activeTab];

  return (
    <div className="p-6 max-w-[1400px] mx-auto h-[calc(100vh-80px)] flex flex-col gap-4">
      {/* Top Templates Tabs */}
      <div className="flex items-center gap-3">
        <div className="text-sm font-bold text-text-main mr-4">工作流模版 :</div>
        {(Object.keys(templates) as FlowTemplate[]).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm border ${activeTab === key
              ? 'bg-primary text-white border-primary shadow-md'
              : 'bg-white text-text-main border-border-light hover:border-primary hover:text-primary'
              }`}
          >
            {key === 'new' ? '+ 新建流程' : templates[key].title}
          </button>
        ))}
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
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
            <div className="bg-white text-slate-700 p-3 rounded-lg border border-slate-200 hover:border-slate-400 hover:shadow-md hover:-translate-y-0.5 cursor-grab flex items-center gap-3 shadow-sm transition-all">
              <div className="text-xl">🟢</div>
              <div className="text-sm font-medium">触发：提交申请</div>
            </div>
            <div className="bg-white text-slate-700 p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 cursor-grab flex items-center gap-3 shadow-sm transition-all">
              <div className="text-xl">🤖</div>
              <div className="text-sm font-medium">AI：自动审核</div>
            </div>
            <div className="bg-white text-slate-700 p-3 rounded-lg border border-slate-200 hover:border-emerald-500 hover:shadow-md hover:-translate-y-0.5 cursor-grab flex items-center gap-3 shadow-sm transition-all">
              <div className="text-xl">👤</div>
              <div className="text-sm font-medium">人工：主管审批</div>
            </div>
            <div className="bg-white text-slate-700 p-3 rounded-lg border border-slate-200 hover:border-amber-500 hover:shadow-md hover:-translate-y-0.5 cursor-grab flex items-center gap-3 shadow-sm transition-all">
              <div className="text-xl">📊</div>
              <div className="text-sm font-medium">条件：金额判断</div>
            </div>
            <div className="bg-white text-slate-700 p-3 rounded-lg border border-slate-200 hover:border-purple-500 hover:shadow-md hover:-translate-y-0.5 cursor-grab flex items-center gap-3 shadow-sm transition-all">
              <div className="text-xl">📧</div>
              <div className="text-sm font-medium">通知：发送消息</div>
            </div>
            <div className="bg-white text-slate-700 p-3 rounded-lg border border-slate-200 hover:border-teal-500 hover:shadow-md hover:-translate-y-0.5 cursor-grab flex items-center gap-3 shadow-sm transition-all">
              <div className="text-xl">📒</div>
              <div className="text-sm font-medium">动作：自动入账</div>
            </div>
            <div className="bg-white text-slate-700 p-3 rounded-lg border border-slate-200 hover:border-red-500 hover:shadow-md hover:-translate-y-0.5 cursor-grab flex items-center gap-3 shadow-sm transition-all">
              <div className="text-xl">🔴</div>
              <div className="text-sm font-medium">结束：完成/拒绝</div>
            </div>
          </div>
        </div>

        {/* Right Flow Canvas */}
        <div className="flex-1 bg-card border border-border-light rounded-xl shadow-sm flex flex-col relative overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] bg-white">

          {/* Canvas Header */}
          <div className="absolute top-0 left-0 right-0 p-5 flex items-center justify-between pointer-events-none z-10">
            <div>
              <h2 className="text-xl font-black text-text-main flex items-center gap-2">
                {currentTemplate.title}
                <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full ml-2 ${activeTab === 'new' ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-success/10 border border-success/20 text-success'}`}>
                  {activeTab !== 'new' && <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>}
                  {currentTemplate.status}
                </span>
              </h2>
              <div className="text-xs font-semibold text-text-muted mt-1 pointer-events-auto cursor-pointer hover:underline">
                适用于：全公司所有部门 · ID: {currentTemplate.id}
              </div>
            </div>
            <div className="flex gap-2 pointer-events-auto">
              <button className="btn btn-ghost !py-1.5 bg-white border border-border-light shadow-sm text-text-main hover:text-primary">历史版本</button>
              <button className="btn btn-primary !py-1.5 shadow-sm">发布改动</button>
            </div>
          </div>

          {/* Canvas Body (Nodes Flow) */}
          <div className="flex-1 overflow-y-auto flex flex-col items-center pt-24 px-10 pb-10 pointer-events-auto">

            <div className="flex items-center w-full max-w-5xl justify-center relative mt-8 flex-wrap gap-y-16">
              {/* Connection Line Background (simplified for wrap, hidden in multi-row) */}
              <div className="absolute top-7 left-[5%] right-[5%] h-[2px] bg-border-dark -translate-y-1/2 z-0 hidden lg:block"></div>

              {currentTemplate.nodes.map((node, index) => (
                <React.Fragment key={index}>
                  {/* Node */}
                  <div className="relative z-10 flex flex-col items-center group cursor-pointer shrink-0 mx-2">
                    {node.isAI ? (
                      <div className="w-14 h-14 bg-primary/5 border-2 border-primary rounded-xl flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-transform group-hover:scale-110">
                        {node.icon}
                      </div>
                    ) : node.isCondition ? (
                      <div className="w-14 h-14 bg-white border-2 border-warning rounded-xl rotate-45 flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 group-hover:shadow-md">
                        <span className="-rotate-45 text-xl font-black text-warning">{node.icon}</span>
                      </div>
                    ) : node.isAdd ? (
                      <div className="w-14 h-14 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-2xl text-slate-400 shadow-sm transition-transform hover:bg-slate-100 group-hover:scale-110">
                        {node.icon}
                      </div>
                    ) : (
                      <div className="w-14 h-14 bg-white border-2 border-border-dark rounded-xl flex items-center justify-center text-2xl shadow-sm transition-transform group-hover:scale-110 group-hover:border-primary group-hover:shadow-md">
                        {node.icon}
                      </div>
                    )}

                    <div className={`${node.isCondition ? 'mt-5' : 'mt-3'} bg-white px-3 py-1 rounded shadow-sm text-sm font-bold whitespace-nowrap relative border ${node.isAI ? 'bg-primary text-white border-primary shadow-md' : 'border-border-light text-text-main bg-opacity-90'}`}>
                      {node.title}
                      {/* Active Indicator Pulse for AI */}
                      {node.isAI && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-text-muted mt-1 max-w-[100px] text-center truncate">{node.desc}</div>
                  </div>

                  {/* Arrow (hide for last item) */}
                  {index < currentTemplate.nodes.length - 1 && (
                    <div className="relative z-10 text-border-dark text-xl font-bold bg-white w-6 h-6 flex items-center justify-center rounded-full mx-2 mt-4 lg:mt-0 lg:self-start lg:translate-y-4">➔</div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* AI Node Config Panel */}
            {currentTemplate.aiRules.length > 0 && (
              <div className="mt-16 bg-blue-50/80 border border-primary/20 rounded-xl p-5 w-full max-w-[800px] shadow-sm relative overflow-hidden backdrop-blur-sm pointer-events-auto">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10"></div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">⚙️</span>
                  <h3 className="text-sm font-bold text-primary">🤖 AI 节点配置 · 自动审核规则 (Agent Skills)</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {currentTemplate.aiRules.map((rule, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-primary/10 shadow-sm transition-colors hover:border-primary/30">
                      <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-sm shrink-0">✓</div>
                      <div className="text-sm font-bold text-text-main truncate" title={rule}>{rule}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-primary/10 flex justify-between items-center text-xs">
                  <span className="text-text-muted">当检测出异常或超过设定阈值时，自动触发后置的人工审核分支。</span>
                  <button className="text-primary font-bold hover:underline">自定义编辑规则 →</button>
                </div>
              </div>
            )}

            {/* Bottom Stats Widget */}
            {activeTab !== 'new' && (
              <div className="mt-12 mb-4 w-full max-w-[800px] bg-white border border-border-light rounded-xl shadow-sm p-5 pointer-events-auto shrink-0">
                <div className="text-sm font-bold text-text-main mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-4 bg-primary rounded-full"></span>
                    本月流程统计
                  </div>
                  <span className="text-xs text-text-muted">实时更新</span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-bg-main p-3 rounded-lg border border-border-light">
                    <div className="text-xs text-text-muted mb-1 font-semibold">已完成</div>
                    <div className="text-2xl font-black text-text-main">{currentTemplate.stats.completed}</div>
                  </div>
                  <div className="bg-primary/5 p-3 rounded-lg border border-primary/20">
                    <div className="text-xs text-primary mb-1 font-bold">审批中</div>
                    <div className="text-2xl font-black text-primary">{currentTemplate.stats.pending}</div>
                  </div>
                  <div className="bg-danger/5 p-3 rounded-lg border border-danger/20">
                    <div className="text-xs text-danger mb-1 font-bold">已拒绝</div>
                    <div className="text-2xl font-black text-danger">{currentTemplate.stats.rejected}</div>
                  </div>
                  <div className="bg-purple-500/5 p-3 rounded-lg border border-purple-500/20">
                    <div className="text-xs text-purple-600 mb-1 font-bold">平均耗时</div>
                    <div className="text-2xl font-black text-purple-600 flex items-baseline gap-1">{currentTemplate.stats.time} <span className="text-sm font-bold text-purple-500">h</span></div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
