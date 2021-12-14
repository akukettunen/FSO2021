import React, { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'

const Blog = ({ addBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  return(
    <>
      <h3>+ New blog</h3>
      <form onSubmit={(event) => addBlog({ e: event, blogTitle, blogAuthor, blogUrl })}>
        <Box>
          <TextField size="small" id="title" value={blogTitle} placeholder="title" onChange={({ target }) => setBlogTitle(target.value)}/><br/>
          <TextField size="small" id="author" value={blogAuthor} placeholder="author" onChange={({ target }) => setBlogAuthor(target.value)}/><br/>
          <TextField size="small" id="url" value={blogUrl} placeholder="url" onChange={({ target }) => setBlogUrl(target.value)}/>
        </Box>
        <Button sx={{ my: 2 }}variant="contained" id="submitBlogButton" type="submit">send</Button>
      </form>
    </>
  )
}

export default Blog