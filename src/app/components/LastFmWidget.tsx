"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { m, useReducedMotion } from "motion/react";

const LASTFM_USER = "hisukurifu";
const LASTFM_PROFILE = `https://www.last.fm/user/${LASTFM_USER}`;
// Public read-only Last.fm API key (no secret needed for user.getRecentTracks)
const LASTFM_API_KEY = "c4f5c08a6dd62e05bf9e4b388b9bb70d";
const POLL_MS = 45_000;

function PinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-3 w-3 shrink-0"
      aria-hidden
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
    </svg>
  );
}

type Track = {
  name: string;
  artist: string;
  album: string;
  url: string;
  image: string;
  nowPlaying: boolean;
  /** Unix seconds from Last.fm; only set for scrobbled (not now-playing) tracks */
  playedAt: number | null;
};

type LastFmTrackRaw = {
  name?: string;
  url?: string;
  artist?: { "#text"?: string; name?: string };
  album?: { "#text"?: string };
  image?: Array<{ size?: string; "#text"?: string }>;
  "@attr"?: { nowplaying?: string };
  date?: { uts?: string; "#text"?: string };
};

type RecentTracksResponse = {
  recenttracks?: {
    track?: LastFmTrackRaw | LastFmTrackRaw[];
  };
  error?: number;
  message?: string;
};

function pickImage(
  images?: Array<{ size?: string; "#text"?: string }>
): string {
  if (!images?.length) return "";
  const order = ["extralarge", "large", "medium", "small"];
  for (const size of order) {
    const match = images.find((img) => img.size === size && img["#text"]);
    if (match?.["#text"]) return match["#text"];
  }
  return images[images.length - 1]?.["#text"] ?? "";
}

function parseTrack(data: RecentTracksResponse): Track | null {
  const tracks = data.recenttracks?.track;
  const raw = Array.isArray(tracks) ? tracks[0] : tracks;
  if (!raw?.name) return null;

  const nowPlaying = raw["@attr"]?.nowplaying === "true";
  const uts = raw.date?.uts ? Number(raw.date.uts) : NaN;

  return {
    name: raw.name,
    artist: raw.artist?.["#text"] || raw.artist?.name || "Unknown artist",
    album: raw.album?.["#text"] || "",
    url: raw.url || LASTFM_PROFILE,
    image: pickImage(raw.image),
    nowPlaying,
    // Now-playing entries omit date; only last-played scrobbles have uts
    playedAt: !nowPlaying && Number.isFinite(uts) ? uts : null,
  };
}

/** Relative time from a Last.fm unix timestamp (seconds). */
function formatPlayedAt(uts: number, nowMs = Date.now()): string {
  const diffSec = Math.max(0, Math.floor(nowMs / 1000 - uts));

  if (diffSec < 45) return "just now";
  if (diffSec < 60) return "1m ago";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
  if (diffSec < 86400 * 2) return "yesterday";
  if (diffSec < 86400 * 7) return `${Math.floor(diffSec / 86400)}d ago`;

  return new Date(uts * 1000).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year:
      new Date(uts * 1000).getFullYear() === new Date(nowMs).getFullYear()
        ? undefined
        : "numeric",
  });
}

export default function LastFmWidget() {
  const [track, setTrack] = useState<Track | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  // Tick so relative "Xm ago" labels stay fresh without another API call
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [hovered, setHovered] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const openPin = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setHovered(true);
  }, []);

  const scheduleClosePin = useCallback(() => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    // Grace period so the cursor can reach the pin without it vanishing
    leaveTimer.current = setTimeout(() => {
      setHovered(false);
      leaveTimer.current = null;
    }, 450);
  }, []);

  useEffect(() => {
    return () => {
      if (leaveTimer.current) clearTimeout(leaveTimer.current);
    };
  }, []);

  const fetchTrack = useCallback(async (signal?: AbortSignal) => {
    try {
      const params = new URLSearchParams({
        method: "user.getRecentTracks",
        user: LASTFM_USER,
        api_key: LASTFM_API_KEY,
        format: "json",
        limit: "1",
      });
      const res = await fetch(
        `https://ws.audioscrobbler.com/2.0/?${params.toString()}`,
        { signal }
      );
      if (!res.ok) throw new Error(`Last.fm HTTP ${res.status}`);
      const data = (await res.json()) as RecentTracksResponse;
      if (data.error) throw new Error(data.message || "Last.fm API error");

      const next = parseTrack(data);
      if (!next) throw new Error("No recent tracks");
      setTrack(next);
      setStatus("ready");
    } catch (err) {
      if (signal?.aborted) return;
      console.error("Last.fm widget:", err);
      setStatus((prev) => (prev === "ready" ? "ready" : "error"));
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void fetchTrack(controller.signal);

    const id = window.setInterval(() => {
      void fetchTrack();
    }, POLL_MS);

    return () => {
      controller.abort();
      window.clearInterval(id);
    };
  }, [fetchTrack]);

  useEffect(() => {
    if (!track || track.nowPlaying || track.playedAt == null) return;
    const id = window.setInterval(() => setNowMs(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, [track]);

  return (
    <m.div
      className="my-4 max-w-80 relative"
      onHoverStart={openPin}
      onHoverEnd={scheduleClosePin}
      onFocusCapture={openPin}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          scheduleClosePin();
        }
      }}
    >
      <div className="flex items-center gap-2">
        <h1 className="text-md font-bold">Listening</h1>

        {/* Always-visible pin; username expands on hover. Stays open with leave delay. */}
        <m.a
          href={LASTFM_PROFILE}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Last.fm profile: ${LASTFM_USER}`}
          onHoverStart={openPin}
          onHoverEnd={scheduleClosePin}
          initial={false}
          animate={
            prefersReducedMotion
              ? {}
              : { scale: hovered ? 1.04 : 1 }
          }
          whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
          transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          className="inline-flex max-w-full items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--card)] py-0.5 pl-1.5 pr-1.5 text-[11px] font-medium text-[var(--accent-blue)] shadow-sm transition-[padding,background-color] duration-200 ease-out hover:bg-[var(--surface-hover)] hover:underline"
          style={{
            paddingRight: hovered ? 8 : 6,
          }}
        >
          <span className="text-[var(--accent-sage)]">
            <PinIcon />
          </span>
          <span
            className={`overflow-hidden whitespace-nowrap transition-[max-width,opacity,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
              hovered
                ? "max-w-[9rem] opacity-100 blur-0"
                : "max-w-0 opacity-0 blur-[4px]"
            }`}
          >
            {LASTFM_USER}
          </span>
        </m.a>
      </div>

      {status === "loading" && (
        <div className="mt-2 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3">
          <div className="h-14 w-14 shrink-0 animate-pulse rounded-lg bg-[var(--surface-muted)]" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-3.5 w-2/3 animate-pulse rounded bg-[var(--surface-muted)]" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-[var(--surface-muted)]" />
          </div>
        </div>
      )}

      {status === "error" && !track && (
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Couldn&apos;t load Last.fm right now.{" "}
          <a
            href={LASTFM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent-blue)] hover:underline"
          >
            View profile
          </a>
        </p>
      )}

      {track && (
        <m.a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex origin-center items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 transition-[background-color,border-color,box-shadow] duration-300 ease-out hover:bg-[var(--surface-hover)] hover:border-[color-mix(in_srgb,var(--accent-sage)_45%,var(--border))] hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_color-mix(in_srgb,var(--accent-sage)_12%,transparent)]"
          {...(prefersReducedMotion
            ? {}
            : {
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.98, transition: { duration: 0.1 } },
                transition: { duration: 0.3 },
              })}
        >
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface-muted)]">
            {track.image ? (
              // eslint-disable-next-line @next/next/no-img-element -- remote Last.fm art on static export
              <img
                src={track.image}
                alt=""
                width={56}
                height={56}
                className="h-full w-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg text-[var(--text-muted)]">
                ♪
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              {track.nowPlaying ? (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-[var(--accent-sage)]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-sage)] opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent-sage)]" />
                  </span>
                  Now playing
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-[var(--text-muted)]">
                  Last played
                  {track.playedAt != null && (
                    <span
                      className="normal-case tracking-normal text-[var(--text-muted)]"
                      title={new Date(track.playedAt * 1000).toLocaleString()}
                    >
                      · {formatPlayedAt(track.playedAt, nowMs)}
                    </span>
                  )}
                </span>
              )}
            </div>
            <p className="truncate text-sm font-semibold text-[var(--foreground)]">
              {track.name}
            </p>
            <p className="truncate text-xs text-[var(--text-muted)]">
              {track.artist}
              {track.album ? ` · ${track.album}` : ""}
            </p>
          </div>
        </m.a>
      )}
    </m.div>
  );
}
