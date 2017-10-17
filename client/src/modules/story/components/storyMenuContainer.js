import {connect} from 'react-redux';
import {gql, graphql} from 'react-apollo';
import StoryMenu from './storyMenu';

const favoriteStoryMutation = gql`
  mutation favoriteStory($storyId: String!, $favorite: Boolean!) {
    favoriteStory(storyId: $storyId, favorite: $favorite) {
      id
      favorites
    }
  }
`;

const storyMenuWithMutation = graphql(favoriteStoryMutation, {
  options: {
    updateQueries: {
      AllStories: (previousData, {mutationResult}) => {
        console.log(previousData);
        console.log(mutationResult);
        const {id, favorites} = mutationResult.data.favoriteStory;
        console.log(id, favorites);
        // const newComment = mutationResult.data.submitComment;
        // // Note how we return a new copy of `previousData` instead of mutating
        // // it. This is just like a Redux reducer!
        // return {
        //   ...previousData,
        //   entry: {
        //     ...previousData.entry,
        //     comments: [newComment, ...previousData.entry.comments],
        //   },
        // };
      },
    },
  },
})(StoryMenu);

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps)(storyMenuWithMutation);
