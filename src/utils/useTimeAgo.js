// utils/timeDiff.js


export function useTimeAgo(lastLogin) {

  const now = new Date();
  const past = new Date(lastLogin);

  const diffMs = now.getTime() - past.getTime();

  return {
    milliseconds: diffMs,
    seconds: Math.floor(diffMs / 1000),
    minutes: Math.floor(diffMs / (1000 * 60)),
    hours: Math.floor(diffMs / (1000 * 60 * 60)),
    days: Math.floor(diffMs / (1000 * 60 * 60 * 24)),
  };
}
