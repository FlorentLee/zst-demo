import React from 'react';

export default function SettingsScreen() {
  return (
    <div className="p-6 max-w-[1000px] mx-auto">
      <div className="bg-card border border-border-light shadow-sm rounded-xl overflow-hidden flex h-[600px]">
        {/* Settings Sidebar */}
        <div className="w-[200px] bg-bg-main border-r border-border-light p-4 flex flex-col gap-1">
          <div className="text-xs font-bold text-text-muted mb-2 px-3 uppercase tracking-wider">系统设置</div>
          <button className="text-left px-3 py-2 text-sm font-medium rounded-md bg-primary text-white shadow-sm">个人资料</button>
          <button className="text-left px-3 py-2 text-sm font-medium rounded-md text-text-muted hover:bg-white hover:text-text-main transition-colors">账号与安全</button>
          <button className="text-left px-3 py-2 text-sm font-medium rounded-md text-text-muted hover:bg-white hover:text-text-main transition-colors">企业信息</button>
          
          <div className="text-xs font-bold text-text-muted mt-4 mb-2 px-3 uppercase tracking-wider">高级配置</div>
          <button className="text-left px-3 py-2 text-sm font-medium rounded-md text-text-muted hover:bg-white hover:text-text-main transition-colors">权限与角色</button>
          <button className="text-left px-3 py-2 text-sm font-medium rounded-md text-text-muted hover:bg-white hover:text-text-main transition-colors flex justify-between items-center">
            接口集成 <span className="w-2 h-2 rounded-full bg-danger animate-pulse"></span>
          </button>
          <button className="text-left px-3 py-2 text-sm font-medium rounded-md text-text-muted hover:bg-white hover:text-text-main transition-colors">系统日志</button>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="mb-6 pb-4 border-b border-border-light">
            <h2 className="text-xl font-bold text-text-main">个人资料</h2>
            <p className="text-sm text-text-muted mt-1">管理您在智税通的企业名片与基本信息配置</p>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center text-2xl font-bold text-white shadow-md border-4 border-white">
              张总
            </div>
            <div>
              <button className="btn btn-ghost !py-1.5 !px-3 font-medium">更换头像</button>
              <p className="text-xs text-text-muted mt-2 max-w-[200px]">支持 JPG, PNG, GIF 格式。最大文件大小 5MB。</p>
            </div>
          </div>

          <div className="max-w-[500px] flex flex-col gap-5">
            <div>
              <label className="block text-sm font-semibold text-text-main mb-1.5">显示名称</label>
              <input type="text" defaultValue="张建国" className="w-full px-3 py-2 border border-border-dark rounded-md text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-medium text-text-main" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-text-main mb-1.5">登录邮箱 / 账号</label>
              <input type="email" defaultValue="zhang.jianguo@company.com" disabled className="w-full px-3 py-2 border border-border-light bg-bg-main rounded-md text-sm outline-none text-text-muted cursor-not-allowed" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-text-main mb-1.5">部门</label>
                <input type="text" defaultValue="财务部" className="w-full px-3 py-2 border border-border-dark rounded-md text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-medium text-text-main" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-main mb-1.5">职位</label>
                <input type="text" defaultValue="财务总监" className="w-full px-3 py-2 border border-border-dark rounded-md text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-medium text-text-main" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-main mb-1.5">系统偏好语言</label>
              <select className="w-full px-3 py-2 border border-border-dark rounded-md text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all font-medium text-text-main appearance-none bg-white">
                <option>简体中文</option>
                <option>English</option>
              </select>
            </div>
            
            <div className="mt-4 pt-5 border-t border-border-light flex gap-3">
              <button className="btn btn-primary">保存设置</button>
              <button className="btn btn-ghost">撤销更改</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
