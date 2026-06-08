import { createServerFn } from "@tanstack/react-start";

const GUILD_ID = "1475402371478720643";

export type DiscordMember = {
  id: string;
  username: string;
  avatar_url: string;
  status: string;
  game?: { name: string };
};

export type DiscordChannel = { id: string; name: string; position: number };

export type DiscordWidget = {
  ok: boolean;
  id?: string;
  name?: string;
  instant_invite?: string | null;
  presence_count?: number;
  members?: DiscordMember[];
  channels?: DiscordChannel[];
  error?: string;
};

export const getDiscordWidget = createServerFn({ method: "GET" }).handler(
  async (): Promise<DiscordWidget> => {
    try {
      const res = await fetch(
        `https://discord.com/api/guilds/${GUILD_ID}/widget.json`,
        { headers: { "User-Agent": "MoonDev-Site/1.0" } },
      );
      if (!res.ok) {
        return {
          ok: false,
          error:
            res.status === 403
              ? "Server widget is disabled. Enable it in Discord → Server Settings → Widget."
              : `Discord API error (${res.status})`,
        };
      }
      const data = (await res.json()) as {
        id: string;
        name: string;
        instant_invite: string | null;
        presence_count: number;
        members: DiscordMember[];
        channels: DiscordChannel[];
      };
      return {
        ok: true,
        id: data.id,
        name: data.name,
        instant_invite: data.instant_invite,
        presence_count: data.presence_count,
        members: data.members ?? [],
        channels: data.channels ?? [],
      };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : "Unknown error" };
    }
  },
);
