import {gql, graphql} from 'react-apollo';
import Homepage from './home';

const StoriesQuery = gql`
  query AllStories {
    stories {
      id
    }
  }
`;

const HomepageContainer = graphql(StoriesQuery)(Homepage);

export default HomepageContainer;
