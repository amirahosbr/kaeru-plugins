/**
 * Home page. Server component that pulls copy from the active locale's message
 * bundle and renders the design-system landing hero. Motion/interactivity stays
 * in leaf client components (ModeToggle).
 */
import { setRequestLocale, getTranslations } from "next-intl/server";
import { ArrowRight, BookText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "@/i18n/navigation";

type HomeProps = {
  params: Promise<{ locale: string }>;
};

const Home = async ({ params }: HomeProps): Promise<React.JSX.Element> => {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");

  return (
    <main className="flex min-h-svh flex-col">
      <header className="flex items-center justify-between px-6 py-4 sm:px-10">
        <span className="font-mono text-sm font-medium tracking-tight text-muted-foreground">
          蛙 kaeru
        </span>
        <ModeToggle />
      </header>

      <section className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-20 text-center">
        <span className="inline-flex items-center rounded-full border bg-secondary px-3 py-1 font-mono text-xs text-secondary-foreground">
          {t("badge")}
        </span>
        <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
          {t("title")}
        </h1>
        <p className="max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
          {t("subtitle")}
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" asChild>
            <Link href="/">
              {t("cta")}
              <ArrowRight />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookText />
              {t("docs")}
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Home;
