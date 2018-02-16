import { h, app } from 'hyperapp';

interface State {
  count: number,
};

const state: State = {
  count: 0,
};

interface Actions {
  down: (value: number) => (state: State) => State,
  up: (value: number) => (state: State) => State,
};

const actions: Actions = {
  down: value => state => ({ count: state.count - value }),
  up: value => state => ({ count: state.count + value }),
};

const view = (state: State, actions: Actions) => (
  <div>
    <h1>{state.count}</h1>
    <button onclick={() => actions.down(1)}>-</button>
    <button onclick={() => actions.up(1)}>+</button>
  </div>
);

app(state, actions, view, document.body);
