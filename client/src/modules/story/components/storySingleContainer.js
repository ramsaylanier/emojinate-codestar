import {graphql, gql} from 'react-apollo';
import Story from './storySingle';

const StoryQuery = gql`
  query Story($id: String!) {
    story(id: $id) {
      title
      storyText
      emojis
      authorId
      created_at
    }
  }
`;

const StoryWithData = graphql(StoryQuery, {
  options: props => ({
    variables: {
      id: props.match.params.id,
    },
  }),
})(Story);

export default StoryWithData;
