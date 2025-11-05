import { definePlugin } from 'sanity'
import { RocketIcon } from '@sanity/icons'

// Access environment variable - must use NEXT_PUBLIC_ prefix for browser access
const DEPLOY_HOOK = process.env.NEXT_PUBLIC_VERCEL_DEPLOY_HOOK

export const deployTool = definePlugin({
  name: 'deploy-tool',
  studio: {
    components: {
      toolMenu: () => {
        const handleDeploy = async () => {
          if (!DEPLOY_HOOK) {
            alert('Deploy hook not configured. Please add NEXT_PUBLIC_VERCEL_DEPLOY_HOOK to your .env.local file and restart the dev server.')
            return
          }

          const confirmed = window.confirm('Trigger a new deployment? This will rebuild your entire website.')
          if (!confirmed) return

          try {
            const response = await fetch(DEPLOY_HOOK, {
              method: 'POST',
            })

            if (response.ok) {
              alert('✓ Deployment triggered successfully! Your site will rebuild in a few minutes.')
            } else {
              throw new Error(`Failed with status: ${response.status}`)
            }
          } catch (error) {
            console.error('Deploy error:', error)
            alert(`✗ Deployment failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
          }
        }

        return (
          <button
            type="button"
            onClick={handleDeploy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              background: '#2276fc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              marginLeft: 'auto',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#0052cc'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#2276fc'
            }}
          >
            <RocketIcon />
            Deploy Site
          </button>
        )
      },
    },
  },
})
