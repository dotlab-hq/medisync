import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/privacy')({
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <main className="px-4 py-12 max-w-3xl mx-auto prose dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p>Last updated: January 2025</p>

      <h2>Information We Collect</h2>
      <p>
        MediSync collects the personal and medical information you provide
        during signup and onboarding, including your name, email, phone number,
        blood group, allergies, chronic conditions, medications, address, and
        emergency contact details.
      </p>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To provide you with a secure emergency medical QR code profile.</li>
        <li>To send you medication and appointment reminders.</li>
        <li>
          To display your emergency contacts and medical info to first
          responders when your QR code is scanned.
        </li>
      </ul>

      <h2>Data Sharing</h2>
      <p>
        We do not sell or share your data with third parties. Medical records
        marked as confidential are never displayed on the public emergency QR
        page.
      </p>

      <h2>Data Security</h2>
      <p>
        Your data is stored securely using encrypted database connections. We
        follow industry best practices for data protection.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about this privacy policy, contact us at{' '}
        <a href="mailto:support@medisync.app">support@medisync.app</a>.
      </p>
    </main>
  )
}
