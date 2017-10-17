import {graphql, gql} from 'react-apollo';
import {connect} from 'react-redux';
import {throwAlert} from 'state/actions/uiActions';
import CreateStory from './createStory';

const CreateStoryMutation = gql`
  mutation createStory(
    $title: String!
    $storyText: String!
    $emojis: [String]
  ) {
    createStory(title: $title, storyText: $storyText, emojis: $emojis) {
      id
    }
  }
`;

const CreateStoryWithMutation = graphql(CreateStoryMutation)(CreateStory);
const CreateStoryWithMutationAndState = connect(null, {throwAlert})(
  CreateStoryWithMutation,
);
export default CreateStoryWithMutationAndState;
