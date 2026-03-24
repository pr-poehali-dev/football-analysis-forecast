import { useState } from "react";

const LEAGUES_LIST = [
  {
    name: "Английская Премьер-лига",
    short: "АПЛ",
    country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    season: "2025/26",
    teams: 20,
    totalGoals: 842,
    avgGoals: 2.73,
    table: [
      { team: "Манчестер Сити", played: 29, won: 22, drawn: 4, lost: 3, gf: 74, ga: 32, pts: 70, form: ["W","W","W","D","W"] },
      { team: "Арсенал", played: 29, won: 20, drawn: 5, lost: 4, gf: 66, ga: 30, pts: 65, form: ["W","W","L","W","D"] },
      { team: "Ливерпуль", played: 29, won: 20, drawn: 3, lost: 6, gf: 71, ga: 42, pts: 63, form: ["W","W","W","D","W"] },
      { team: "Челси", played: 29, won: 15, drawn: 7, lost: 7, gf: 55, ga: 45, pts: 52, form: ["L","W","D","W","L"] },
      { team: "Тоттенхэм", played: 29, won: 14, drawn: 5, lost: 10, gf: 58, ga: 52, pts: 47, form: ["W","D","L","W","L"] },
    ]
  },
  {
    name: "Ла Лига",
    short: "ЛЛ",
    country: "🇪🇸",
    season: "2025/26",
    teams: 20,
    totalGoals: 798,
    avgGoals: 2.61,
    table: [
      { team: "Реал Мадрид", played: 29, won: 21, drawn: 5, lost: 3, gf: 68, ga: 29, pts: 68, form: ["W","W","D","W","W"] },
      { team: "Барселона", played: 29, won: 19, drawn: 5, lost: 5, gf: 64, ga: 35, pts: 62, form: ["D","W","W","L","W"] },
      { team: "Атлетико", played: 29, won: 18, drawn: 6, lost: 5, gf: 52, ga: 30, pts: 60, form: ["W","L","W","W","D"] },
      { team: "Реал Сосьедад", played: 29, won: 13, drawn: 8, lost: 8, gf: 44, ga: 38, pts: 47, form: ["D","W","L","D","W"] },
      { team: "Вильяреал", played: 29, won: 12, drawn: 7, lost: 10, gf: 42, ga: 45, pts: 43, form: ["L","D","W","L","W"] },
    ]
  },
  {
    name: "Бундеслига",
    short: "БЛ",
    country: "🇩🇪",
    season: "2025/26",
    teams: 18,
    totalGoals: 756,
    avgGoals: 3.02,
    table: [
      { team: "Бавария", played: 27, won: 20, drawn: 3, lost: 4, gf: 82, ga: 38, pts: 63, form: ["W","W","W","W","L"] },
      { team: "Байер Леверкузен", played: 27, won: 17, drawn: 5, lost: 5, gf: 68, ga: 34, pts: 56, form: ["W","D","W","W","D"] },
      { team: "Дортмунд", played: 27, won: 16, drawn: 5, lost: 6, gf: 59, ga: 44, pts: 53, form: ["L","W","D","W","W"] },
      { team: "РБ Лейпциг", played: 27, won: 14, drawn: 6, lost: 7, gf: 54, ga: 42, pts: 48, form: ["W","L","D","W","W"] },
      { team: "Айнтрахт", played: 27, won: 12, drawn: 5, lost: 10, gf: 48, ga: 48, pts: 41, form: ["L","W","L","W","D"] },
    ]
  },
];

const FORM_COLOR: Record<string, string> = {
  W: "bg-green text-background",
  D: "bg-yellow-500 text-background",
  L: "bg-red-500 text-background",
};

export default function Leagues() {
  const [selected, setSelected] = useState(0);
  const league = LEAGUES_LIST[selected];

  return (
    <div className="space-y-5 animate-slide-up">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Лиги</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Турнирные таблицы и статистика лиг</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-4">
        {/* League selector */}
        <div className="surface rounded divide-y divide-border">
          {LEAGUES_LIST.map((l, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full px-4 py-3 text-left hover-row transition-colors ${selected === i ? "bg-green/5 border-l-2 border-l-green" : ""}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{l.country}</span>
                <div>
                  <div className={`text-sm font-medium ${selected === i ? "text-green" : ""}`}>{l.name}</div>
                  <div className="text-xs text-muted-foreground">{l.teams} команд · {l.season}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* League content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Команд", val: league.teams },
              { label: "Голов в сезоне", val: league.totalGoals },
              { label: "Голов/матч", val: league.avgGoals },
            ].map((s) => (
              <div key={s.label} className="surface rounded p-3 text-center">
                <div className="text-lg font-mono-data font-semibold">{s.val}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="surface rounded overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <span className="text-sm font-medium">{league.name} · Таблица</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/30">
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2 w-8">#</th>
                    <th className="text-left text-xs font-medium text-muted-foreground px-4 py-2">Команда</th>
                    <th className="text-center text-xs font-medium text-muted-foreground px-3 py-2">И</th>
                    <th className="text-center text-xs font-medium text-muted-foreground px-3 py-2">В</th>
                    <th className="text-center text-xs font-medium text-muted-foreground px-3 py-2">Н</th>
                    <th className="text-center text-xs font-medium text-muted-foreground px-3 py-2">П</th>
                    <th className="text-center text-xs font-medium text-muted-foreground px-3 py-2 hidden sm:table-cell">Г</th>
                    <th className="text-center text-xs font-medium text-muted-foreground px-3 py-2">Оч</th>
                    <th className="text-center text-xs font-medium text-muted-foreground px-3 py-2 hidden md:table-cell">Форма</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {league.table.map((row, i) => (
                    <tr key={i} className="hover-row transition-colors">
                      <td className="px-4 py-3 text-xs font-mono-data text-muted-foreground">{i + 1}</td>
                      <td className="px-4 py-3 text-sm font-medium">{row.team}</td>
                      <td className="px-3 py-3 text-center text-xs font-mono-data text-muted-foreground">{row.played}</td>
                      <td className="px-3 py-3 text-center text-xs font-mono-data stat-up">{row.won}</td>
                      <td className="px-3 py-3 text-center text-xs font-mono-data text-yellow-500">{row.drawn}</td>
                      <td className="px-3 py-3 text-center text-xs font-mono-data stat-down">{row.lost}</td>
                      <td className="px-3 py-3 text-center text-xs font-mono-data text-muted-foreground hidden sm:table-cell">{row.gf}:{row.ga}</td>
                      <td className="px-3 py-3 text-center text-sm font-mono-data font-bold text-green">{row.pts}</td>
                      <td className="px-3 py-3 hidden md:table-cell">
                        <div className="flex gap-0.5 justify-center">
                          {row.form.map((f, fi) => (
                            <span key={fi} className={`w-5 h-5 rounded text-xs font-bold flex items-center justify-center ${FORM_COLOR[f]}`}>{f}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
