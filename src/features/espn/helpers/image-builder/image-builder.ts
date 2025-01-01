import { exists } from 'sports-ui-sdk';
import { CDN_COMBINER } from '../../constants';

export function ImageBuilder({ league, sport }: { league?: string; sport?: string }) {
  return class ImageBuilderClass {
    private static readonly _cdn = CDN_COMBINER;
    private static readonly _cdnCombiner = CDN_COMBINER;

    private static _sport = sport;
    private static _league = league;

    static get sportIconImgBuilder(): string {
      return `${this._cdnCombiner}?img=/redesign/assets/img/icons/ESPN-icon-${this._sport?.toLowerCase().replace('ice ', '')}.png&h=100&w=100`;
    }

    static logoImgBuilder({ id, width, height }: ImageBuilderInput): string {
      const w = exists(width) ? width : 100;
      const h = exists(height) ? height : 100;

      return `${this._cdn}?img=/i/teamlogos/${this._league}/500/${id}.png&w=${w}&h=${h}&cb=1`;
    }

    static headshotImgBuilder({ id, width, height }: ImageBuilderInput): string {
      const w = exists(width) ? width : 55;
      const h = exists(height) ? height : 40;

      return `${this._cdn}?img=/i/headshots/${this._league}/players/full/${id}.png&w=${w}&h=${h}&cb=1`;
    }
  };
}

export type ImageBuilderInput = {
  id: number | string;
  /**
   * @deprecated
   */
  league?: string;
  width?: number;
  height?: number;
};
