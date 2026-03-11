import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/dashboard/chat/$chatId')({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: '/dashboard/chat',
      search: { chatId: params.chatId },
    })
  },
  component: () => null,
})
