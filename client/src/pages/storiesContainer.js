import {connect} from 'react-redux';
import {setActiveStory} from 'state/actions/storyActions';
import Stories from './stories';

const mapStateToProps = state => {
  return {
    activeStory: state.storyReducer.activeStory,
  };
};

export default connect(mapStateToProps, {
  setActiveStory,
})(Stories);
