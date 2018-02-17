import { h, app } from 'hyperapp';

interface Restaurant {
  name: string,
};

interface State {
  restaurants: undefined | Array<Restaurant>,
};

const state: State = {
  restaurants: undefined,
};

type Action = (state: State, actions: Actions) => Partial<State>;

interface Actions {
  getRestaurants: () => (state: State, actions: Actions) => Promise<Action>,
  receiveRestaurants: (value: Array<Restaurant>) => Action,
};

const actions: Actions = {
  getRestaurants: () => (state, actions) =>
    fetch('http://labzero.local.lunch.pink:3000/api/restaurants', {
      credentials: process.env.CORS ? 'include' : 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      mode: process.env.CORS ? 'cors' : 'same-origin',
    })
      .then(response => response.json())
      .then(json => actions.receiveRestaurants(json.data)),
  receiveRestaurants: value => (state, actions) =>
    ({ restaurants: value }),
};

const view = (state: State, actions: Actions) => {
  if (!state.restaurants) {
    actions.getRestaurants();
    return null;
  }

  return (
    <div>
      {state.restaurants.map(r => (
        <div>{r.name}</div>
      ))}
    </div>
  );
};

app(state, actions, view, document.getElementById('root'));
