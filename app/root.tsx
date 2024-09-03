import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import "./tailwind.css";
import { Header } from "./components/header";
import { requireAdminId } from "./server/auth.server";
import { LoaderFunctionArgs } from "@remix-run/node";

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
    <div className="h-screen">
      <Header isLoginPage={isLoginPage} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
