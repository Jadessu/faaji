export type Theme = 'default' | 'valentines' | 'ghana' | 'stpatrick';

export interface ThemeConfig {
  /** Fixed countdown target: [year, month (1-12), day, hour (0-23)] */
  countdownTarget?: [number, number, number, number];
  /** When this theme goes live: [year, month (1-12), day, hour] */
  activeFrom?: [number, number, number, number];
  /** When this theme ends (reverts to default): [year, month (1-12), day, hour] */
  activeTo?: [number, number, number, number];
}

export const THEME_CONFIGS: Partial<Record<Theme, ThemeConfig>> = {
  ghana: {
    countdownTarget: [2026, 3, 6, 23],  // March 6 2026, 11 PM
    activeFrom:      [2026, 2, 28, 6],  // Feb 28 2026, 6 AM (day after Feb 27 party)
    activeTo:        [2026, 3, 7, 6],   // March 7 2026, 6 AM (day after Ghana party)
  },
  stpatrick: {
    countdownTarget: [2026, 3, 13, 23], // March 13 2026, 11 PM
    activeFrom:      [2026, 3, 7, 6],   // March 7 2026, 6 AM (day after Ghana party)
    activeTo:        [2026, 3, 14, 6],  // March 14 2026, 6 AM (day after St. Patrick's party)
  },
};

function toDate([y, m, d, h]: [number, number, number, number]) {
  return new Date(y, m - 1, d, h, 0, 0);
}

function computeActiveTheme(): Theme {
  const now = new Date();
  for (const [theme, config] of Object.entries(THEME_CONFIGS) as [Theme, ThemeConfig][]) {
    if (!config.activeFrom || !config.activeTo) continue;
    if (now >= toDate(config.activeFrom) && now < toDate(config.activeTo)) {
      return theme as Theme;
    }
  }
  return 'default';
}

export const ACTIVE_THEME: Theme = computeActiveTheme();
