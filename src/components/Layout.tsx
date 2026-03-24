import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { path: "/", label: "Главная", icon: "LayoutDashboard" },
  { path: "/matches", label: "Матчи", icon: "CalendarDays" },
  { path: "/predictions", label: "Прогнозы", icon: "TrendingUp" },
  { path: "/statistics", label: "Статистика", icon: "BarChart2" },
  { path: "/teams", label: "Команды", icon: "Shield" },
  { path: "/players", label: "Игроки", icon: "User" },
  { path: "/leagues", label: "Лиги", icon: "Trophy" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar */}
      <header className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-green rounded-sm flex items-center justify-center">
              <span className="text-background font-bold text-xs">FA</span>
            </div>
            <span className="font-semibold text-sm tracking-tight text-foreground">ФутболАналитик</span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors duration-150 ${
                    active
                      ? "text-green bg-green/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon name={item.icon} size={13} fallback="Circle" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile burger */}
          <button
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Icon name={mobileOpen ? "X" : "Menu"} size={18} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background px-4 py-2 animate-fade-in">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-2 py-2 rounded text-sm font-medium transition-colors ${
                    active ? "text-green" : "text-muted-foreground"
                  }`}
                >
                  <Icon name={item.icon} size={14} fallback="Circle" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-4 py-6 animate-fade-in">
        {children}
      </main>

      <footer className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        ФутболАналитик · Данные обновляются в реальном времени
      </footer>
    </div>
  );
}
