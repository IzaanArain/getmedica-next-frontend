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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { specialties } from "@/constants";
import { useRoleContext } from "@/providers/RoleProvider";
import { useRegisterMutation } from "@/services/auth/authMutations";
import { Eye, EyeOff } from 'lucide-react';
import { useState } from "react";
import { Visibility } from "@/types";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Please enter a valid email" }),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
    specialization: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

const RegisterForm = () => {
  const router = useRouter();
  const { role } = useRoleContext();
  const [visibility, setVisibility] = useState<Visibility>({ field: 'password', isOpen: false })
  const { mutate } = useRegisterMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      specialization: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = { ...data, role };
    mutate(formData);
  };


  function onSuccess() {
    router.push("/login");
  }

    const handleVisibility = (e:React.MouseEvent<HTMLButtonElement>,field: typeof visibility.field) => {
    e.preventDefault();
    setVisibility({field,isOpen:!visibility.isOpen})
  }

  return (
    <>
      <Card className="w-full border-none shadow-none px-8 py-0 gap-0">
        <CardHeader className="mb-2">
          <CardTitle className="text-4xl">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-medium">Name</FormLabel>
                    <FormControl>
                      <Input
                        className="p-6 border-2 text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0 "
                        placeholder="Enter name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-medium">Email</FormLabel>
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

              {role === "doctor" && (
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl font-medium">
                        Specialization
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full p-6 border-2 text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0 ">
                            <SelectValue placeholder="Select a specialization to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {specialties.map((spec, index) => (
                            <SelectItem
                              key={`${spec.id}-${index}`}
                              value={spec.id}
                              className="border-b-2 rounded-none py-2"
                            >
                              {spec.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className={`flex items-center rounded-md border-2 ${form.formState.errors.password && 'border-destructive'}`}>
                       <Input
                        type={visibility.field === 'password' && visibility.isOpen ? "text" : "password"}
                        className="p-6 border-none shadow-none text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0 "
                        placeholder="Enter password"
                        {...field}
                      />
                      <Button className="bg-transparent shadow-none text-black hover:bg-transparent" onClick={(e) => handleVisibility(e,'password')}>
                          {visibility.field === 'password' && visibility.isOpen
                            ? (<EyeOff className={`size-6 ${form.formState.errors.password && 'text-destructive'}`} />)
                            : (<Eye className={`size-6 ${form.formState.errors.password && 'text-destructive'}`} />)
                          }
                      </Button>
                     </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-medium">
                      Confirm password
                    </FormLabel>
                    <FormControl>
                      <div className={`flex items-center rounded-md border-2 ${form.formState.errors.password && 'border-destructive'}`}>
                       <Input
                        type={visibility.field === 'confirmPassword' && visibility.isOpen ? "text" : "password"}
                        className="p-6 border-none shadow-none text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0 "
                        placeholder="Enter password"
                        {...field}
                      />
                      <Button className="bg-transparent shadow-none text-black hover:bg-transparent" onClick={(e) => handleVisibility(e,'confirmPassword')}>
                          {visibility.field === 'confirmPassword' && visibility.isOpen
                            ? (<EyeOff className={`size-6 ${form.formState.errors.password && 'text-destructive'}`} />)
                            : (<Eye className={`size-6 ${form.formState.errors.password && 'text-destructive'}`} />)
                          }
                      </Button>
                     </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-4 w-full bg-[#18a0fb] p-8">
                <span className="text-xl">continue</span>
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-xl flex justify-center items-center mt-4 text-slate-500">
          Already have an account?
          <Link
            href={"/login"}
            className="ml-3 text-blue-500 underline text-xl font-medium"
          >
            Log in
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default RegisterForm;
