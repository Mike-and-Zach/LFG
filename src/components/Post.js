const Post = ({posts}) => {
    

    return (
        <div>
            {posts.slice(0).reverse().map(post => {
                return (
                    <div key={post.id}>
                        <p>{post.gameTitle}</p>
                        <p>{post.description}</p>
                        <h4>Comments:</h4> <br />
                        <button>Comment</button>
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}

export default Post