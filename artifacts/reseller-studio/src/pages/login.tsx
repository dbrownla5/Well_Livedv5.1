import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    login(email.trim());
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Package className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-serif text-foreground">DB Reseller Studio</h1>
          <p className="text-muted-foreground mt-2">Back-of-house operations</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border p-6 rounded-xl shadow-sm space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Operator Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@example.com"
              required
              autoFocus
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full" disabled={!email.trim()}>
            Enter Studio
          </Button>
        </form>
      </div>
    </div>
  );
}
