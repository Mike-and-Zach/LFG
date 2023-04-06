const Post = ({posts}) => {
    return (
        <div>
            {posts.slice(0).reverse().map(post => {
                return (
                    <div key={post.id}>
                        <p>{post.gameTitle}</p>
                        <p>{post.description}</p>
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}

export default Post