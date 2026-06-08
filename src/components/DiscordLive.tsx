import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getDiscordWidget, type DiscordWidget } from "@/lib/discord.functions";

const statusDot: Record<string, string> = {
  online: "bg-green-500",
  idle: "bg-yellow-500",
  dnd: "bg-red-500",
  offline: "bg-gray-500",
};

export function DiscordLive() {
  const fetchWidget = useServerFn(getDiscordWidget);
  const [data, setData] = useState<DiscordWidget | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchWidget().then((d) => !cancelled && setData(d));
    const id = setInterval(() => setTick((t) => t + 1), 15000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [fetchWidget, tick]);

  return (
    <section className="max-w-5xl mx-auto px-6 pb-16">
      <div className="rounded-3xl bg-card border border-white/5 p-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-primary mb-1">Live · Discord</p>
            <h2 className="text-2xl font-semibold">
              {data?.ok ? data.name : "Moon Development"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-sm">
                <span className="font-semibold">{data?.presence_count ?? "—"}</span>
                <span className="text-muted-foreground"> online</span>
              </span>
            </div>
            <a
              href={data?.instant_invite ?? "https://discord.gg/2MvgZ349Wc"}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white text-black px-4 py-2 text-xs font-medium hover:bg-white/90 transition"
            >
              Join server
            </a>
          </div>
        </div>

        {!data && <p className="text-sm text-muted-foreground">Loading live data…</p>}
        {data && !data.ok && (
          <p className="text-sm text-muted-foreground">
            {data.error} <br />
            <span className="text-xs">
              Server Settings → Widget → enable "Server Widget" to show live data here.
            </span>
          </p>
        )}

        {data?.ok && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                Online members ({data.members?.length ?? 0})
              </p>
              <ul className="space-y-2 max-h-72 overflow-y-auto pr-2">
                {data.members?.map((m) => (
                  <li key={m.id} className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={m.avatar_url}
                        alt={m.username}
                        className="h-8 w-8 rounded-full bg-background"
                        loading="lazy"
                      />
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card ${
                          statusDot[m.status] ?? "bg-gray-500"
                        }`}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm truncate">{m.username}</p>
                      {m.game?.name && (
                        <p className="text-xs text-muted-foreground truncate">
                          Playing {m.game.name}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
                {data.members?.length === 0 && (
                  <li className="text-sm text-muted-foreground">No one online right now.</li>
                )}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                Voice channels
              </p>
              <ul className="space-y-2">
                {data.channels?.map((c) => (
                  <li key={c.id} className="text-sm flex items-center gap-2">
                    <span className="text-muted-foreground">🔊</span>
                    {c.name}
                  </li>
                ))}
                {data.channels?.length === 0 && (
                  <li className="text-sm text-muted-foreground">No active voice channels.</li>
                )}
              </ul>
            </div>
          </div>
        )}

        <p className="text-[10px] text-muted-foreground mt-6">
          Auto-refreshes every 15s · Powered by Discord Widget API
        </p>
      </div>
    </section>
  );
}
