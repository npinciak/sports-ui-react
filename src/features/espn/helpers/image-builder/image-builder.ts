import { exists } from '@shared/helpers/exists';
import { CDN_A, CDN_COMBINER, CDN_G } from '../../constants';
import { FantasySportsAbbreviation, SportLeague } from '../endpoint-builder/endpoint-builder.model';

export function ImageBuilder({ league, sport }: { league?: SportLeague; sport?: FantasySportsAbbreviation }) {
  return class ImageBuilderClass {
    private static readonly _cdn = CDN_A;
    private static readonly _cdnG = CDN_G;
    private static readonly _cdnCombiner = CDN_COMBINER;

    private static _sport = sport;
    private static _league = league;

    static get sportIconImgBuilder(): string {
      return `${this._cdnCombiner}?img=/redesign/assets/img/icons/ESPN-icon-${this._sport?.toLowerCase().replace('ice ', '')}.png&h=100&w=100`;
    }

    static teamLogoImgBuilder({ id, width, height }: ImageBuilderInput): string {
      const w = exists(width) ? width : 100;
      const h = exists(height) ? height : 100;

      return `${this._cdn}?img=/i/teamlogos/${this._league}/500/${id}.png&w=${w}&h=${h}&cb=1`;
    }

    static headshotImgBuilder({ id, width, height }: ImageBuilderInput): string {
      const w = exists(width) ? width : 426;
      const h = exists(height) ? height : 320;

      return `${this._cdnCombiner}?img=/i/headshots/${this._league}/players/full/${id}.png&w=${w}&h=${h}&cb=1`;
    }

    static get fantasySportLeagueImage() {
      return `${this._cdnG}/lm-static/${this._sport}/images/${this._sport}-shield-shield.svg`;
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
