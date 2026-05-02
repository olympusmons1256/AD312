import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// API endpoint and helper function for making JSON requests
const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts'

const requestJson = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    ...options
  })

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

// Main component for managing blog posts with TanStack Query
function CrudQueryExplorer() {
  const queryClient = useQueryClient()

  const [userFilterInput, setUserFilterInput] = useState('')
  const [activeUserFilter, setActiveUserFilter] = useState('')

  const [createUserId, setCreateUserId] = useState('1')
  const [createTitle, setCreateTitle] = useState('')
  const [createBody, setCreateBody] = useState('')

  const [editPostId, setEditPostId] = useState('')
  const [putTitle, setPutTitle] = useState('')
  const [putBody, setPutBody] = useState('')

  const [patchPostId, setPatchPostId] = useState('')
  const [patchTitle, setPatchTitle] = useState('')

  // Fetch posts
  const postsQuery = useQuery({
    queryKey: ['json-posts', activeUserFilter],
    queryFn: async () => {
      const url = activeUserFilter ? `${POSTS_API_URL}?userId=${activeUserFilter}` : POSTS_API_URL
      return requestJson(url)
    }
  })

  // Extract posts data or default to an empty array
  const posts = postsQuery.data ?? []
  
  // Take first 20 posts to manage rendering
  const postOptions = useMemo(() => posts.slice(0, 20), [posts])
  
  // sends a POST request to create a new post, then updates the cache to include the new post if it matches the active filter
  const createPostMutation = useMutation({
    mutationFn: (newPost) =>
      requestJson(POSTS_API_URL, {
        method: 'POST',
        body: JSON.stringify(newPost)
      }),
    onSuccess: (createdPost, variables) => {
      queryClient.setQueryData(['json-posts', activeUserFilter], (current = []) => {
        const shouldAdd = !activeUserFilter || String(variables.userId) === String(activeUserFilter)
        if (!shouldAdd) {
          return current
        }

        return [
          {
            id: createdPost?.id ?? Date.now(),
            userId: Number(variables.userId),
            title: variables.title,
            body: variables.body
          },
          ...current
        ]
      })
    }
  })

  // sends a PUT request to replace an existing post, then updates the cache to reflect the changes
  const replacePostMutation = useMutation({
    mutationFn: ({ postId, title, body }) =>
      requestJson(`${POSTS_API_URL}/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: Number(postId),
          userId: 1,
          title,
          body
        })
      }),
    onSuccess: (updatedPost, variables) => {
      queryClient.setQueryData(['json-posts', activeUserFilter], (current = []) =>
        current.map((post) =>
          String(post.id) === String(variables.postId)
            ? {
                ...post,
                title: updatedPost?.title ?? variables.title,
                body: updatedPost?.body ?? variables.body
              }
            : post
        )
      )
    }
  })
  
  // sends a PATCH request to update the title of an existing post, then updates the cache to reflect the title change
  const patchPostMutation = useMutation({
    mutationFn: ({ postId, title }) =>
      requestJson(`${POSTS_API_URL}/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({ title })
      }),
    onSuccess: (patchedPost, variables) => {
      queryClient.setQueryData(['json-posts', activeUserFilter], (current = []) =>
        current.map((post) =>
          String(post.id) === String(variables.postId)
            ? {
                ...post,
                title: patchedPost?.title ?? variables.title
              }
            : post
        )
      )
    }
  })
  
  // sends a DELETE request to remove a post, then updates the cache to remove the deleted post from the list
  const deletePostMutation = useMutation({
    mutationFn: (postId) =>
      requestJson(`${POSTS_API_URL}/${postId}`, {
        method: 'DELETE'
      }),
    onSuccess: (_, postId) => {
      queryClient.setQueryData(['json-posts', activeUserFilter], (current = []) =>
        current.filter((post) => String(post.id) !== String(postId))
      )
    }
  })

  // Applies the user ID filter to the posts query by updating the activeUserFilter state, which triggers a refetch of the posts with the new filter applied
  const applyFilter = () => {
    const sanitized = userFilterInput.trim()
    setActiveUserFilter(sanitized)
  }

  // Clears the user ID filter by resetting the activeUserFilter state and the input field
  const clearFilter = () => {
    setUserFilterInput('')
    setActiveUserFilter('')
  }

  // Handles the creation of a new post by validating the input fields and triggering the createPostMutation with the new post data. After the mutation is triggered, it resets the input fields to their default state.
  const handleCreatePost = () => {
    if (!createTitle.trim() || !createBody.trim() || !createUserId.trim()) {
      return
    }

    createPostMutation.mutate({
      userId: Number(createUserId),
      title: createTitle.trim(),
      body: createBody.trim()
    })

    setCreateTitle('')
    setCreateBody('')
  }

  const handlePut = () => {
    if (!editPostId.trim() || !putTitle.trim() || !putBody.trim()) {
      return
    }

    replacePostMutation.mutate({
      postId: editPostId.trim(),
      title: putTitle.trim(),
      body: putBody.trim()
    })
  }

  const handlePatch = () => {
    if (!patchPostId.trim() || !patchTitle.trim()) {
      return
    }

    patchPostMutation.mutate({
      postId: patchPostId.trim(),
      title: patchTitle.trim()
    })
  }

  return (
    <section className="crud-query-card">
      <h2>JSONPlaceholder CRUD with TanStack Query</h2>

      <div className="crud-block">
        <h3>Filter Posts by User ID</h3>
        <div className="crud-row">
          <input
            type="number"
            min="1"
            value={userFilterInput}
            onChange={(event) => setUserFilterInput(event.target.value)}
            placeholder="User ID"
          />
          <button onClick={applyFilter}>Apply Filter</button>
          <button onClick={clearFilter}>Clear</button>
        </div>
        <p className="crud-note">Active filter: {activeUserFilter || 'None (all users)'}</p>
      </div>

      <div className="crud-block">
        <h3>Create Post (POST)</h3>
        <div className="crud-grid">
          <input
            type="number"
            min="1"
            value={createUserId}
            onChange={(event) => setCreateUserId(event.target.value)}
            placeholder="User ID"
          />
          <input
            type="text"
            value={createTitle}
            onChange={(event) => setCreateTitle(event.target.value)}
            placeholder="Post title"
          />
          <input
            type="text"
            value={createBody}
            onChange={(event) => setCreateBody(event.target.value)}
            placeholder="Post body"
          />
          <button onClick={handleCreatePost} disabled={createPostMutation.isPending}>
            {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </div>

      <div className="crud-block">
        <h3>Replace Post (PUT)</h3>
        <div className="crud-grid">
          <input
            type="number"
            min="1"
            value={editPostId}
            onChange={(event) => setEditPostId(event.target.value)}
            placeholder="Post ID"
          />
          <input
            type="text"
            value={putTitle}
            onChange={(event) => setPutTitle(event.target.value)}
            placeholder="New title"
          />
          <input
            type="text"
            value={putBody}
            onChange={(event) => setPutBody(event.target.value)}
            placeholder="New body"
          />
          <button onClick={handlePut} disabled={replacePostMutation.isPending}>
            {replacePostMutation.isPending ? 'Updating...' : 'Send PUT'}
          </button>
        </div>
      </div>

      <div className="crud-block">
        <h3>Patch Post Title (PATCH)</h3>
        <div className="crud-grid">
          <input
            type="number"
            min="1"
            value={patchPostId}
            onChange={(event) => setPatchPostId(event.target.value)}
            placeholder="Post ID"
          />
          <input
            type="text"
            value={patchTitle}
            onChange={(event) => setPatchTitle(event.target.value)}
            placeholder="Patched title"
          />
          <button onClick={handlePatch} disabled={patchPostMutation.isPending}>
            {patchPostMutation.isPending ? 'Patching...' : 'Send PATCH'}
          </button>
        </div>
      </div>

      <div className="crud-block">
        <h3>Posts List (GET + DELETE)</h3>

        {postsQuery.isPending && <p className="status pending">Loading posts...</p>}
        {postsQuery.isError && <p className="status error">Error loading posts: {postsQuery.error.message}</p>}

        {postsQuery.isSuccess && (
          <>
            <p className="status success">Showing {postOptions.length} posts.</p>
            <ul className="crud-post-list">
              {postOptions.map((post) => (
                <li key={post.id} className="crud-post-item">
                  <p className="crud-post-title">
                    #{post.id} (User {post.userId}) — {post.title}
                  </p>
                  <p className="crud-post-body">{post.body}</p>
                  <button
                    className="danger-btn"
                    onClick={() => deletePostMutation.mutate(post.id)}
                    disabled={deletePostMutation.isPending}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  )
}

export default CrudQueryExplorer