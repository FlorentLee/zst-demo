"use client";

import React, { useState, useRef, useEffect } from 'react';
import { analyzeInvoice, deleteLedgerItem, updateLedgerItem } from '@/lib/api';
import { useLedgerStore } from '@/store/ledgerStore';

export interface InvoiceAnalyzeResponse {
  id?: string;
  invoice_type: string;
  invoice_number: string;
  invoice_date?: string;
  amount: number;
  compliance_score: number;
  risk_warning?: string;
}

const initialMocks: InvoiceAnalyzeResponse[] = [
  {
    id: 'mock-1',
    invoice_type: '增值税专用发票 · 北京联通科技',
    amount: 84600.00,
    invoice_number: '0123456789',
    invoice_date: '2024-12-18',
    compliance_score: 99.8,
  },
  {
    id: 'mock-2',
    invoice_type: '差旅费用报销单 · 张建国',
    amount: 3280.00,
    invoice_number: 'EXP-2024-2018',
    invoice_date: '2024-12-17',
    compliance_score: 85,
    risk_warning: 'AI预警：餐饮费疑似超标，建议人工复核'
  },
  {
    id: 'mock-3',
    invoice_type: '增值税普通发票 · 上海云端科技',
    amount: 128000.00,
    invoice_number: '9876543210',
    invoice_date: '2024-12-16',
    compliance_score: 100,
  },
  {
    id: 'mock-4',
    invoice_type: '增值税专用发票 · 广州美林印刷',
    amount: 42800.00,
    invoice_number: '1122334455',
    invoice_date: '2024-12-15',
    compliance_score: 75,
    risk_warning: '风险拦截：与账簿数据不符，差异 ¥12,400'
  }
];

export default function InvoiceScreen() {
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { ledgerItems, fetchLedger } = useLedgerStore();
  const [results, setResults] = useState<InvoiceAnalyzeResponse[]>([]);

  // Edit Modal State
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<InvoiceAnalyzeResponse | null>(null);

  useEffect(() => {
    const items = ledgerItems;
    if (items.length > 0) {
      const mapped = items.map((item: any) => ({
        id: item.id.toString(),
        invoice_type: item.invoice_type || '未知类型',
        invoice_number: item.invoice_number || '未知',
        invoice_date: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : '未知',
        amount: item.total_amount ?? item.amount ?? 0,
        compliance_score: item.compliance_score ?? 0,
        risk_warning: item.risk_warning,
      }));
      setResults(mapped);
    } else {
      setResults(initialMocks);
    }
  }, [ledgerItems]);

  const handleUpload = async (file: File) => {
    setAnalyzing(true);
    setStatusMessage(null);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return 95;
        return prev + Math.random() * 15;
      });
    }, 500);

    try {
      const formData = new FormData();
      formData.append("file", file);
      await analyzeInvoice(formData);

      await fetchLedger();

      setProgress(100);
      setStatusMessage({ type: 'success', text: 'AI解析并入账完毕! 已同步至最新列表。' });
    } catch (e) {
      setStatusMessage({ type: 'error', text: '解析失败，请检查服务日志。' });
    } finally {
      clearInterval(interval);
      setAnalyzing(false);
    }
  };

  const onZoneClick = () => {
    fileInputRef.current?.click();
  };

  const openEditModal = (idx: number) => {
    setEditingIndex(idx);
    setEditForm({ ...results[idx] });
  };

  const closeEditModal = () => {
    setEditingIndex(null);
    setEditForm(null);
  };

  const handleSaveEdit = async () => {
    if (editingIndex !== null && editForm) {
      const targetId = editForm.id;
      if (targetId && targetId.startsWith('mock-')) {
        // Mock data: just update local state
        const newResults = [...results];
        newResults[editingIndex] = editForm;
        setResults(newResults);
      } else if (targetId) {
        // Real data: call API
        try {
          await updateLedgerItem(Number(targetId), {
            invoice_number: editForm.invoice_number,
            invoice_type: editForm.invoice_type,
            total_amount: editForm.amount,
            compliance_score: editForm.compliance_score,
            risk_warning: editForm.risk_warning,
          });
          await fetchLedger();
        } catch (error) {
          console.error('Failed to update ledger item', error);
          alert('更新失败，请稍后重试');
        }
      }
      closeEditModal();
    }
  };

  const handleDelete = async (idx: number) => {
    if (confirm('确认删除该记录吗？')) {
      const item = results[idx];
      const targetId = item.id;
      if (targetId && targetId.startsWith('mock-')) {
        // Mock data: just remove from local state
        const newResults = [...results];
        newResults.splice(idx, 1);
        setResults(newResults);
      } else if (targetId) {
        // Real data: call API
        try {
          await deleteLedgerItem(Number(targetId));
          await fetchLedger();
        } catch (error) {
          console.error('Failed to delete ledger item', error);
          alert('删除失败，请稍后重试');
        }
      }
    }
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
        </div>
      </div>

      {/* AI Processing Banner */}
      {analyzing && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></span>
            <span className="text-primary font-bold text-sm">Gemini大模型校验和RAG合规审计中...</span>
          </div>
          <div className="h-1.5 bg-bg-main rounded-full overflow-hidden w-full relative">
            <div
              className="absolute top-0 bottom-0 left-0 bg-primary rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(37,99,235,0.6)]"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Status Message */}
      {statusMessage && !analyzing && (
        <div className={`border rounded-lg p-4 mb-6 flex items-center gap-2 shadow-sm ${statusMessage.type === 'success' ? 'bg-success/5 border-success/20 text-success' : 'bg-danger/5 border-danger/20 text-danger'}`}>
          <span>{statusMessage.type === 'success' ? '✅' : '❌'}</span>
          <span className="font-bold text-sm">{statusMessage.text}</span>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {results.map((r, idx) => {
          const hasRisk = r.risk_warning && r.risk_warning.length > 0;
          return (
            <div key={r.id || idx} className={`bg-card border rounded-xl p-5 flex flex-col shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group ${hasRisk ? 'border-danger/30 hover:border-danger' : 'border-border-light hover:border-primary'}`}>
              <div className="flex gap-4 items-start">
                <div className={`w-14 h-16 rounded-lg flex items-center justify-center text-2xl shrink-0 ${hasRisk ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'}`}>
                  🧾
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-sm font-bold text-text-main truncate transition-colors">{r.invoice_type || '智能识别票据'}</div>
                    <div className={`text-lg font-black shrink-0 ${hasRisk ? 'text-danger' : 'text-text-main'}`}>¥ {Number(r.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                  <div className="text-[11px] text-text-muted mb-3 font-mono">流水/发票号：{r.invoice_number || '解析无编号'} · {r.invoice_date || '无日期'}</div>

                  {hasRisk ? (
                    <div className="py-2 px-3 bg-danger/5 border border-danger/20 rounded-md text-[11px] text-danger flex gap-1.5 items-start">
                      <span className="shrink-0 mt-0.5">⚠️</span>
                      <span className="leading-snug">{r.risk_warning}</span>
                    </div>
                  ) : (
                    <div className="py-2 px-3 bg-success/5 border border-success/20 rounded-md text-[11px] text-success flex gap-1.5 items-center font-medium">
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-success"></span> AI 校验合规 · 准确率 {r.compliance_score || 100}% · 已验真
                    </div>
                  )}
                </div>
              </div>

              {/* Action Bar (Visible on Hover) */}
              <div className="border-t border-border-light pt-2 mt-3 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEditModal(idx)} className="text-xs px-3 py-1.5 font-bold text-primary bg-primary/5 hover:bg-primary/15 rounded border border-transparent hover:border-primary/20 transition-colors">
                  编辑修改
                </button>
                <button onClick={() => handleDelete(idx)} className="text-xs px-3 py-1.5 font-bold text-danger bg-danger/5 hover:bg-danger/15 rounded border border-transparent hover:border-danger/20 transition-colors">
                  移除记录
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Edit Modal */}
      {editingIndex !== null && editForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-text-main mb-4">编辑票据信息</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-text-main mb-1">票据类型及抬头</label>
                <input
                  type="text"
                  className="w-full border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  value={editForm.invoice_type}
                  onChange={(e) => setEditForm({ ...editForm, invoice_type: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-text-main mb-1">金额 (¥)</label>
                <input
                  type="number"
                  className="w-full border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  value={editForm.amount}
                  onChange={(e) => setEditForm({ ...editForm, amount: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-text-main mb-1">流水/发票号</label>
                <input
                  type="text"
                  className="w-full border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  value={editForm.invoice_number}
                  onChange={(e) => setEditForm({ ...editForm, invoice_number: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-text-main mb-1">日期</label>
                <input
                  type="text"
                  className="w-full border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  value={editForm.invoice_date || ''}
                  onChange={(e) => setEditForm({ ...editForm, invoice_date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-text-main mb-1">预警信息（为空则无风险）</label>
                <input
                  type="text"
                  className="w-full border border-border-light rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  value={editForm.risk_warning || ''}
                  onChange={(e) => setEditForm({ ...editForm, risk_warning: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 text-sm font-bold text-text-muted bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSaveEdit}
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
