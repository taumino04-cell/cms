import { redirect } from 'next/navigation';

export default async function Dashboard() {
  // With Firebase client auth, perform gating in middleware/client.
  return redirect('/dashboard/overview');
}
