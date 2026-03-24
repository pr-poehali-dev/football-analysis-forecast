import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const TOP_MATCHES = [
  { home: "Реал Мадрид", away: "Барселона", league: "Ла Лига", time: "21:00", date: "Сегодня", homeOdds: "2.10", drawOdds: "3.50", awayOdds: "3.20", confidence: 78, prediction: "П1" },
  { home: "Манчестер Сити", away: "Арсенал", league: "АПЛ", time: "19:45", date: "Сегодня", homeOdds: "1.85", drawOdds: "3.60", awayOdds: "4.10", confidence: 65, prediction: "П1" },
  { home: "ПСЖ", away: "Марсель", league: "Лига 1", time: "20:45", date: "Сегодня", homeOdds: "1.65", drawOdds: "4.00", awayOdds: "5.50", confidence: 71, prediction: "П1" },
  { home: "Бавария", away: "Дортмунд", league: "Бундеслига", time: "18:30", date: "Завтра", homeOdds: "1.75", drawOdds: "3.80", awayOdds: "4.50", confidence: 69, prediction: "П1" },
];

const STATS_CARDS = [
  { label: "Матчей проанализировано", value: "12 840", delta: "+128 за неделю", up: true },
  { label: "Точность прогнозов", value: "68.4%", delta: "+2.1% к прошлому месяцу", up: true },
  { label: "Активных лиг", value: "47", delta: "В 24 странах", up: null },
  { label: "Команд в базе", value: "1 240", delta: "+16 новых", up: true },
];

const TOP_TEAMS = [
  { name: "Манчестер Сити", league: "АПЛ", rating: 94.2, delta: +0.3 },
  { name: "Реал Мадрид", league: "Ла Лига", rating: 93.8, delta: -0.1 },
  { name: "Бавария", league: "Бундеслига", rating: 92.1, delta: +0.5 },
  { name: "ПСЖ", league: "Лига 1", rating: 90.7, delta: +0.2 },
  { name: "Арсенал", league: "АПЛ", rating: 89.4, delta: -0.4 },
];

export default function Home() {
  return (
    <div className="space-y-6 animate-slide-up">
      {/* Hero */}
      <div className="border-b border-border pb-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse inline-block"></span>
          Live-данные · {new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Аналитика футбола</h1>
        <p className="text-muted-foreground text-sm mt-1">Прогнозы и статистика на основе данных 1 200+ команд мира</p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STATS_CARDS.map((card) => (
          <div key={card.label} className="surface rounded p-4">
            <div className="text-xs text-muted-foreground mb-2">{card.label}</div>
            <div className="text-xl font-semibold font-mono-data tracking-tight">{card.value}</div>
            <div className={`text-xs mt-1 ${card.up === true ? "stat-up" : card.up === false ? "stat-down" : "text-muted-foreground"}`}>
              {card.delta}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Today matches */}
        <div className="lg:col-span-2 surface rounded">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="text-sm font-medium">Матчи сегодня</span>
            <Link to="/matches" className="text-xs text-green hover:underline">Все матчи →</Link>
          </div>
          <div className="divide-y divide-border">
            {TOP_MATCHES.map((m, i) => (
              <div key={i} className="px-4 py-3 hover-row transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground font-mono-data">{m.time}</span>
                      <span className="text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5">{m.league}</span>
                      <span className="text-xs text-muted-foreground">{m.date}</span>
                    </div>
                    <div className="text-sm font-medium">{m.home} — {m.away}</div>
                  </div>
                  <div className="flex items-center gap-3 ml-3">
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground mb-1">Уверенность</div>
                      <div className="flex items-center gap-1.5">
                        <div className="progress-bar w-16">
                          <div className="progress-fill" style={{ width: `${m.confidence}%` }}></div>
                        </div>
                        <span className="text-xs font-mono-data stat-up">{m.confidence}%</span>
                      </div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="text-xs text-muted-foreground mb-1">Прогноз</div>
                      <span className="data-badge px-2 py-0.5 bg-green/10 text-green rounded">{m.prediction}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  {[{ label: "П1", val: m.homeOdds }, { label: "X", val: m.drawOdds }, { label: "П2", val: m.awayOdds }].map((odd) => (
                    <div key={odd.label} className="flex items-center gap-1 border border-border rounded px-2 py-1">
                      <span className="text-xs text-muted-foreground">{odd.label}</span>
                      <span className="text-xs font-mono-data font-medium">{odd.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top teams */}
        <div className="surface rounded">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="text-sm font-medium">Топ команды</span>
            <Link to="/teams" className="text-xs text-green hover:underline">Все →</Link>
          </div>
          <div className="divide-y divide-border">
            {TOP_TEAMS.map((team, i) => (
              <div key={i} className="px-4 py-3 hover-row transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{team.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{team.league}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono-data font-semibold">{team.rating}</div>
                    <div className={`text-xs font-mono-data ${team.delta >= 0 ? "stat-up" : "stat-down"}`}>
                      {team.delta >= 0 ? "+" : ""}{team.delta}
                    </div>
                  </div>
                </div>
                <div className="progress-bar mt-2">
                  <div className="progress-fill" style={{ width: `${team.rating}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { to: "/predictions", icon: "TrendingUp", label: "Прогнозы", desc: "Аналитические прогнозы на матчи" },
          { to: "/statistics", icon: "BarChart2", label: "Статистика", desc: "Подробные данные по командам" },
          { to: "/players", icon: "User", label: "Игроки", desc: "Рейтинги и статистика игроков" },
          { to: "/leagues", icon: "Trophy", label: "Лиги", desc: "Турнирные таблицы мира" },
        ].map((link) => (
          <Link key={link.to} to={link.to} className="surface rounded p-4 hover:border-green/40 transition-colors group">
            <Icon name={link.icon} size={18} className="text-green mb-2" fallback="Circle" />
            <div className="text-sm font-medium group-hover:text-green transition-colors">{link.label}</div>
            <div className="text-xs text-muted-foreground mt-1">{link.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
