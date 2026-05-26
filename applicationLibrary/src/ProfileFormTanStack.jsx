import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const PROFILE_URL = 'http://localhost:3001/profile'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/

async function fetchProfile() {
  const res = await fetch(PROFILE_URL)
  if (!res.ok) throw new Error('Failed to fetch profile.')
  return res.json()
}

async function saveProfile(data) {
  // Simulate a 409 Conflict for a known email
  if (data.email === 'conflict@example.com') {
    return Promise.reject({
      field: 'email',
      message: 'This email is already in use by another account.',
    })
  }
  const res = await fetch(PROFILE_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Failed to save profile.')
  return res.json()
}

export default function ProfileFormTanStack() {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchProfile,
  })

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isDirty, isSubmitSuccessful },
  } = useForm({ mode: 'onChange' })

  // Seed form fields once server data resolves
  useEffect(() => {
    if (data) reset(data)
  }, [data, reset])

  const mutation = useMutation({
    mutationFn: saveProfile,
    onSuccess: (updatedData) => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
      reset(updatedData)
    },
    onError: (err) => {
      if (err?.field) {
        setError(err.field, { type: 'server', message: err.message })
      }
    },
  })

  const onSubmit = (formData) => mutation.mutate(formData)

  return (
    <div className="card profile-tanstack-wrapper">
      <h2 className="card-title">User Profile — RHF + TanStack Query</h2>
      <p className="card-subtitle">
        Form state managed by React Hook Form · Server state managed by TanStack Query
      </p>

      {isLoading && (
        <div className="pts-status pts-status--loading">⏳ Loading profile from server...</div>
      )}

      {isError && (
        <div className="pts-status pts-status--error">
          ⚠️ Could not reach the mock API. Run <code>npm run api</code> to start JSON Server.
        </div>
      )}

      {isSubmitSuccessful && !mutation.isPending && !mutation.isError && (
        <div className="pts-status pts-status--success">✅ Profile saved successfully.</div>
      )}

      {!isLoading && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="pts-form">

          {/* Username */}
          <div className="pts-field">
            <label htmlFor="pts-username">Username</label>
            <input
              id="pts-username"
              type="text"
              {...register('username', {
                required: 'Username is required.',
                minLength: { value: 3, message: 'Must be at least 3 characters.' },
              })}
            />
            {errors.username && <span className="pts-error">{errors.username.message}</span>}
          </div>

          {/* Email */}
          <div className="pts-field">
            <label htmlFor="pts-email">Email Address</label>
            <input
              id="pts-email"
              type="email"
              {...register('email', {
                required: 'Email is required.',
                pattern: { value: EMAIL_REGEX, message: 'Enter a valid email address.' },
              })}
            />
            {errors.email && <span className="pts-error">{errors.email.message}</span>}
          </div>

          {/* Bio */}
          <div className="pts-field">
            <label htmlFor="pts-bio">Bio</label>
            <textarea
              id="pts-bio"
              rows={4}
              {...register('bio')}
            />
          </div>

          {/* Notifications */}
          <div className="pts-field pts-field--checkbox">
            <label className="pts-checkbox-label">
              <input type="checkbox" {...register('notifications')} />
              Enable email notifications
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isDirty || mutation.isPending}
            className="pts-submit-btn"
          >
            {mutation.isPending ? 'Saving...' : 'Save Profile'}
          </button>

        </form>
      )}
    </div>
  )
}
