"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    toast("Post has been edited.", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
    console.log(data);
    const role = 'doctor'
    router.push(`/dashboard/${role}`);
  };

  return (
    <>
      <Card className="w-full border-none shadow-none px-8 gap-0">
        <CardHeader className="mb-3">
          <CardTitle className="text-4xl">Log In</CardTitle>
        </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="text-xl font-medium"
                      >
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="p-6 border-2 text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0 "
                          placeholder="Enter email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className="text-xl font-medium"
                      >
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input type="password"
                          className="p-6 border-2 text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0 "
                          placeholder="Enter password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
               <div className="flex justify-end">
                 <Link href={'/'} className="text-xl text-blue-500 underline font-medium">Forgot Password?</Link>
               </div>
                <Button className="w-full bg-[#18a0fb] p-8">
                  <span className="text-2xl">continue</span>
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="text-xl flex justify-center items-center mt-4 text-slate-400">
            Don't have an account?
            <Link href={'/register'} className="ml-3 text-blue-500 underline text-xl font-medium">
            Sign Up
            </Link>
          </CardFooter>
      </Card>
    </>
  );
};

export default LoginForm;
