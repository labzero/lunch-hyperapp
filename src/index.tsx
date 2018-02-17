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

interface Actions {
  // todo fix any
  getRestaurants: () => (state: State, actions: Actions) => Promise<any>,
  // todo doesn't actually return full state, just a slice
  receiveRestaurants: (value: Array<Restaurant>) => (state: State, actions: Actions) => State,
};

const actions: Actions = {
  getRestaurants: () => (state, actions) =>
    fetch('http://labzero.local.lunch.pink:3000/api/restaurants', {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
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
