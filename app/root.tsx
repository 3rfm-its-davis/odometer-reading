import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import { Header } from "./components/header";
import "./tailwind.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const isLoginPage = useLocation().pathname === "/login";
  return (
    <div className="h-screen flex flex-col">
      <Header isLoginPage={isLoginPage} />
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
