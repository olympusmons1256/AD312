import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const DRAFT_KEY = 'registrationDraft'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

function simulateApiCall() {
  return new Promise((resolve) => setTimeout(resolve, 2000))
}

export default function UserRegistrationForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting, isValid, isSubmitSuccessful },
  } = useForm({ mode: 'onChange' })

  // ── Load draft from localStorage on mount ──────────────────────────────
  useEffect(() => {
    const draft = localStorage.getItem(DRAFT_KEY)
    if (draft) {
      const parsed = JSON.parse(draft)
      Object.entries(parsed).forEach(([key, value]) => setValue(key, value))
    }
  }, [setValue])

  // ── Persist draft to localStorage whenever any field changes ───────────
  useEffect(() => {
    const subscription = watch((values) => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(values))
    })
    return () => subscription.unsubscribe()
  }, [watch])

  // ── Clear success banner after a moment ────────────────────────────────
  const onSubmit = async () => {
    await simulateApiCall()
    reset()
    localStorage.removeItem(DRAFT_KEY)
  }

  const password = watch('password')

  return (
    <div className="reg-form-wrapper">
      <h2 className="reg-form-title">Create an Account</h2>

      {isSubmitSuccessful && (
        <div className="reg-banner reg-banner--success">
          ✅ Registration successful! Welcome aboard.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="reg-form">

        {/* Full Name */}
        <div className="reg-field">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            autoFocus
            placeholder="Jane Doe"
            {...register('fullName', {
              required: 'Full name is required.',
              minLength: { value: 3, message: 'Must be at least 3 characters.' },
            })}
          />
          {errors.fullName && <span className="reg-error">{errors.fullName.message}</span>}
        </div>

        {/* Email */}
        <div className="reg-field">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="jane@example.com"
            {...register('email', {
              required: 'Email address is required.',
              pattern: { value: EMAIL_REGEX, message: 'Enter a valid email address.' },
            })}
          />
          {errors.email && <span className="reg-error">{errors.email.message}</span>}
        </div>

        {/* Password */}
        <div className="reg-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Min 8 chars, upper, lower, number"
            {...register('password', {
              required: 'Password is required.',
              pattern: {
                value: PASSWORD_REGEX,
                message:
                  'Min 8 characters with at least one uppercase letter, one lowercase letter, and one number.',
              },
            })}
          />
          {errors.password && <span className="reg-error">{errors.password.message}</span>}
        </div>

        {/* Confirm Password */}
        <div className="reg-field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            {...register('confirmPassword', {
              required: 'Please confirm your password.',
              validate: (value) => value === password || 'Passwords do not match.',
            })}
          />
          {errors.confirmPassword && (
            <span className="reg-error">{errors.confirmPassword.message}</span>
          )}
        </div>

        {/* Role */}
        <div className="reg-field">
          <label htmlFor="role">Role / Account Type</label>
          <select
            id="role"
            {...register('role', {
              required: 'Please select a role.',
              validate: (value) => value !== '' || 'Please select a valid role.',
            })}
          >
            <option value="">Select a role...</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Product Manager">Product Manager</option>
          </select>
          {errors.role && <span className="reg-error">{errors.role.message}</span>}
        </div>

        {/* Terms & Conditions */}
        <div className="reg-field reg-field--checkbox">
          <label className="reg-checkbox-label">
            <input
              type="checkbox"
              {...register('terms', {
                validate: (value) => value === true || 'You must accept the Terms & Conditions.',
              })}
            />
            I agree to the Terms &amp; Conditions
          </label>
          {errors.terms && <span className="reg-error">{errors.terms.message}</span>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="reg-submit-btn"
        >
          {isSubmitting ? 'Registering...' : 'Create Account'}
        </button>

      </form>
    </div>
  )
}
