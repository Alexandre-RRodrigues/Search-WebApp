import Button from "@mui/material/Button";
import { messages } from "@/lib/i18n";

export default function AuthActions() {
  return (
    <nav
      aria-label={messages.account}
      className="absolute right-4 top-4 flex items-center gap-1 sm:right-8 sm:top-6 sm:gap-2"
    >
      <Button
        href="#sign-in"
        variant="text"
        sx={{
          color: "#a1a1aa",
          "&:hover": { color: "var(--color-primary)" },
        }}
      >
        {messages.signIn}
      </Button>
      <Button
        href="#sign-up"
        variant="contained"
        sx={{
          borderRadius: "0.65rem",
          backgroundColor: "var(--color-primary)",
          "&:hover": {
            backgroundColor:
              "color-mix(in srgb, var(--color-primary) 85%, black)",
          },
        }}
      >
        {messages.signUp}
      </Button>
    </nav>
  );
}
