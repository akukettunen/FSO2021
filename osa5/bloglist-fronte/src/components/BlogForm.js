import React, { useState } from 'react'
const Blog = ({ addBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  return(
    <>
      <h3>+ New blog</h3>
      <form onSubmit={(event) => addBlog({ e: event, blogTitle, blogAuthor, blogUrl })}>
        <input id="title" value={blogTitle} placeholder="title" onChange={({ target }) => setBlogTitle(target.value)}/><br/>
        <input id="author" value={blogAuthor} placeholder="author" onChange={({ target }) => setBlogAuthor(target.value)}/><br/>
        <input id="url" value={blogUrl} placeholder="url" onChange={({ target }) => setBlogUrl(target.value)}/>
        <button id="submitBlogButton" type="submit">send</button>
      </form>
    </>
  )
}

export default Blog