import {graphql, gql} from 'react-apollo';
import {withRouter} from 'react-router';
import StoryList from './storyList';

const StoriesQuery = gql`
  query AllStories($authorId: String) {
    stories(authorId: $authorId) {
      id
      title
      storyText
      emojis
      authorId
      created_at
      favorites
    }
  }
`;

const StoryListWithData = graphql(StoriesQuery, {
  options: props => ({
    variables: {
      authorId: props.authorId,
    },
  }),
})(StoryList);

export default withRouter(StoryListWithData);
