import { useState } from "react";

const TABS = ["Атака", "Защита", "Владение", "Стандарты"];

const TEAM_STATS = [
  { team: "Манчестер Сити", league: "АПЛ", goals: 78, shots: 18.4, shotsOnTarget: 7.2, possession: 58, xG: 2.41, cleanSheets: 14, corners: 6.8, yellowCards: 34 },
  { team: "Реал Мадрид", league: "Ла Лига", goals: 72, shots: 16.8, shotsOnTarget: 6.5, possession: 56, xG: 2.28, cleanSheets: 16, corners: 5.9, yellowCards: 41 },
  { team: "Бавария", league: "Бундеслига", goals: 85, shots: 20.1, shotsOnTarget: 8.1, possession: 60, xG: 2.67, cleanSheets: 12, corners: 7.2, yellowCards: 38 },
  { team: "ПСЖ", league: "Лига 1", goals: 70, shots: 17.2, shotsOnTarget: 6.8, possession: 55, xG: 2.15, cleanSheets: 13, corners: 6.1, yellowCards: 45 },
  { team: "Арсенал", league: "АПЛ", goals: 68, shots: 15.9, shotsOnTarget: 6.1, possession: 54, xG: 2.10, cleanSheets: 15, corners: 6.4, yellowCards: 36 },
  { team: "Барселона", league: "Ла Лига", goals: 66, shots: 16.5, shotsOnTarget: 6.3, possession: 57, xG: 2.05, cleanSheets: 11, corners: 7.0, yellowCards: 52 },
  { team: "Дортмунд", league: "Бундеслига", goals: 62, shots: 15.2, shotsOnTarget: 5.8, possession: 52, xG: 1.95, cleanSheets: 10, corners: 5.5, yellowCards: 43 },
  { team: "Ливерпуль", league: "АПЛ", goals: 74, shots: 17.8, shotsOnTarget: 7.0, possession: 55, xG: 2.35, cleanSheets: 13, corners: 6.6, yellowCards: 37 },
];

const COLS = {
  "Атака": [
    { key: "goals", label: "Голы", mono: true },
    { key: "shots", label: "Удары/матч", mono: true },
    { key: "shotsOnTarget", label: "В створ/матч", mono: true },
    { key: "xG", label: "xG/матч", mono: true },
  ],
  "Защита": [
    { key: "cleanSheets", label: "Сухие матчи", mono: true },
    { key: "yellowCards", label: "Жёлтые карточки", mono: true },
  ],
  "Владение": [
    { key: "possession", label: "Владение %", mono: true },
  ],
  "Стандарты": [
    { key: "corners", label: "Угловые/матч", mono: true },
  ],
};

const MAX: Record<string, number> = {
  goals: 90, shots: 22, shotsOnTarget: 9, possession: 65, xG: 3, cleanSheets: 20, corners: 8, yellowCards: 60
};

export default function Statistics() {
  const [tab, setTab] = useState("Атака");
  const cols = COLS[tab as keyof typeof COLS];

  return (
    <div className="space-y-5 animate-slide-up">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Статистика</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Сравнительные показатели команд по сезону</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
              tab === t ? "border-green text-green" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="surface rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 w-8">#</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Команда</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Лига</th>
                {cols.map((c) => (
                  <th key={c.key} className="text-right text-xs font-medium text-muted-foreground px-4 py-3">{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {TEAM_STATS.map((team, i) => (
                <tr key={i} className="hover-row transition-colors cursor-pointer">
                  <td className="px-4 py-3 text-xs text-muted-foreground font-mono-data">{i + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium">{team.team}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs border border-border rounded px-2 py-0.5 text-muted-foreground">{team.league}</span>
                  </td>
                  {cols.map((c) => {
                    const val = team[c.key as keyof typeof team] as number;
                    const pct = Math.min(100, (val / MAX[c.key]) * 100);
                    return (
                      <td key={c.key} className="px-4 py-3 text-right">
                        <div className="inline-flex flex-col items-end gap-1">
                          <span className="text-sm font-mono-data font-medium">{val}</span>
                          <div className="progress-bar w-16">
                            <div className="progress-fill" style={{ width: `${pct}%` }}></div>
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* xG explanation */}
      <div className="surface-2 rounded p-4 flex gap-3">
        <span className="text-green shrink-0 mt-0.5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M7 6v4M7 4.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </span>
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">xG (Expected Goals)</strong> — метрика качества голевых моментов. Показывает ожидаемое количество голов на основе характеристик ударов: позиция, угол, тип удара, ситуация в матче.
        </p>
      </div>
    </div>
  );
}
