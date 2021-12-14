describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Aku Kettunen',
      username: 'akukete',
      password: 'salasana'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('open with login form visible', function() {
    cy.contains('login')
  })

  it('login with wrong credentials', function() {
    cy.get('#username').type('akukete')
    cy.get('#password').type('vaarasalasanas')
    cy.get('#loginButton').click()

    cy.contains('invalid username or password')
  })

  it('login with right credentials', function() {
    cy.get('#username').type('akukete')
    cy.get('#password').type('salasana')
    cy.get('#loginButton').click()

    cy.contains('kirjautuminen onnistui')
  })

  describe('While logged in', function() {
    beforeEach(function() {
      cy.login()
    })

    it('can submit blog and it appears', function() {
      cy.get('.showButton:first').click()
      cy.contains('New blog')

      cy.get('#title').type('Kansainvälinen bisnes 101')
      cy.get('#author').type('Janne Sausage')
      cy.get('#url').type('malaga')

      cy.get('#submitBlogButton').click()

      cy.contains('Kansainvälinen bisnes 101')
    })

    it('can like blog', function() {
      cy.addBlog({ author: 'Jari Mäkelä', url: 'goog.le', title: 'Uudet teknologiat' })
      cy.contains('Uudet')
      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains('info').click()
      cy.contains('likes 2')

    })

    it('sorted by likes', function() {
      cy.addBlog({ author: 'Jari Mäkelä', url: 'goog.le', title: 'Uudet teknologiat 1', likes: 2 })
      cy.addBlog({ author: 'Jari Aarnio', url: 'goog.le', title: 'Uudet teknologiat 2', likes: 10 })
      cy.addBlog({ author: 'Meri Mäkelä', url: 'goog.le', title: 'Uudet teknologiat 3', likes: 5 })

      cy.get('.blog')
      .should('have.length', 3)
      .then(blogs => {
        return (
          Cypress.$.makeArray(blogs)
            .map((el) => el.innerText)
        )
      })
      .then(list => {
        cy.wrap(list[1]).should('match', /Meri Mäkelä/)
        cy.wrap(list[0]).should('match', /Jari Aarnio/)
        cy.wrap(list[2]).should('match', /Jari Mäkelä/)
      })
    })

    it('can delete blog', function() {
      cy.addBlog({ author: 'Jari Aarnio', url: 'goog.le', title: 'Uudet teknologiat 2' })
      cy.contains('delete').click()
      cy.get('.blog').should('have.length', 0)
    })
  })
})

Cypress.Commands.add('login', () => {
  cy.request({
    url: 'http://localhost:3003/api/login',
    method: 'POST',
    body: { username: 'akukete', password: 'salasana' },
  }).then(({ body }) => {
    localStorage.setItem('blogUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('addBlog', ({ title, url, author, likes }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, url, author, likes },
    headers: {
      'Authorization': `bearer ${JSON.parse(window.localStorage.getItem('blogUser')).token}`
    }
  }).then(() => {
    cy.visit('http://localhost:3000')
  })
})