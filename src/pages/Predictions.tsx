import { useState } from "react";
import Icon from "@/components/ui/icon";

const PREDICTIONS = [
  {
    home: "Реал Мадрид", away: "Барселона", league: "Ла Лига", date: "24 мар · 21:00",
    prediction: "П1", confidence: 78,
    analysis: "Реал имеет преимущество дома. Форма последних 5 матчей: 4П 1Н. Барселона проиграла 2 из последних 3 выездных игр.",
    factors: ["Домашнее поле", "Форма команды", "Ключевые игроки в строю"],
    homeWin: 78, draw: 13, awayWin: 9,
    homeXG: 2.3, awayXG: 1.1,
    homeForm: ["W","W","W","D","W"], awayForm: ["D","W","L","W","L"],
    homeGoalsAvg: 2.4, awayGoalsAvg: 1.8,
    scoreVariants: [
      { score: "2:0", prob: 24 },
      { score: "2:1", prob: 19 },
      { score: "3:1", prob: 15 },
      { score: "1:0", prob: 12 },
      { score: "3:0", prob: 9 },
    ],
    mostLikely: "2:0",
  },
  {
    home: "Манчестер Сити", away: "Арсенал", league: "АПЛ", date: "24 мар · 19:45",
    prediction: "П1", confidence: 65,
    analysis: "Ман Сити исторически доминирует в домашних матчах против Арсенала. Арсенал без двух ключевых защитников.",
    factors: ["Статистика очных встреч", "Травмы в составе соперника", "Мотивация"],
    homeWin: 65, draw: 20, awayWin: 15,
    homeXG: 2.1, awayXG: 1.3,
    homeForm: ["W","W","W","D","W"], awayForm: ["W","W","L","W","D"],
    homeGoalsAvg: 2.2, awayGoalsAvg: 1.5,
    scoreVariants: [
      { score: "2:1", prob: 21 },
      { score: "2:0", prob: 18 },
      { score: "1:0", prob: 14 },
      { score: "3:1", prob: 11 },
      { score: "1:1", prob: 10 },
    ],
    mostLikely: "2:1",
  },
  {
    home: "Бавария", away: "Дортмунд", league: "Бундеслига", date: "25 мар · 18:30",
    prediction: "П1", confidence: 69,
    analysis: "Классико немецкого футбола. Бавария выиграла 7 из последних 10 домашних встреч с Дортмундом.",
    factors: ["Историческая статистика", "Качество состава", "Позиция в таблице"],
    homeWin: 69, draw: 17, awayWin: 14,
    homeXG: 2.6, awayXG: 1.5,
    homeForm: ["W","W","W","W","L"], awayForm: ["L","W","D","W","W"],
    homeGoalsAvg: 3.1, awayGoalsAvg: 2.2,
    scoreVariants: [
      { score: "3:1", prob: 22 },
      { score: "2:1", prob: 18 },
      { score: "3:2", prob: 14 },
      { score: "2:0", prob: 12 },
      { score: "4:1", prob: 8 },
    ],
    mostLikely: "3:1",
  },
  {
    home: "Ювентус", away: "Милан", league: "Серия А", date: "25 мар · 20:45",
    prediction: "X", confidence: 55,
    analysis: "Дерби равных. Обе команды набирают форму. Последние 4 встречи закончились вничью или с минимальным счётом.",
    factors: ["Равенство составов", "Ставки обеих команд", "Тактика обороны"],
    homeWin: 35, draw: 40, awayWin: 25,
    homeXG: 1.4, awayXG: 1.3,
    homeForm: ["W","D","L","D","W"], awayForm: ["D","W","D","L","D"],
    homeGoalsAvg: 1.6, awayGoalsAvg: 1.5,
    scoreVariants: [
      { score: "1:1", prob: 28 },
      { score: "0:0", prob: 18 },
      { score: "1:0", prob: 14 },
      { score: "2:1", prob: 11 },
      { score: "0:1", prob: 9 },
    ],
    mostLikely: "1:1",
  },
  {
    home: "ПСЖ", away: "Марсель", league: "Лига 1", date: "24 мар · 20:45",
    prediction: "П1", confidence: 71,
    analysis: "ПСЖ в отличной форме, 8 побед подряд дома. Марсель нестабилен на выезде.",
    factors: ["Серия побед", "Выездная форма гостей", "Класс состава"],
    homeWin: 71, draw: 18, awayWin: 11,
    homeXG: 2.2, awayXG: 0.9,
    homeForm: ["W","D","W","W","W"], awayForm: ["L","D","W","L","D"],
    homeGoalsAvg: 2.5, awayGoalsAvg: 1.2,
    scoreVariants: [
      { score: "2:0", prob: 26 },
      { score: "3:0", prob: 17 },
      { score: "2:1", prob: 15 },
      { score: "1:0", prob: 13 },
      { score: "3:1", prob: 9 },
    ],
    mostLikely: "2:0",
  },
];

const STATS_ROW = [
  { label: "Всего прогнозов", value: "1 847" },
  { label: "Угадано", value: "1 263" },
  { label: "Точность", value: "68.4%" },
  { label: "Серия", value: "7 побед" },
];

const FORM_COLOR: Record<string, string> = {
  W: "bg-green/20 text-green",
  D: "bg-yellow-500/20 text-yellow-400",
  L: "bg-red-500/20 text-red-400",
};

export default function Predictions() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-5 animate-slide-up">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Прогнозы</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Аналитические прогнозы и приблизительный счёт</p>
      </div>

      {/* Accuracy stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS_ROW.map((s) => (
          <div key={s.label} className="surface rounded p-3 text-center">
            <div className="text-lg font-semibold font-mono-data stat-up">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Predictions list */}
      <div className="space-y-3">
        {PREDICTIONS.map((p, i) => (
          <div key={i} className="surface rounded overflow-hidden">
            <button
              className="w-full px-4 py-4 text-left hover-row transition-colors"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs border border-border rounded px-1.5 py-0.5 text-muted-foreground">{p.league}</span>
                    <span className="text-xs text-muted-foreground">{p.date}</span>
                  </div>
                  <div className="text-sm font-medium">{p.home} — {p.away}</div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Likely score badge */}
                  <div className="text-right hidden sm:block">
                    <div className="text-xs text-muted-foreground mb-1">Счёт</div>
                    <span className="font-mono-data font-bold text-base text-foreground border border-border rounded px-2 py-0.5">
                      {p.mostLikely}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">Прогноз</div>
                    <span className="data-badge px-3 py-1 bg-green/10 text-green rounded font-semibold text-sm">{p.prediction}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">Уверен.</div>
                    <span className="text-sm font-mono-data font-semibold stat-up">{p.confidence}%</span>
                  </div>
                  <Icon name={expanded === i ? "ChevronUp" : "ChevronDown"} size={14} className="text-muted-foreground" fallback="Circle" />
                </div>
              </div>

              {/* Probability bar */}
              <div className="mt-3 flex h-1.5 rounded overflow-hidden gap-0.5">
                <div className="bg-green h-full rounded-l" style={{ width: `${p.homeWin}%` }}></div>
                <div className="bg-yellow-500 h-full" style={{ width: `${p.draw}%` }}></div>
                <div className="bg-blue-500 h-full rounded-r" style={{ width: `${p.awayWin}%` }}></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs font-mono-data stat-up">{p.homeWin}%</span>
                <span className="text-xs font-mono-data text-yellow-500">{p.draw}%</span>
                <span className="text-xs font-mono-data text-blue-400">{p.awayWin}%</span>
              </div>
            </button>

            {/* Expanded analysis */}
            {expanded === i && (
              <div className="px-4 pb-5 border-t border-border pt-4 animate-fade-in space-y-4">

                {/* Score variants */}
                <div>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Вероятные счета</div>
                  <div className="flex gap-2 flex-wrap">
                    {p.scoreVariants.map((sv, si) => (
                      <div
                        key={si}
                        className={`flex flex-col items-center rounded px-3 py-2 border transition-colors ${
                          sv.score === p.mostLikely
                            ? "border-green bg-green/10"
                            : "border-border bg-secondary/30"
                        }`}
                      >
                        <span className={`font-mono-data font-bold text-lg ${sv.score === p.mostLikely ? "text-green" : "text-foreground"}`}>
                          {sv.score}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono-data mt-0.5">{sv.prob}%</span>
                        {sv.score === p.mostLikely && (
                          <span className="text-xs text-green mt-1">★ осн.</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* xG + form */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="surface-2 rounded p-3">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">xG и голы/матч</div>
                    <div className="space-y-2.5">
                      {[
                        { label: p.home, xg: p.homeXG, avg: p.homeGoalsAvg },
                        { label: p.away, xg: p.awayXG, avg: p.awayGoalsAvg },
                      ].map((t) => (
                        <div key={t.label}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-foreground/80 truncate">{t.label}</span>
                            <div className="flex gap-3 shrink-0 ml-2">
                              <span className="text-muted-foreground">xG <span className="font-mono-data text-foreground">{t.xg}</span></span>
                              <span className="text-muted-foreground">гол/м <span className="font-mono-data stat-up">{t.avg}</span></span>
                            </div>
                          </div>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${Math.min(100, (t.xg / 3.5) * 100)}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="surface-2 rounded p-3">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Форма (посл. 5 матчей)</div>
                    <div className="space-y-2.5">
                      {[
                        { label: p.home, form: p.homeForm },
                        { label: p.away, form: p.awayForm },
                      ].map((t) => (
                        <div key={t.label} className="flex items-center justify-between gap-2">
                          <span className="text-xs text-foreground/80 truncate">{t.label}</span>
                          <div className="flex gap-1 shrink-0">
                            {t.form.map((f, fi) => (
                              <span key={fi} className={`w-5 h-5 rounded text-xs font-bold flex items-center justify-center ${FORM_COLOR[f]}`}>{f}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Analysis + factors */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Анализ</div>
                    <p className="text-sm text-foreground/80 leading-relaxed">{p.analysis}</p>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Ключевые факторы</div>
                    <ul className="space-y-1.5">
                      {p.factors.map((f, fi) => (
                        <li key={fi} className="flex items-center gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-green shrink-0"></span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
