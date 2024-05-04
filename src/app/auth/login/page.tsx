'use client';

import { LoginForm } from "@/components/auth/LoginForm";
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';

export default function LoginPage() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="mb-5 text-4xl font-bold">Log in to Agilify</h1>
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
}
