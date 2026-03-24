import { useState } from "react";

const PLAYERS = [
  { name: "Эрлинг Холанд", team: "Манчестер Сити", pos: "Нападающий", country: "🇳🇴", rating: 96.1, delta: +0.4, goals: 28, assists: 6, matches: 26, xG: 27.4, shots: 4.2, passAcc: 72, dribbles: 1.8 },
  { name: "Килиан Мбаппе", team: "Реал Мадрид", pos: "Нападающий", country: "🇫🇷", rating: 95.8, delta: +0.2, goals: 24, assists: 10, matches: 28, xG: 22.1, shots: 4.8, passAcc: 78, dribbles: 3.4 },
  { name: "Букайо Сака", team: "Арсенал", pos: "Полузащитник", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", rating: 91.3, delta: -0.1, goals: 14, assists: 11, matches: 27, xG: 12.8, shots: 2.9, passAcc: 82, dribbles: 2.1 },
  { name: "Фил Фоден", team: "Манчестер Сити", pos: "Полузащитник", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", rating: 90.7, delta: +0.6, goals: 13, assists: 9, matches: 25, xG: 11.5, shots: 2.7, passAcc: 86, dribbles: 2.5 },
  { name: "Виниcius Jr.", team: "Реал Мадрид", pos: "Нападающий", country: "🇧🇷", rating: 90.2, delta: -0.3, goals: 18, assists: 8, matches: 27, xG: 15.3, shots: 3.1, passAcc: 74, dribbles: 4.1 },
  { name: "Родри", team: "Манчестер Сити", pos: "Полузащитник", country: "🇪🇸", rating: 89.8, delta: +0.1, goals: 5, assists: 7, matches: 24, xG: 4.2, shots: 1.4, passAcc: 93, dribbles: 1.0 },
  { name: "Педри", team: "Барселона", pos: "Полузащитник", country: "🇪🇸", rating: 89.1, delta: +0.8, goals: 8, assists: 12, matches: 26, xG: 7.8, shots: 2.0, passAcc: 89, dribbles: 2.8 },
  { name: "Ламин Ямаль", team: "Барселона", pos: "Нападающий", country: "🇪🇸", rating: 88.4, delta: +1.2, goals: 11, assists: 14, matches: 28, xG: 10.2, shots: 2.4, passAcc: 80, dribbles: 3.5 },
  { name: "Гарри Кейн", team: "Бавария", pos: "Нападающий", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", rating: 88.0, delta: -0.2, goals: 26, assists: 9, matches: 27, xG: 24.6, shots: 4.0, passAcc: 77, dribbles: 1.2 },
  { name: "Джуд Беллингем", team: "Реал Мадрид", pos: "Полузащитник", country: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", rating: 87.5, delta: +0.3, goals: 12, assists: 8, matches: 25, xG: 10.4, shots: 2.3, passAcc: 85, dribbles: 2.2 },
];

const POSITIONS = ["Все", "Нападающий", "Полузащитник", "Защитник", "Вратарь"];

export default function Players() {
  const [search, setSearch] = useState("");
  const [pos, setPos] = useState("Все");
  const [selected, setSelected] = useState<number | null>(null);

  const filtered = PLAYERS
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.team.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => pos === "Все" || p.pos === pos);

  return (
    <div className="space-y-5 animate-slide-up">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Игроки</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Рейтинги и детальная статистика игроков</p>
      </div>

      <div className="flex gap-3 flex-wrap">
        <input
          className="bg-secondary border border-border rounded px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-green/50 w-full max-w-xs"
          placeholder="Поиск по имени или клубу..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-1 flex-wrap">
          {POSITIONS.map((p) => (
            <button
              key={p}
              onClick={() => setPos(p)}
              className={`px-3 py-1 rounded text-xs font-medium border transition-colors ${
                pos === p ? "border-green text-green bg-green/10" : "border-border text-muted-foreground hover:border-foreground/30"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* List */}
        <div className="lg:col-span-2 surface rounded divide-y divide-border">
          {filtered.map((p, i) => (
            <button
              key={i}
              className={`w-full px-4 py-3 text-left hover-row transition-colors ${selected === i ? "bg-green/5 border-l-2 border-l-green" : ""}`}
              onClick={() => setSelected(selected === i ? null : i)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-mono-data w-4 text-center">{i + 1}</span>
                  <span className="text-lg">{p.country}</span>
                  <div>
                    <div className="text-sm font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.team} · {p.pos}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-center hidden sm:block">
                    <div className="text-xs text-muted-foreground">Голы</div>
                    <div className="text-sm font-mono-data font-semibold stat-up">{p.goals}</div>
                  </div>
                  <div className="text-center hidden md:block">
                    <div className="text-xs text-muted-foreground">Передачи</div>
                    <div className="text-sm font-mono-data font-semibold">{p.assists}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-mono-data font-bold text-green">{p.rating}</div>
                    <div className={`text-xs font-mono-data ${p.delta >= 0 ? "stat-up" : "stat-down"}`}>
                      {p.delta >= 0 ? "+" : ""}{p.delta}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="surface rounded p-4">
          {selected !== null && filtered[selected] ? (
            <div className="animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">{filtered[selected].country}</span>
                <div>
                  <div className="font-semibold">{filtered[selected].name}</div>
                  <div className="text-xs text-muted-foreground">{filtered[selected].team} · {filtered[selected].pos}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Матчи", val: filtered[selected].matches },
                  { label: "Голы", val: filtered[selected].goals },
                  { label: "Передачи", val: filtered[selected].assists },
                  { label: "xG", val: filtered[selected].xG },
                  { label: "Удары/матч", val: filtered[selected].shots },
                  { label: "Точность пасов", val: `${filtered[selected].passAcc}%` },
                  { label: "Дриблинг/матч", val: filtered[selected].dribbles },
                  { label: "Рейтинг", val: filtered[selected].rating },
                ].map((stat) => (
                  <div key={stat.label} className="bg-secondary/50 rounded p-3">
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                    <div className="text-base font-mono-data font-semibold mt-0.5">{stat.val}</div>
                  </div>
                ))}
              </div>
              {/* Rating bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Рейтинг</span>
                  <span className="font-mono-data text-green">{filtered[selected].rating} / 100</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${filtered[selected].rating}%` }}></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <div className="text-3xl mb-2">👤</div>
              <div className="text-sm text-muted-foreground">Выберите игрока<br />для просмотра статистики</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
