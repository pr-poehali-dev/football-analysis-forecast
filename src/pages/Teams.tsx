import { useState } from "react";

const TEAMS = [
  { name: "Манчестер Сити", league: "АПЛ", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", rating: 94.2, delta: +0.3, form: ["W","W","W","D","W"], played: 29, won: 22, drawn: 4, lost: 3, gf: 74, ga: 32, pts: 70, rank: 1 },
  { name: "Реал Мадрид", league: "Ла Лига", country: "🇪🇸", rating: 93.8, delta: -0.1, form: ["W","W","D","W","W"], played: 29, won: 21, drawn: 5, lost: 3, gf: 68, ga: 29, pts: 68, rank: 2 },
  { name: "Бавария", league: "Бундеслига", country: "🇩🇪", rating: 92.1, delta: +0.5, form: ["W","W","W","W","L"], played: 27, won: 20, drawn: 3, lost: 4, gf: 82, ga: 38, pts: 63, rank: 3 },
  { name: "ПСЖ", league: "Лига 1", country: "🇫🇷", rating: 90.7, delta: +0.2, form: ["W","D","W","W","W"], played: 28, won: 21, drawn: 2, lost: 5, gf: 67, ga: 31, pts: 65, rank: 4 },
  { name: "Арсенал", league: "АПЛ", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", rating: 89.4, delta: -0.4, form: ["W","W","L","W","D"], played: 29, won: 20, drawn: 5, lost: 4, gf: 66, ga: 30, pts: 65, rank: 5 },
  { name: "Барселона", league: "Ла Лига", country: "🇪🇸", rating: 88.9, delta: +0.7, form: ["D","W","W","L","W"], played: 29, won: 19, drawn: 5, lost: 5, gf: 64, ga: 35, pts: 62, rank: 6 },
  { name: "Ливерпуль", league: "АПЛ", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", rating: 88.5, delta: +0.1, form: ["W","W","W","D","W"], played: 29, won: 20, drawn: 3, lost: 6, gf: 71, ga: 42, pts: 63, rank: 7 },
  { name: "Интер", league: "Серия А", country: "🇮🇹", rating: 87.3, delta: -0.2, form: ["W","D","W","W","W"], played: 28, won: 20, drawn: 4, lost: 4, gf: 65, ga: 28, pts: 64, rank: 8 },
  { name: "Атлетико", league: "Ла Лига", country: "🇪🇸", rating: 86.8, delta: +0.4, form: ["W","L","W","W","D"], played: 29, won: 18, drawn: 6, lost: 5, gf: 52, ga: 30, pts: 60, rank: 9 },
  { name: "Дортмунд", league: "Бундеслига", country: "🇩🇪", rating: 85.4, delta: -0.3, form: ["L","W","D","W","W"], played: 27, won: 16, drawn: 5, lost: 6, gf: 59, ga: 44, pts: 53, rank: 10 },
];

const FORM_COLOR: Record<string, string> = {
  W: "bg-green text-background",
  D: "bg-yellow-500 text-background",
  L: "bg-red-500 text-background",
};

export default function Teams() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"rating" | "pts">("rating");

  const filtered = TEAMS
    .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.league.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div className="space-y-5 animate-slide-up">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Команды</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Рейтинги, форма и сезонная статистика</p>
      </div>

      <div className="flex gap-3 flex-wrap">
        <input
          className="bg-secondary border border-border rounded px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-green/50 w-full max-w-xs"
          placeholder="Поиск по команде или лиге..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-1">
          {(["rating", "pts"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                sortBy === s ? "border-green text-green bg-green/10" : "border-border text-muted-foreground hover:border-foreground/30"
              }`}
            >
              {s === "rating" ? "По рейтингу" : "По очкам"}
            </button>
          ))}
        </div>
      </div>

      <div className="surface rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 w-8">#</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Команда</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">Лига</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-4 py-3 hidden sm:table-cell">Форма</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3 hidden lg:table-cell">И</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3 hidden lg:table-cell">В</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3 hidden lg:table-cell">Н</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3 hidden lg:table-cell">П</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3 hidden md:table-cell">Г</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Оч</th>
                <th className="text-right text-xs font-medium text-muted-foreground px-4 py-3">Рейтинг</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((team, i) => (
                <tr key={i} className="hover-row transition-colors cursor-pointer">
                  <td className="px-4 py-3 text-xs text-muted-foreground font-mono-data">{i + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{team.country}</span>
                      <div>
                        <div className="text-sm font-medium">{team.name}</div>
                        <div className="text-xs text-muted-foreground md:hidden">{team.league}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-xs border border-border rounded px-2 py-0.5 text-muted-foreground">{team.league}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <div className="flex gap-0.5 justify-center">
                      {team.form.map((f, fi) => (
                        <span key={fi} className={`w-5 h-5 rounded text-xs font-bold flex items-center justify-center ${FORM_COLOR[f]}`}>{f}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-xs font-mono-data text-muted-foreground hidden lg:table-cell">{team.played}</td>
                  <td className="px-4 py-3 text-right text-xs font-mono-data stat-up hidden lg:table-cell">{team.won}</td>
                  <td className="px-4 py-3 text-right text-xs font-mono-data text-yellow-500 hidden lg:table-cell">{team.drawn}</td>
                  <td className="px-4 py-3 text-right text-xs font-mono-data stat-down hidden lg:table-cell">{team.lost}</td>
                  <td className="px-4 py-3 text-right text-xs font-mono-data text-muted-foreground hidden md:table-cell">{team.gf}:{team.ga}</td>
                  <td className="px-4 py-3 text-right text-sm font-mono-data font-semibold">{team.pts}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <span className="text-sm font-mono-data font-semibold text-green">{team.rating}</span>
                      <span className={`text-xs font-mono-data ${team.delta >= 0 ? "stat-up" : "stat-down"}`}>
                        {team.delta >= 0 ? "+" : ""}{team.delta}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
