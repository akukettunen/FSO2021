import React, { useState } from 'react'
import { Card, Typography, Button, Box } from '@mui/material'

const Blog = ({ blog, liked, deleted }) => {
  const [fullInfo, setFullInfo] = useState(false)

  return(
    <>
      <Card elevation="2" sx={{ p: 2, my: 2 }} className='blog'>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Box>
              <Typography>{blog.title} {blog.author}</Typography>
              {
                fullInfo &&
                <div>
                  <Typography>{blog.url}</Typography>
                  <Typography>likes {blog.likes}</Typography>
                  <Typography>{ blog.user ? blog.user.username : '' }</Typography>
                </div>
              }
            </Box>
            <v-spacer></v-spacer>
            <div>
              <Button variant="contained" onClick={() => setFullInfo(!fullInfo)}>info</Button>
              <Button variant="contained" className="like" onClick={() => liked()}>like</Button>
              <Button variant="contained" className="delete" onClick={() => deleted()}>delete</Button>
            </div>
          </Box>
      </Card>
    </>
  )
}

export default Blog