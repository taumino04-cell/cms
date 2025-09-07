import { redirect } from 'next/navigation';

export default async function Page() {
  // With Firebase client auth, perform gating in middleware/client.
  return redirect('/dashboard/overview');
}
