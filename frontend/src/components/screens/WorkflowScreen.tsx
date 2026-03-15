"use client";

import React, { useState } from 'react';

type FlowTemplate = 'expense' | 'contract' | 'invoice' | 'new';

interface FlowNode {
  id?: string;
  icon: string;
  title: string;
  desc: string;
  isAI?: boolean;
  isCondition?: boolean;
  isAdd?: boolean;
}

export interface AIRule {
  name: string;
  prompt: string;
}

interface FlowTemplateData {
  title: string;
  id: string;
  status: string;
  nodes: FlowNode[];
  aiRules: AIRule[];
  stats: { completed: number; pending: number; rejected: number; time: string };
}

const PALETTE_NODES: FlowNode[] = [
  { icon: '🟢', title: '触发：提交申请', desc: '起点节点' },
  { icon: '🤖', title: 'AI预审', desc: '智能审核', isAI: true },
  { icon: '👤', title: '人工审核', desc: '人工干预' },
  { icon: '📊', title: '条件分支', desc: '规则判断', isCondition: true },
  { icon: '📧', title: '消息通知', desc: '发送提醒' },
  { icon: '📒', title: '自动入账', desc: '执行动作' },
  { icon: '🔴', title: '结束流程', desc: '终点节点' }
];

export default function WorkflowScreen() {
  const [activeTab, setActiveTab] = useState<FlowTemplate>('expense');
  const [templates, setTemplates] = useState<Record<FlowTemplate, FlowTemplateData>>({
    expense: {
      title: '费用报销审批流',
      id: 'WF-EXP-001',
      status: '运行中',
      nodes: [
        { id: 'n1', icon: '🟢', title: '员工提交', desc: '填写报销单' },
        { id: 'n2', icon: '🤖', title: 'AI预审', desc: '票据验真·合规检查', isAI: true },
        { id: 'n3', icon: '📊', title: '金额判断', desc: '≤5000元 / >5000元', isCondition: true },
        { id: 'n4', icon: '👤', title: '主管审批', desc: '部门负责人' },
        { id: 'n5', icon: '👤', title: '财务审核', desc: 'CFO · >5000元' },
        { id: 'n6', icon: '📒', title: '自动入账', desc: '生成凭证' },
      ],
      aiRules: [
        { name: '发票真伪验证（国税API）', prompt: '提取发票代码、号码、日期、校验码，调用国税总局API核验真伪，并输出校验结果日志。' },
        { name: '发票查重（历史比对）', prompt: '在发票数据库中检索该发票代码和号码，确保此发票未被报销过。' },
        { name: '费用类型合规检查', prompt: '对比报销明细和发票类目，检查是否符合公司费用报销制度的类目规定。' },
        { name: '餐饮/差旅限额判断', prompt: '根据报销人职级，判断餐饮费（不超过200元/人/天）及住宿费是否超标。' },
        { name: '供应商黑名单比对', prompt: '查询财务系统的供应商黑名单库，确认开票方不在黑名单中。' },
        { name: '异常金额智能标记', prompt: '检查报销金额是否符合历史平均水平，对异常高频或整百整千金额标记风险。' }
      ],
      stats: { completed: 284, pending: 12, rejected: 3, time: '4.2' }
    },
    contract: {
      title: '合同审批流',
      id: 'WF-CON-002',
      status: '运行中',
      nodes: [
        { id: 'c1', icon: '🟢', title: '业务提交', desc: '上传合同草案' },
        { id: 'c2', icon: '🤖', title: 'AI法务审核', desc: '条款风险/主客体校验', isAI: true },
        { id: 'c3', icon: '📊', title: '条件分支', desc: '常规/重大合同', isCondition: true },
        { id: 'c4', icon: '👤', title: '法务复核', desc: '重大合同' },
        { id: 'c5', icon: '👤', title: '业务总监', desc: '签批' },
        { id: 'c6', icon: '📒', title: '自动动作', desc: '归档&盖章' },
      ],
      aiRules: [
        { name: '合同主体工商信息核验', prompt: '根据合同中的公司名称，查询企查查/天眼查API获取最新工商信息并比对。' },
        { name: '违约责任条款完整性检查', prompt: '扫描合同全文，检查是否包含明确的违约责任定义及违约金比例。' },
        { name: '支付条款合规性评估', prompt: '核查付款节点设置是否合理（例如：首付款不超过30%），是否包含付款前提条件。' },
        { name: '知识产权归属风险提示', prompt: '检查外包/采购合同中的知识产权条款，确保定制开发成果归本公司所有。' },
        { name: '历史违约记录比对', prompt: '检索公司法务系统，查询对方公司过往是否存在诉讼或违约记录。' }
      ],
      stats: { completed: 156, pending: 8, rejected: 1, time: '8.5' }
    },
    invoice: {
      title: '发票审核流',
      id: 'WF-INV-003',
      status: '运行中',
      nodes: [
        { id: 'i1', icon: '🟢', title: '供应商提交', desc: '上传发票' },
        { id: 'i2', icon: '🤖', title: 'AI预审', desc: '票面信息提取&验真', isAI: true },
        { id: 'i3', icon: '📊', title: '匹配订单', desc: '与采购订单比对', isCondition: true },
        { id: 'i4', icon: '👤', title: '采购确认', desc: '差异复核' },
        { id: 'i5', icon: '📒', title: '自动动作', desc: '进入付款池' },
      ],
      aiRules: [
        { name: '购买方/销售方信息校验', prompt: '提取发票上的购方抬头和税号，确保与本公司的全称和统一社会信用代码完全一致。' },
        { name: '发票号码防伪核验', prompt: '校验发票的密码区格式及防伪特征，并联网验证密码区。' },
        { name: '价税合计金额计算核对', prompt: '基于金额和税率，重新计算税额及价税合计，误差不超过0.06元。' },
        { name: '采购订单物料自动匹配', prompt: '提取发票明细的商品名称和数量，与ERP系统中的关联采购订单（PO）进行比对。' },
        { name: '开票日期时效性检查', prompt: '检查发票开具日期是否超出公司规定的报销期限（例如：是否超过6个月）。' }
      ],
      stats: { completed: 892, pending: 45, rejected: 18, time: '1.2' }
    },
    new: {
      title: '自定义新流程',
      id: 'WF-NEW-000',
      status: '草稿',
      nodes: [
        { id: 'new1', icon: '🟢', title: '触发器', desc: '请选择触发条件' },
        { id: 'new2', icon: '➕', title: '添加节点', desc: '拖拽左侧节点到此', isAdd: true },
      ],
      aiRules: [],
      stats: { completed: 0, pending: 0, rejected: 0, time: '0.0' }
    }
  });

  const [draggedItem, setDraggedItem] = useState<{ type: 'palette' | 'node', index?: number, node: FlowNode } | null>(null);

  // --- Rule Editor States ---
  const [editingRuleIndex, setEditingRuleIndex] = useState<number | null>(null);
  const [isAddingRule, setIsAddingRule] = useState(false);
  const [tempRule, setTempRule] = useState<AIRule>({ name: '', prompt: '' });

  // --- Drag and Drop Logic ---
  const handleDragStart = (e: React.DragEvent, type: 'palette' | 'node', node: FlowNode, index?: number) => {
    setDraggedItem({ type, index, node });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const currentNodes = [...templates[activeTab].nodes];
    const newNode = { ...draggedItem.node, id: `node-${Date.now()}` };

    if (draggedItem.type === 'palette') {
      if (currentNodes[dropIndex]?.isAdd) {
        currentNodes.splice(dropIndex, 0, newNode);
      } else {
        currentNodes.splice(dropIndex, 0, newNode);
      }
    } else if (draggedItem.type === 'node' && draggedItem.index !== undefined) {
      const dragIndex = draggedItem.index;
      if (dragIndex === dropIndex) return;

      currentNodes.splice(dragIndex, 1);
      const actualDropIndex = dragIndex < dropIndex ? dropIndex - 1 : dropIndex;
      currentNodes.splice(actualDropIndex, 0, draggedItem.node);
    }

    setTemplates(prev => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], nodes: currentNodes }
    }));
    setDraggedItem(null);
  };

  const removeNode = (index: number) => {
    const currentNodes = [...templates[activeTab].nodes];
    if (!currentNodes[index].isAdd) {
      currentNodes.splice(index, 1);
      setTemplates(prev => ({
        ...prev,
        [activeTab]: { ...prev[activeTab], nodes: currentNodes }
      }));
    }
  };

  const saveChanges = () => {
    alert(`工作流 [${templates[activeTab].title}] 保存成功！\n共包含 ${templates[activeTab].nodes.filter(n => !n.isAdd).length} 个节点。`);
  };

  // --- Rule Editor Actions ---
  const openEditRule = (index: number) => {
    setEditingRuleIndex(index);
    setTempRule({ ...templates[activeTab].aiRules[index] });
    setIsAddingRule(false);
  };

  const openAddRule = () => {
    setEditingRuleIndex(null);
    setTempRule({ name: '', prompt: '' });
    setIsAddingRule(true);
  };

  const saveRule = () => {
    if (!tempRule.name.trim() || !tempRule.prompt.trim()) return;
    setTemplates(prev => {
      const newRules = [...prev[activeTab].aiRules];
      if (isAddingRule) {
        newRules.push(tempRule);
      } else if (editingRuleIndex !== null) {
        newRules[editingRuleIndex] = tempRule;
      }
      return {
        ...prev,
        [activeTab]: { ...prev[activeTab], aiRules: newRules }
      };
    });
    setEditingRuleIndex(null);
    setIsAddingRule(false);
  };

  const deleteRule = (index: number) => {
    setTemplates(prev => {
      const newRules = [...prev[activeTab].aiRules];
      newRules.splice(index, 1);
      return {
        ...prev,
        [activeTab]: { ...prev[activeTab], aiRules: newRules }
      };
    });
  };

  const cancelRuleEdit = () => {
    setEditingRuleIndex(null);
    setIsAddingRule(false);
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
            {PALETTE_NODES.map((node, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, 'palette', node)}
                className="bg-white text-slate-700 p-3 rounded-lg border border-slate-200 hover:border-slate-400 hover:shadow-md hover:-translate-y-0.5 cursor-grab flex items-center gap-3 shadow-sm transition-all active:cursor-grabbing"
              >
                <div className="text-xl">{node.icon}</div>
                <div className="text-sm font-medium">{node.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Flow Canvas */}
        <div className="flex-1 bg-card border border-border-light rounded-xl shadow-sm flex flex-col relative overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] bg-white">
          {/* Canvas Header */}
          <div className="p-5 flex items-center justify-between z-10 bg-white/80 backdrop-blur-sm border-b border-border-light shrink-0">
            <div>
              <h2 className="text-xl font-black text-text-main flex items-center gap-2">
                {currentTemplate.title}
                <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full ml-2 ${activeTab === 'new' ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-success/10 border border-success/20 text-success'}`}>
                  {activeTab !== 'new' && <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>}
                  {currentTemplate.status}
                </span>
              </h2>
              <div className="text-xs font-semibold text-text-muted mt-1 cursor-pointer hover:underline">
                适用于：全公司所有部门 · ID: {currentTemplate.id}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-ghost !py-1.5 bg-white border border-border-light shadow-sm text-text-main hover:text-primary">历史版本</button>
              <button onClick={saveChanges} className="btn btn-primary !py-1.5 shadow-sm">发布改动</button>
            </div>
          </div>

          {/* Canvas Body (Nodes Flow) */}
          <div className="flex-1 overflow-y-auto flex flex-col items-center pt-8 px-10 pb-10 relative">
            <div className="flex items-center w-full max-w-5xl justify-center relative mt-8 flex-wrap gap-y-16">
              {/* Connection Line Background */}
              <div className="absolute top-7 left-[5%] right-[5%] h-[2px] bg-border-dark -translate-y-1/2 z-0 hidden lg:block"></div>

              {currentTemplate.nodes.map((node, index) => (
                <React.Fragment key={node.id || index}>
                  {/* Drop zone before node */}
                  <div
                    className="w-10 h-full min-h-[100px] flex items-center justify-center -mx-2 z-20 group/drop"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <div className="w-1 h-full bg-primary/0 group-hover/drop:bg-primary/50 transition-colors rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-primary text-white text-lg flex items-center justify-center opacity-0 group-hover/drop:opacity-100 scale-50 group-hover/drop:scale-100 transition-all shadow-md">
                        +
                      </div>
                    </div>
                  </div>

                  {/* Node */}
                  <div
                    className={`relative z-10 flex flex-col items-center group cursor-grab active:cursor-grabbing shrink-0 ${draggedItem?.node.id === node.id ? 'opacity-50' : ''}`}
                    draggable={!node.isAdd}
                    onDragStart={(e) => !node.isAdd && handleDragStart(e, 'node', node, index)}
                  >
                    {!node.isAdd && index !== 0 && (
                      <button
                        onClick={() => removeNode(index)}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-danger text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:scale-110 shadow-sm"
                        title="删除节点"
                      >
                        ×
                      </button>
                    )}

                    {node.isCondition ? (
                      <div className="w-14 h-14 bg-white border-2 border-warning rounded-xl rotate-45 flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 group-hover:shadow-md">
                        <span className="-rotate-45 text-xl font-black text-warning">{node.icon}</span>
                      </div>
                    ) : node.isAdd ? (
                      <div
                        className="w-14 h-14 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-2xl text-slate-400 shadow-sm transition-all hover:bg-slate-100 hover:border-primary hover:text-primary"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                      >
                        {node.icon}
                      </div>
                    ) : (
                      <div className="w-14 h-14 bg-white border-2 border-border-dark rounded-xl flex items-center justify-center text-2xl shadow-sm transition-transform group-hover:scale-110 group-hover:border-primary group-hover:shadow-md">
                        {node.icon}
                      </div>
                    )}

                    <div className={`${node.isCondition ? 'mt-5' : 'mt-3'} bg-white px-3 py-1 rounded shadow-sm text-sm font-bold whitespace-nowrap relative border border-border-light text-text-main bg-opacity-90`}>
                      {node.title}
                    </div>
                    <div className="text-xs text-text-muted mt-1 max-w-[100px] text-center truncate">{node.desc}</div>
                  </div>

                  {/* Arrow (hide for last item) */}
                  {index < currentTemplate.nodes.length - 1 && (
                    <div className="relative z-10 text-border-dark text-xl font-bold bg-white w-6 h-6 flex items-center justify-center rounded-full mt-4 lg:mt-0 lg:self-start lg:translate-y-4 pointer-events-none">➔</div>
                  )}
                </React.Fragment>
              ))}

              {/* Drop zone after last node */}
              <div
                className="w-10 h-full min-h-[100px] flex items-center justify-center -mx-2 z-20 group/drop"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, currentTemplate.nodes.length)}
              >
                <div className="w-1 h-full bg-primary/0 group-hover/drop:bg-primary/50 transition-colors rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-primary text-white text-lg flex items-center justify-center opacity-0 group-hover/drop:opacity-100 scale-50 group-hover/drop:scale-100 transition-all shadow-md">
                    +
                  </div>
                </div>
              </div>
            </div>

            {/* AI Node Config Panel */}
            <div className="mt-16 bg-blue-50/80 border border-primary/20 rounded-xl p-5 w-full max-w-4xl shadow-sm relative overflow-hidden backdrop-blur-sm pointer-events-auto flex flex-col min-h-[250px] max-h-[600px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10"></div>

              <div className="flex items-center gap-2 mb-4 shrink-0">
                <span className="text-xl">⚙️</span>
                <h3 className="text-sm font-bold text-primary">🤖 AI 节点配置 · 自动审核规则 (Agent Skills)</h3>
              </div>

              <div className="overflow-y-auto pr-2 flex-1 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentTemplate.aiRules.map((rule, idx) => (
                    <div key={idx} className="flex flex-col p-4 bg-white rounded-lg border border-primary/10 shadow-sm transition-colors hover:border-primary/30 group">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center text-sm shrink-0">✓</div>
                        <div className="text-sm font-bold text-text-main flex-1 whitespace-normal break-words" title={rule.name}>{rule.name}</div>
                        <button onClick={() => openEditRule(idx)} className="text-text-muted hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity p-1" title="编辑规则">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button onClick={() => deleteRule(idx)} className="text-text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity p-1" title="删除规则">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                        </button>
                      </div>
                      <div className="mt-3 text-xs text-text-muted bg-slate-50 p-2 rounded border border-border-light whitespace-pre-wrap break-words leading-relaxed">
                        <span className="font-semibold text-primary/70 mr-1 block mb-1">Prompt / Skill:</span>
                        {rule.prompt}
                      </div>
                    </div>
                  ))}
                  <div onClick={openAddRule} className="flex flex-col items-center justify-center gap-2 p-4 bg-white/50 border border-dashed border-primary/30 rounded-lg text-primary/70 hover:bg-white hover:text-primary hover:border-primary/50 cursor-pointer transition-all min-h-[120px]">
                    <span className="text-2xl">+</span>
                    <span className="text-sm font-bold">添加新规则 (Agent Skill)</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-primary/10 flex justify-between items-center text-xs shrink-0">
                <span className="text-text-muted">当检测出异常或超过设定阈值时，自动触发后置的人工审核分支。</span>
              </div>
            </div>

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

      {/* Rule Edit Modal */}
      {(isAddingRule || editingRuleIndex !== null) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
            <h3 className="text-lg font-bold text-text-main mb-4">
              {isAddingRule ? '添加 AI 规则 (Agent Skill)' : '编辑 AI 规则 (Agent Skill)'}
            </h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-text-main mb-1">规则名称</label>
                <input
                  type="text"
                  className="w-full border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  placeholder="例如：发票真伪验证"
                  value={tempRule.name}
                  onChange={(e) => setTempRule({ ...tempRule, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-text-main mb-1">Prompt / 技能配置</label>
                <textarea
                  className="w-full border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary h-32 resize-none"
                  placeholder="描述 Agent 该如何执行这个检查，例如系统指令、判断标准等..."
                  value={tempRule.prompt}
                  onChange={(e) => setTempRule({ ...tempRule, prompt: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={cancelRuleEdit}
                className="px-4 py-2 text-sm font-bold text-text-muted bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={saveRule}
                className="px-4 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
