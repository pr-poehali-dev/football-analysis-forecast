import { useState } from "react";
import Icon from "@/components/ui/icon";

const LEAGUES = ["Все", "АПЛ", "Ла Лига", "Бундеслига", "Серия А", "Лига 1", "Лига чемпионов"];

const MATCHES = [
  { home: "Манчестер Сити", away: "Арсенал", league: "АПЛ", time: "19:45", date: "24 мар", homeScore: null, awayScore: null, status: "upcoming", homeOdds: "1.85", drawOdds: "3.60", awayOdds: "4.10", homePoss: 58, prediction: "П1", conf: 65 },
  { home: "Реал Мадрид", away: "Барселона", league: "Ла Лига", time: "21:00", date: "24 мар", homeScore: null, awayScore: null, status: "upcoming", homeOdds: "2.10", drawOdds: "3.50", awayOdds: "3.20", homePoss: 52, prediction: "П1", conf: 78 },
  { home: "ПСЖ", away: "Марсель", league: "Лига 1", time: "20:45", date: "24 мар", homeScore: null, awayScore: null, status: "live", homeOdds: "1.65", drawOdds: "4.00", awayOdds: "5.50", homePoss: 63, prediction: "П1", conf: 71 },
  { home: "Бавария", away: "Дортмунд", league: "Бундеслига", time: "18:30", date: "25 мар", homeScore: null, awayScore: null, status: "upcoming", homeOdds: "1.75", drawOdds: "3.80", awayOdds: "4.50", homePoss: 55, prediction: "П1", conf: 69 },
  { home: "Ювентус", away: "Милан", league: "Серия А", time: "20:45", date: "25 мар", homeScore: null, awayScore: null, status: "upcoming", homeOdds: "2.20", drawOdds: "3.30", awayOdds: "3.40", homePoss: 50, prediction: "X", conf: 55 },
  { home: "Челси", away: "Ливерпуль", league: "АПЛ", time: "17:30", date: "23 мар", homeScore: 1, awayScore: 2, status: "finished", homeOdds: "2.75", drawOdds: "3.30", awayOdds: "2.55", homePoss: 45, prediction: "П2", conf: 62 },
  { home: "Атлетико", away: "Севилья", league: "Ла Лига", time: "20:00", date: "23 мар", homeScore: 2, awayScore: 0, status: "finished", homeOdds: "1.95", drawOdds: "3.50", awayOdds: "4.00", homePoss: 52, prediction: "П1", conf: 70 },
  { home: "Интер", away: "Наполи", league: "Серия А", time: "20:45", date: "22 мар", homeScore: 3, awayScore: 1, status: "finished", homeOdds: "2.00", drawOdds: "3.40", awayOdds: "3.60", homePoss: 54, prediction: "П1", conf: 74 },
];

const STATUS_LABEL: Record<string, { label: string; className: string }> = {
  upcoming: { label: "Предстоит", className: "text-muted-foreground" },
  live: { label: "LIVE", className: "text-red-400" },
  finished: { label: "Завершён", className: "text-muted-foreground" },
};

export default function Matches() {
  const [league, setLeague] = useState("Все");
  const [tab, setTab] = useState<"all" | "upcoming" | "live" | "finished">("all");

  const filtered = MATCHES
    .filter((m) => league === "Все" || m.league === league)
    .filter((m) => tab === "all" || m.status === tab);

  return (
    <div className="space-y-5 animate-slide-up">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Матчи</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Расписание, результаты и анализ</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {(["all", "upcoming", "live", "finished"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-xs font-medium border-b-2 transition-colors ${
              tab === t ? "border-green text-green" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "all" ? "Все" : t === "upcoming" ? "Предстоят" : t === "live" ? "Live" : "Завершённые"}
          </button>
        ))}
      </div>

      {/* League filter */}
      <div className="flex gap-2 flex-wrap">
        {LEAGUES.map((l) => (
          <button
            key={l}
            onClick={() => setLeague(l)}
            className={`px-3 py-1 rounded text-xs font-medium border transition-colors ${
              league === l ? "border-green text-green bg-green/10" : "border-border text-muted-foreground hover:border-foreground/30"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Match list */}
      <div className="surface rounded divide-y divide-border">
        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground text-sm">Нет матчей по выбранным фильтрам</div>
        )}
        {filtered.map((m, i) => (
          <div key={i} className="px-4 py-4 hover-row transition-colors cursor-pointer">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium ${STATUS_LABEL[m.status].className}`}>
                    {m.status === "live" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-1 animate-pulse"></span>}
                    {STATUS_LABEL[m.status].label}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono-data">{m.date} · {m.time}</span>
                  <span className="text-xs border border-border rounded px-1.5 py-0.5 text-muted-foreground">{m.league}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{m.home}</span>
                  {m.status === "finished" ? (
                    <span className="font-mono-data font-semibold text-sm px-2 py-0.5 bg-secondary rounded">
                      {m.homeScore} : {m.awayScore}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">vs</span>
                  )}
                  <span className="text-sm font-medium">{m.away}</span>
                </div>

                {/* Possession bar */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs text-muted-foreground w-6 font-mono-data">{m.homePoss}%</span>
                  <div className="flex-1 flex h-1.5 rounded overflow-hidden bg-border">
                    <div className="bg-green h-full" style={{ width: `${m.homePoss}%` }}></div>
                    <div className="bg-blue-500 h-full" style={{ width: `${100 - m.homePoss}%` }}></div>
                  </div>
                  <span className="text-xs text-muted-foreground w-6 text-right font-mono-data">{100 - m.homePoss}%</span>
                  <span className="text-xs text-muted-foreground ml-1">владение</span>
                </div>
              </div>

              {/* Right: odds + prediction */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex gap-1.5">
                  {[{ l: "П1", v: m.homeOdds }, { l: "X", v: m.drawOdds }, { l: "П2", v: m.awayOdds }].map((o) => (
                    <div key={o.l} className="text-center border border-border rounded px-2 py-1">
                      <div className="text-xs text-muted-foreground">{o.l}</div>
                      <div className="text-xs font-mono-data font-medium mt-0.5">{o.v}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Прогноз:</span>
                  <span className="data-badge px-2 py-0.5 bg-green/10 text-green rounded font-medium">{m.prediction}</span>
                  <span className="text-xs font-mono-data stat-up">{m.conf}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
