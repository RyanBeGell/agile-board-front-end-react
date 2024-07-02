'use client';

import { SignupForm } from "@/components/auth/SignupForm";
import Navbar from '@/components/landing/navbar';
import Footer from '@/components/landing/footer';

export default function SignupPage() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center py-8">
        <h1 className="mb-5 text-4xl font-bold text-center">Create Your <br/>Agilify Account</h1>
        <SignupForm />
      </div>
      <Footer />
    </div>
  );
}