
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from '../components/Header';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Login data:", data);
    // For MVP, just log the data
    // In a real app, you would authenticate with a backend
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <div className="scanlines"></div>
      <Header />
      
      <main className="flex-1 max-w-md mx-auto w-full px-4 py-8 mt-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-pixel text-primary neon-text mb-4">LOGIN</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Access your XENOTXT account
          </p>
        </div>
        
        <div className="bg-card border border-muted/30 rounded-md p-6 pixel-corners">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-pixel text-xs text-secondary">EMAIL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your-email@example.com" 
                        {...field}
                        className="bg-background/50 border-muted/50"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-pixel text-xs text-secondary">PASSWORD</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        {...field}
                        className="bg-background/50 border-muted/50"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/80 font-pixel text-xs"
              >
                ACCESS SYSTEM
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center text-xs text-muted-foreground">
            <p>Don't have an account?</p>
            <Link to="/signup" className="text-primary hover:text-primary/80 font-pixel text-xs mt-2 inline-block">
              CREATE ACCOUNT
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
