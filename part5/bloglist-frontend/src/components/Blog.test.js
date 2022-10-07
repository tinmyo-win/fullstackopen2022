import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('component displays title and author only', () => {
    const blog = {
        title : 'test title',
        author: 'test author',
        likes : 9,
        url: 'test url'
    }

    const { container } = render(<Blog blog={blog} />)

    const div = container.querySelector('.blog')
    
    expect(div).toHaveTextContent(
        'test title'
    )
    expect(div).toHaveTextContent(
        'test author'
    )
    expect(div).not.toHaveTextContent(
        9
    )
    expect(div).not.toHaveTextContent(
        'test url'
    )
})

test('blog\'s details are shown after clicking view button', async () => {
    const blog = {
        title : 'test title',
        author: 'test author',
        likes : 9,
        url: 'test url'
    }
    const mockHandler = jest.fn()

    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')

    await user.click(button)

    const div = container.querySelector('.blog-detail')

    expect(div).toHaveTextContent(
        'test title'
    )
    expect(div).toHaveTextContent(
        'test author'
    )
    expect(div).toHaveTextContent(
        9
    )
    expect(div).toHaveTextContent(
        'test url'
    )

})

test('count of like after multiclick', async () => {
    const blog = {
        title : 'test title',
        author: 'test author',
        likes : 9,
        url: 'test url'
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleLikeUpdate={mockHandler} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')

    await user.click(viewButton)
    
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})