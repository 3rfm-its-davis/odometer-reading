import { prisma } from "./prisma.server";
import { LoginForm } from "./types.server";
import bcrypt from "bcryptjs";
import { redirect, createCookieSessionStorage } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("No SESSION_SECRET found in environment variables!");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "login-session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function createAdminSession(adminId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("adminId", adminId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function getAdminId(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const AdminId = session.get("adminId");
  if (!AdminId || typeof AdminId !== "string") return null;
  return AdminId;
}

export async function login(form: LoginForm) {
  const admin = await prisma.admin.findUnique({
    where: {
      email: form.email,
    },
  });

  if (!admin || !bcrypt.compareSync(form.password, admin.password)) {
    return {
      error: "User not found",
    };
  }

  return createAdminSession(admin.id, "/");
}

export async function requireAdminId(
  request: Request,
  redirectTo: string = new URL("/login", request.url).toString()
) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const adminId = session.get("adminId");

  if (!adminId || typeof adminId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams.toString()}`);
  }

  return adminId;
}

export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}
