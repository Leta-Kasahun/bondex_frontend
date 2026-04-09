// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../componenets/ui/select";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  return (
    <div className="flex min-h-screen bg-background font-sans">
      {/* SIDEBAR - Using CSS variables */}
      <aside
        className={`bg-sidebar border-r border-sidebar-border flex-shrink-0 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded"></div>
              <span className="font-heading font-bold text-lg text-foreground">Bondex</span>
            </div>
          )}
          {!isSidebarOpen && (
            <div className="w-6 h-6 bg-primary rounded mx-auto"></div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-muted-foreground hover:text-sidebar-primary transition-colors"
          >
            {isSidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {/* Active Item - Using sidebar-primary from your config */}
          <div
            className={`bg-sidebar-primary text-sidebar-primary-foreground rounded-sidebar flex items-center gap-3 px-4 py-3 relative ${
              !isSidebarOpen && "justify-center"
            }`}
          >
            <span>📊</span>
            {isSidebarOpen && <span>Dashboard</span>}
            {isSidebarOpen && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-sidebar-primary rounded-r-full"></div>
            )}
          </div>

          {/* Sidebar items with YOUR brand hover */}
          {[
            { icon: "👥", label: "Leads" },
            { icon: "💰", label: "Deals" },
            { icon: "🔔", label: "Notifications" },
            { icon: "⚙️", label: "Settings" },
          ].map((item) => (
            <div
              key={item.label}
              className={`text-sidebar-foreground hover:bg-sidebar-accent rounded-sidebar flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer ${
                !isSidebarOpen && "justify-center"
              }`}
            >
              <span className="text-muted-foreground">{item.icon}</span>
              {isSidebarOpen && <span>{item.label}</span>}
            </div>
          ))}

          <div className="border-t border-border my-3"></div>

          <div
            className={`text-sidebar-foreground hover:bg-sidebar-accent rounded-sidebar flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer ${
              !isSidebarOpen && "justify-center"
            }`}
          >
            <span className="text-muted-foreground">🚪</span>
            {isSidebarOpen && <span>Logout</span>}
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6">
        {/* Glassmorphism Navbar ONLY - Using CSS variables */}
        <div className="bg-white/60 backdrop-blur-md rounded-card shadow-lg border border-white/30 p-4 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Good morning, John</h1>
            <p className="text-muted-foreground text-sm font-amharic" lang="am">
              እንኳን ደህና መጡ ወደ Bondex CRM
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="text-xl">🔔</span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">3</span>
            </div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">JD</div>
          </div>
        </div>

        {/* Stats Cards - Solid white with shadow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-card p-6 shadow-card border border-border hover:shadow-card-hover transition-all">
            <p className="text-secondary text-sm">Total Leads</p>
            <p className="text-3xl font-bold text-foreground mt-2">45</p>
            <span className="text-muted-foreground text-sm">↑ 12% this week</span>
          </div>
          <div className="bg-card rounded-card p-6 shadow-card border border-border hover:shadow-card-hover transition-all">
            <p className="text-secondary text-sm">Active Deals</p>
            <p className="text-3xl font-bold text-foreground mt-2">12</p>
            <span className="text-muted-foreground text-sm">↑ 3 new</span>
          </div>
          <div className="bg-card rounded-card p-6 shadow-card border border-border hover:shadow-card-hover transition-all">
            <p className="text-secondary text-sm">Won Deals</p>
            <p className="text-3xl font-bold text-foreground mt-2">8</p>
            <span className="text-muted-foreground text-sm">66% win rate</span>
          </div>
        </div>

        {/* Filters Row */}
        <div className="bg-card rounded-card shadow-card border border-border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-secondary text-sm mb-1">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full border-border rounded-lg bg-card hover:bg-muted transition-all focus:ring-2 focus:ring-ring">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-card border border-border rounded-lg shadow-lg">
                  <SelectItem value="new" className="hover:bg-muted cursor-pointer">New</SelectItem>
                  <SelectItem value="contacted" className="hover:bg-muted cursor-pointer">Contacted</SelectItem>
                  <SelectItem value="converted" className="hover:bg-muted cursor-pointer">Converted</SelectItem>
                  <SelectItem value="ignored" className="hover:bg-muted cursor-pointer">Ignored</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-secondary text-sm mb-1">Priority</label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full border-border rounded-lg bg-card hover:bg-muted transition-all focus:ring-2 focus:ring-ring">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent className="bg-card border border-border rounded-lg shadow-lg">
                  <SelectItem value="high" className="hover:bg-muted cursor-pointer">High</SelectItem>
                  <SelectItem value="medium" className="hover:bg-muted cursor-pointer">Medium</SelectItem>
                  <SelectItem value="low" className="hover:bg-muted cursor-pointer">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-secondary text-sm mb-1">Search</label>
              <input
                type="text"
                placeholder="Search leads..."
                className="w-full px-4 py-2 border border-border rounded-lg text-foreground placeholder:text-muted-foreground bg-card transition-all hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              />
            </div>
          </div>
        </div>

        {/* Lead Priority Badges */}
        <div className="bg-card rounded-card shadow-card border border-border p-6 mb-8">
          <h3 className="font-heading font-semibold text-foreground mb-4">Lead Priority Examples</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-card rounded-lg border border-border hover:bg-muted transition-colors">
              <span className="text-foreground">Alemu Tesfaye - "Need a 2BR house"</span>
              <span className="badge-high">High Priority</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-card rounded-lg border border-border hover:bg-muted transition-colors">
              <span className="text-foreground">Tigist Bekele - "How much is the price?"</span>
              <span className="badge-medium">Medium Priority</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-card rounded-lg border border-border hover:bg-muted transition-colors">
              <span className="text-foreground">Helen Desta - "Just looking"</span>
              <span className="badge-low">Low Priority</span>
            </div>
          </div>
        </div>

        {/* Lead Status Badges */}
        <div className="bg-card rounded-card shadow-card border border-border p-6 mb-8">
          <h3 className="font-heading font-semibold text-foreground mb-4">Lead Status Examples</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-card rounded-lg border border-border hover:bg-muted transition-colors">
              <div>
                <span className="text-foreground">Worku Molla - New lead from Telegram</span>
                <p className="text-muted-foreground text-xs font-amharic mt-1" lang="am">ከቴሌግራም አዲስ ደንበኛ</p>
              </div>
              <span className="badge-new">New</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-card rounded-lg border border-border hover:bg-muted transition-colors">
              <span className="text-foreground">Bontu Abera - Replied via email</span>
              <span className="badge-contacted">Contacted</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-card rounded-lg border border-border hover:bg-muted transition-colors">
              <div>
                <span className="text-foreground">Chala Desta - Signed contract</span>
                <p className="text-muted-foreground text-xs font-amharic mt-1" lang="am">ውል ተፈራርሟል</p>
              </div>
              <span className="badge-converted">Converted</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-card rounded-lg border border-border hover:bg-muted transition-colors">
              <span className="text-foreground">Unknown - No response</span>
              <span className="badge-ignored">Ignored</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-muted-foreground text-xs">✨ Converted uses brand blue at 10% opacity — clean celebration without introducing new colors</p>
          </div>
        </div>

        {/* Recent Leads Table */}
        <div className="bg-card rounded-card shadow-card border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="font-heading font-semibold text-foreground">Recent Leads</h3>
          </div>
          <div className="p-4 border-b border-border">
            <input
              type="text"
              placeholder="Search table..."
              className="w-full md:w-64 px-4 py-2 border border-border rounded-lg text-foreground placeholder:text-muted-foreground bg-card transition-all hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-secondary uppercase">Customer</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-secondary uppercase">Message</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-secondary uppercase">Priority</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-secondary uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { name: "Alemu Tesfaye", msg: "I need a 2 bedroom house", priority: "high", status: "new", amharic: "ባለ 2 መኝታ ቤት ያስፈልገኛል" },
                  { name: "Tigist Bekele", msg: "How much is the price?", priority: "medium", status: "contacted", amharic: "ዋጋው ስንት ነው?" },
                  { name: "Worku Molla", msg: "Do you have villas?", priority: "high", status: "converted", amharic: "ቪላ አለዎት?" },
                  { name: "Helen Desta", msg: "Just browsing", priority: "low", status: "ignored", amharic: "እያየሁ ነው" },
                ].map((lead, idx) => (
                  <tr key={idx} className="hover:bg-muted transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="text-sm text-foreground">{lead.name}</div>
                      <div className="text-xs text-muted-foreground font-amharic" lang="am">{lead.amharic}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{lead.msg}</td>
                    <td className="px-6 py-4">
                      {lead.priority === "high" && <span className="badge-high">High</span>}
                      {lead.priority === "medium" && <span className="badge-medium">Medium</span>}
                      {lead.priority === "low" && <span className="badge-low">Low</span>}
                    </td>
                    <td className="px-6 py-4">
                      {lead.status === "new" && <span className="badge-new">New</span>}
                      {lead.status === "contacted" && <span className="badge-contacted">Contacted</span>}
                      {lead.status === "converted" && <span className="badge-converted">Converted</span>}
                      {lead.status === "ignored" && <span className="badge-ignored">Ignored</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer - No glass */}
        <div className="mt-8 p-4 bg-card rounded-card shadow-card border border-border text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Bondex CRM. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs font-amharic mt-1" lang="am">
            መብቱ በህግ የተጠበቀ ነው።
          </p>
        </div>
      </main>
    </div>
  );
}