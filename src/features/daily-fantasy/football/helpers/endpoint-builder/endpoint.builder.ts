import { DfsEndpointBuilder } from '../../../helpers/endpoint-builder/endpoint.builder';
import { GRID_IRON_PROJECTIONS } from '../../models';

export class FootballDfsEndpointBuilder extends DfsEndpointBuilder() {
  static gridIronProjectionByProjectionType(projectionType = GRID_IRON_PROJECTIONS.Default) {
    return `${this.dailyFantasyBase}/grids/${projectionType}.json`;
  }
}
