export const CDN = import.meta.env.VITE_ESPN_CDN;
export const CDN_COMBINER = CDN + 'combiner/i';
export const CDN_REDESIGN_IMG = CDN + 'redesign/assets/img';

export const FASTCAST_SERVICE_URI = import.meta.env.VITE_ESPN_FASTCAST_SERVICE_URI;
export const FASTCAST_BASE = import.meta.env.VITE_ESPN_FASTCAST_BASE! + FASTCAST_SERVICE_URI + '/topic';

export const ICON_PATH = `${CDN_REDESIGN_IMG}/sprites/transitional-secondary-navigation-icons-v4.png`;

export const NO_LOGO = `${CDN_COMBINER}?img=/i/teamlogos/default-team-logo-500.png&h=100&scale=crop&w=100&location=origin`;

export function fastcastURIBuilder(eventType: string | null, messageId: string | undefined) {
  if (!messageId) return '';
  return `${FASTCAST_BASE}/${eventType}/message/${messageId}/checkpoint`;
}

export const FASTCAST_DATE_SHORT = 'EEE h:mm a';
