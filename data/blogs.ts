export type BlogPost = {
  id: string;
  publishedAt: string;
  title: string;
  excerpt: string;
  href: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: "cm-fixed-income",
    publishedAt: "Apr 18, 2024",
    title: "CM Fixed Income: Exiting Banking & PSU to Add a New Gilt Fund",
    excerpt:
      "We are increasing the duration of our Fixed Income portfolio to reflect the current macro conditions and take advantage of the current interest rate environment.",
    href: "#",
  },
  {
    id: "focused-way-investing",
    publishedAt: "Apr 03, 2024",
    title: "The Focused Way of Investing: Our Four-Quadrant Strategy and FY24 Review",
    excerpt:
      "FY24 brought us a strong gain in our Focused portfolio. We review performance, risk controls, and the framework that guides our stock selection.",
    href: "#",
  },
  {
    id: "craftsman-automation",
    publishedAt: "Apr 05, 2024",
    title: "Craftsman Automation: Poised for Growth Amid Temporary Headwinds",
    excerpt:
      "We revisit Craftsman Automation and walk through earnings, valuations, and our stance on near-term demand softness versus long-term opportunity.",
    href: "#",
  },
  {
    id: "small-cad",
    publishedAt: "Mar 27, 2024",
    title: "A Small CAD for India, Yet Again",
    excerpt:
      "India's current account deficit remains contained. We explain what this means for markets and why currency stability still matters for portfolios.",
    href: "#",
  },
  {
    id: "poonawalla-fincorp",
    publishedAt: "Mar 25, 2024",
    title: "Poonawalla Fincorp: One right step at a time",
    excerpt:
      "Some winning patterns keep repeating. We outline the lending thesis behind Poonawalla Fincorp and how it fits into our financials exposure.",
    href: "#",
  },
];
