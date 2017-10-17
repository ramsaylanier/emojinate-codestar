export const SET_ACTIVE_STORY = 'SET_ACTIVE_STORY';

export function setActiveStory(story) {
  return {
    type: SET_ACTIVE_STORY,
    story: story,
  };
}
