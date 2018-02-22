import { Restaurant } from './models/restaurant';
import { Team } from './models/team';

export interface State {
  restaurants?: Array<Restaurant>,
  team?: Team,
  teams?: Array<Team>,
};

export const state: State = {};
