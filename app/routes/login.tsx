import { useState, useRef, useEffect } from "react";
import { Form } from "../components/form";
import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import { getAdminId, login } from "~/server/auth.server";
import { useActionData } from "@remix-run/react";
import { validateEmail, validatePassword } from "~/server/validators.server";

export const loader: LoaderFunction = async ({ request }) => {
  return (await getAdminId(request)) ? redirect("/") : null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  if (!email || !password) {
    return new Response("Email and password are required", {
      status: 400,
    });
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  if (Object.values(errors).some((error) => error)) {
    return json(
      { errors, fields: { email, password }, form: action },
      { status: 400 }
    );
  }

  return await login({ email, password });
};

export default function Login() {
  const actionData = useActionData<typeof action>();
  const firstLoad = useRef(true);
  const [errors, setErrors] = useState(actionData?.errors || {});
  const [formError, setFormError] = useState(actionData?.error || "");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    const newState = {
      email: "",
      password: "",
    };
    setErrors(newState);
    setFormError("");
    setFormData(newState);
  }, [actionData]);

  useEffect(() => {
    if (!firstLoad.current) {
      setFormError("");
    }
  }, [formData]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div className="h-screen w-full justify-center items-center flex flex-col gap-y-4">
      <h2 className="text-5xl font-extrabold text-gray-800">Login</h2>

      <form method="post" className=" bg-gray-200 p-6 w-96">
        <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
          {formError}
        </div>

        <Form
          htmlFor="email"
          type="text"
          label="email"
          value={formData.email}
          onChange={(e) => handleChange(e, "email")}
          error={errors?.email}
        />

        <Form
          htmlFor="password"
          type="password"
          label="password"
          value={formData.password}
          onChange={(e) => handleChange(e, "password")}
          error={errors?.password}
        />

        <div className="w-full text-center">
          <input
            type="submit"
            className="rounded-xl mt-2 bg-blue-200 px-4 py-2 text-gray-800 font-semibold transition duration-300 ease-in-out hover:bg-blue-400 hover:cursor-pointer"
            value="Sign In"
          />
        </div>
      </form>
    </div>
  );
}
