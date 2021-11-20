import React, { useState } from 'react'

const Blog = ({ blog, liked, deleted }) => {
  const [fullInfo, setFullInfo] = useState(false)

  return(
    <>
      {
        !fullInfo &&
          <div className='blog'>
            <span>
              {blog.title} {blog.author}
            </span>
            <button style={{ marginLeft: '10px' }} onClick={() => setFullInfo(true)}>info</button>
          </div>
      }
      {
        fullInfo &&
          <div className='blog'>
            <span>
              {/* {JSON.stringify(blog)} */}
              <div>{blog.title} {blog.author}</div>
              <div>{blog.url}</div>
              <div>likes {blog.likes}</div>
              <div>{ blog.user ? blog.user.username : '' }</div>
            </span>
            <button onClick={() => setFullInfo(false)}>hide info</button>
          </div>
      }
      <button className="like" onClick={() => liked()}>like</button>
      <button className="delete" onClick={() => deleted()}>delete</button>
    </>
  )
}

export default Blog