import React from 'react';
import "./HealthBlog.css";

class HealthBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [] // Array to hold blog posts
    };
  }

  componentDidMount() {
    // Fetch blog posts from an API when the component mounts
    // You can replace this with actual API call
    this.fetchPosts();
  }

  fetchPosts() {
    // Simulated data for demonstration purposes
    const posts = [
      {
        id: 1,
        title: 'The Importance of Exercise',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
      },
      {
        id: 2,
        title: 'Healthy Eating Habits',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
      },
      {
        id: 3,
        title: 'Tips for Better Sleep',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
      }
      // Add more posts as needed
    ];

    // Update state with fetched posts
    this.setState({ posts });
  }

  render() {
    return (
      <div className='blog-container'>
        <h1>Health Blog</h1>
        <div className="posts">
          {this.state.posts.map(post => (
            <div key={post.id} className="post">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default HealthBlog;