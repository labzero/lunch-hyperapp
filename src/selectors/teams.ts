import { createSelector } from 'reselect';
import { State } from '../state';
import { Team } from '../models/team';

export const getTeams = (state: State) => state.teams;

export const getTeamsById = createSelector(
  getTeams,
  teams => {
    let initialValue: {[key: string]: Team} = {};
    return teams.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, initialValue);
  }
);
