import {SET_ACTIVE_STORY} from '../actions/storyActions';

const intitialState = {
  activeStory: null,
  storyMenuActive: false,
};

const uiReducer = (state = intitialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_STORY:
      return Object.assign({}, state, {
        activeStory: action.story,
      });
    default:
      return state;
  }
};

export default uiReducer;
