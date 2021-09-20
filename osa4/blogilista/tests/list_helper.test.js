const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

describe('dummy function', () => {
  test('returns one', () => {
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('totalLikes', () => {
  test('five blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

  test('empty list returns zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('one blog returns the likes of that', () => {
    const result = listHelper.totalLikes([blogs[0]])
    expect(result).toBe(blogs[0].likes)
  })
})

describe('favorite blog', () => {
  test('empty array returns undefined', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual(undefined)
  })

  test('one blog returns itself', () => {
    const result = listHelper.favoriteBlog([blogs[1]])
    expect(result).toEqual({
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5
    })
  })

  test('list returns the one w/ most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(  {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    })
  })
})

describe('most blogs', () => {
  test('finds the author w/ most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3
    })
  })

  test('empty list returns undefined', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBe(undefined)
  })

  test('one blog returns the author and one', () => {
    const result = listHelper.mostBlogs([blogs[2]])
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1
    })
  })
})

describe('most likes', () => {
  test('finds the author w/ most likes in totals', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })

  test('empty list returns undefined', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBe(undefined)
  })

  test('one blog returns the author and one', () => {
    const result = listHelper.mostLikes([blogs[2]])
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: blogs[2].likes
    })
  })
})