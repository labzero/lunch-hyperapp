import { h, app } from 'hyperapp';
import { getTeamsById } from './selectors/teams';
import { state, State } from './state';

interface Actions {
  [key: string]: Hyperapp.ActionType<State, Actions>,
};

const apiFetch = (
  { method = 'GET', path, team }: { method?: string, path: string, team?: string }
) => {
  const url = `http://${team ? `${team}.` : ''}local.lunch.pink:3000/api${path}`;
  return fetch(url, {
    credentials: process.env.CORS ? 'include' : 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method,
    mode: process.env.CORS ? 'cors' : 'same-origin',
  }).then(response => response.json());
}

const actions: Actions = {
  getTeams: () => (state, actions) =>
    apiFetch({ path: '/teams' })
      .then(json => actions.receiveTeams(json.data)),
  getRestaurants: () => (state, actions) =>
    apiFetch({ path: '/restaurants', team: state.team.slug })
      .then(json => actions.receiveRestaurants(json.data)),
  receiveRestaurants: value => ({ restaurants: value }),
  receiveTeams: value => ({ teams: value }),
  setTeam: value => (state, actions) => {
    const team = getTeamsById(state)[value];
    return ({ team });
  },
  setTeamAndGetRestaurants: event => (state, actions) => {
    actions.setTeam(event.target.value);
    actions.getRestaurants();
  },
};

const view = (state: State, actions: Actions) => {
  if (!state.teams) {
    actions.getTeams();
    return null;
  }

  return (
    <div>
      {state.teams && (
        <select onchange={actions.setTeamAndGetRestaurants} >
          {state.teams.map(t => (
            <option value={t.id}>{t.name}</option>
          ))}
        </select>
      )}
      {state.restaurants && state.restaurants.map(r => (
        <div>{r.name}</div>
      ))}
    </div>
  );
};

app(state, actions, view, document.getElementById('root'));
