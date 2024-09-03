import Link from 'next/link';
import { Button } from './ui/button';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/metrics" className="text-xl font-bold">
          Constant Leads
        </Link>
      </div>
    </nav>
  );
}