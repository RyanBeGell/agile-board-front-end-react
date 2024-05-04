import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background p-2 border-t border-t-1 border-border">
      <div className="container mx-auto px-2">
        <div className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center">
          <p className="text-xs text-muted-foreground">
            © 2024 Ryan BeGell. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-xs text-muted-foreground hover:underline underline-offset-4"
              href="#"
            >
              GitHub Repository
            </Link>
            <Link
              className="text-xs text-muted-foreground hover:underline underline-offset-4"
              href="#"
            >
              Blog
            </Link>
            <Link
              className="text-xs text-muted-foreground hover:underline underline-offset-4"
              href="#"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
