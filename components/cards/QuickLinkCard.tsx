import Link from "next/link";

export type QuickLinkCardProps = {
  title: string;
  description: string;
  href?: string;
  external?: boolean;
};

export function QuickLinkCard({
  title,
  description,
  href,
  external,
}: QuickLinkCardProps) {
  const baseClasses =
    "group rounded-xl border border-zinc-200 bg-white px-5 py-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md";

  const content = (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h2 className="text-sm font-semibold text-zinc-800">{title}</h2>
        <p className="mt-1 text-sm text-zinc-600">{description}</p>
      </div>
      <svg
        className="mt-0.5 h-4 w-4 flex-shrink-0 text-zinc-300 group-hover:text-emerald-500"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8.25 15.75 15.75 8.25"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.75 8.25h6v6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return <div className={baseClasses}>{content}</div>;
}
