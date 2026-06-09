import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { TopBar } from "@/components/TopBar";
import { GoldButton } from "@/components/GoldButton";
import { Field } from "./login";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register — Shan Koe Mee" }] }),
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  return (
    <MobileShell>
      <TopBar title="Create Account" />
      <div className="px-6 pt-6 pb-10">
        <p className="text-sm text-muted-foreground mb-6">Join the most luxurious Shan Koe Mee tables in town.</p>
        <form
          onSubmit={(e) => { e.preventDefault(); navigate({ to: "/lobby" }); }}
          className="space-y-4"
        >
          <Field label="Username" placeholder="Choose a username" />
          <Field label="Phone Number" type="tel" placeholder="+95 9 ..." />
          <Field label="Password" type="password" placeholder="At least 8 characters" />
          <Field label="Confirm Password" type="password" placeholder="Repeat password" />

          <p className="text-xs text-muted-foreground">
            By registering you agree to the house rules and TaroXGameHub fair-play policy.
          </p>

          <GoldButton type="submit" size="lg" className="w-full">
            Create Account
          </GoldButton>
        </form>
      </div>
    </MobileShell>
  );
}
