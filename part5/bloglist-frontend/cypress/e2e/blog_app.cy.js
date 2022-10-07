describe('Blog', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Mg Lay',
            username: 'root',
            password: 'root'
        }

        const user2 = {
            name: 'God',
            username: 'god',
            password: 'god'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.request('POST', 'http://localhost:3003/api/users/', user2)

        cy.visit('http://localhost:3000')
    })
    it('login page can be found', function() {
        cy.contains('Login to Blog List')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('input:first').type('root')
            cy.get('input:last').type('root')
            cy.get('#login-button').click()

            cy.contains('Mg Lay logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('input:first').type('root')
            cy.get('input:last').type('wrong')
            cy.get('#login-button').click()

            cy.contains('invalid username or password')
            cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            const user = {
                username: 'root',
                password: 'root'
            }
            const blog = {
                title: 'Like Hack',
                author: 'Me',
                url: 't.me',
                likes: 5
            }
            cy.request('POST', 'http://localhost:3003/api/login', user)
                .then(response => {
                    localStorage.setItem('loggedBloglistUser', JSON.stringify(response.body))
                    cy.createBlog(blog)
                    cy.visit('http://localhost:3000')
            })
            cy.createBlog(blog)
        })

        it('A blog can be created', function() {
            cy.contains('create new').click()
            cy.get('#title').type('test title')
            cy.get('#author').type('test author')
            cy.get('#url').type('test url')
            cy.get('#create').click()

            cy.contains('a new blog test title is added')
        })

        it('user can like a blog', function() {
            cy.contains('view').click()
            cy.contains('likes:5').parent().find('#likeButton').click()
            cy.contains('likes:6')
        })

        it('user who create blog can delete it', function() {
            cy.contains('view').click()
            cy.contains('remove').click()
                .contains('Like Hack')
                .should('not.exist')
        })
        describe('delete a blog', function() {
            beforeEach(function() {
                const blog = {
                    title: 'Post by God ',
                    author: 'God',
                    url: 'cannotdelete.com',
                    likes: 999
                }

                const user = {
                    username: 'god',
                    password: 'god'
                }

                cy.request('POST', 'http://localhost:3003/api/login', user)
                    .then(response => {
                        const token = response.body.token
                        cy.request({
                            url: 'http://localhost:3003/api/blogs',
                            method: 'POST',
                            body: blog,
                            headers: {
                                'Authorization': `bearer ${token}`
                            }
                        })
                        cy.visit('http://localhost:3000')
                })

            })

            it('another user cannot delete blog', function() {
                cy.contains('Post by God').parent().find('button').click()
                cy.contains('remove').should('not.exist')
            })
        })

        describe('blogs are sorted', function() {
            beforeEach(function() {
                const blog = {
                    title: 'The title with the most likes',
                    author: 'Me',
                    url: 't.me',
                    likes: 999
                }

                const blog2 = {
                    title: 'The title with the second most likes',
                    author: 'Me',
                    url: 't.me',
                    likes: 500
                }

                const blog3 = {
                    title: 'The title with the 400 likes',
                    author: 'Me',
                    url: 't.me',
                    likes: 400
                }

                cy.createBlog(blog3)
                cy.createBlog(blog)
                cy.createBlog(blog2)
                
                cy.visit('http://localhost:3000')
            })
            it('sorted by likes', function() {
                cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
            })
        })

    })


})