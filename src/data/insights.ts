export type InsightBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export interface InsightArticle {
  slug: string;
  title: string;
  topic: string;
  excerpt: string;
  description: string;
  content: InsightBlock[];
}

export const insights: InsightArticle[] = [
  {
    slug: "when-does-a-business-need-custom-software",
    title: "When does a business actually need custom software?",
    topic: "Custom Software",
    excerpt:
      "Spreadsheets and off-the-shelf tools take you far. Here are the signals that it may be time to build something of your own.",
    description:
      "Learn how to tell when spreadsheets and off-the-shelf tools are holding your business back, and how to evaluate a custom software investment.",
    content: [
      {
        type: "paragraph",
        text: "Custom software is not automatically better than a ready-made product. Standard tools are often faster to adopt, less expensive up front and maintained by a vendor. The right question is not whether custom software sounds more powerful; it is whether the way your business works has become important enough to justify owning a solution.",
      },
      {
        type: "heading",
        text: "Look for recurring friction, not one-off annoyances",
      },
      {
        type: "paragraph",
        text: "A workaround becomes a business problem when it happens frequently, affects several people, or creates costly mistakes. A team copying the same data between systems every day is a stronger signal than a single report that takes an extra few minutes once a month.",
      },
      {
        type: "list",
        items: [
          "Staff repeatedly enter the same information into disconnected systems.",
          "Important work depends on one person's spreadsheet or manual memory.",
          "Errors, delays or missed handoffs are becoming more common as volume grows.",
          "Your team cannot get a reliable view of operations without manually combining reports.",
          "A core process is different enough that generic software forces awkward workarounds.",
        ],
      },
      {
        type: "heading",
        text: "Know the limits of your current tools",
      },
      {
        type: "paragraph",
        text: "Before replacing a tool, check whether its settings, integrations or existing plan can solve the problem. Many products support automation, permissions, exports or APIs that teams have not yet configured. If the mismatch is limited to a small feature, a configuration change or a lightweight integration may be a better investment than a full custom system.",
      },
      {
        type: "paragraph",
        text: "Custom development becomes more compelling when the process is central to your advantage, the required workflow is not supported by available products, or the cost and risk of workarounds keep growing. It is especially important to investigate the full cost of ownership: discovery, implementation, hosting, support, training and future changes.",
      },
      {
        type: "heading",
        text: "Build around a measurable outcome",
      },
      {
        type: "paragraph",
        text: "Start with a baseline. How long does the process take today? How many corrections are needed? Where do delays occur? A clear measure helps you decide whether a proposed solution is worth building and whether it is working after launch. Possible measures include hours spent reconciling records, order processing time, stock discrepancies or the time needed to prepare a report.",
      },
      {
        type: "paragraph",
        text: "Avoid trying to automate every exception in the first release. Map the normal workflow, identify the highest-impact pain point and deliver a focused first version. Then use real feedback to decide what to improve next. This reduces up-front risk and gets useful software into people's hands sooner.",
      },
      {
        type: "heading",
        text: "A practical decision",
      },
      {
        type: "paragraph",
        text: "Custom software may be a good fit when a repeated, important business process is poorly served by existing tools, the workarounds have a measurable cost, and the business is ready to maintain a product over time. If those conditions are not present, improve the process or configure existing software first. The best solution is the simplest one that reliably solves the real problem.",
      },
    ],
  },
  {
    slug: "pos-erp-what-to-look-for",
    title: "Choosing a POS / ERP: what growing businesses should look for",
    topic: "Business Systems",
    excerpt:
      "Sales, stock, finance and reporting in one system: what matters, what is marketing, and what to ask before you commit.",
    description:
      "A practical guide to evaluating POS and ERP systems for a growing business, from daily workflows and integrations to costs and vendor support.",
    content: [
      {
        type: "paragraph",
        text: "A point-of-sale (POS) system records transactions at the point of sale. An enterprise resource planning (ERP) system connects wider business operations such as inventory, purchasing, finance and reporting. Some products combine both, but a long feature list does not guarantee that a system fits the way your team works.",
      },
      {
        type: "heading",
        text: "Start with the work the system must support",
      },
      {
        type: "paragraph",
        text: "Write down the key tasks staff complete during a normal day: opening a sale, handling returns, receiving stock, transferring items between locations, closing a register and preparing accounts. Include the exceptions that cause trouble, such as a network outage, a partial delivery or a customer with a special price. Ask vendors to demonstrate these exact workflows using realistic examples.",
      },
      {
        type: "list",
        items: [
          "Can staff complete common tasks quickly with minimal training?",
          "Does stock update consistently after sales, returns and receiving?",
          "Can managers see the reports they need without exporting and rebuilding them?",
          "Are user roles and approval steps appropriate for your controls?",
          "Does the system support how you operate across locations, currencies or tax rules?",
        ],
      },
      {
        type: "heading",
        text: "Check integrations and data ownership",
      },
      {
        type: "paragraph",
        text: "A system rarely operates alone. Confirm how it connects to accounting, payment providers, e-commerce, delivery services and any industry-specific tools you rely on. Ask which integrations are maintained by the vendor, whether they carry extra fees, and what happens when an integration fails.",
      },
      {
        type: "paragraph",
        text: "Understand how you can export your data, including products, customers, transactions and historical records. Ask about export formats, frequency, access after cancellation and any fees for migration support. Data portability is part of a sensible exit plan, even if you expect to stay with the vendor for years.",
      },
      {
        type: "heading",
        text: "Test reliability in real operating conditions",
      },
      {
        type: "paragraph",
        text: "A checkout system must remain dependable during busy periods. Ask what functionality is available when the internet or a connected service is unavailable, how offline transactions are reconciled, and what safeguards prevent duplicate or missing records. Find out how backups, security updates and incident communication are handled.",
      },
      {
        type: "heading",
        text: "Compare the full cost, not only the subscription",
      },
      {
        type: "paragraph",
        text: "Budget for hardware, setup, data migration, training, payment processing, add-ons, support and future locations or users. Clarify what is included in the quoted price and which activities are billed separately. A low monthly fee can still be expensive if the system requires extensive manual work or paid customizations to cover everyday needs.",
      },
      {
        type: "heading",
        text: "Run a focused evaluation",
      },
      {
        type: "paragraph",
        text: "Shortlist a small number of systems, define the workflows that matter most and score each product against the same criteria. Involve the people who will use and administer the system. A short pilot with representative data can expose usability and integration issues that a sales demo will not.",
      },
      {
        type: "paragraph",
        text: "Choose the system that supports today's essential work while leaving a practical path to grow. Resist paying for features without a clear use case, and do not ignore a poor fit in a core workflow just because the rest of the product looks impressive.",
      },
    ],
  },
  {
    slug: "practical-ai-for-small-business",
    title: "Practical AI for everyday business operations",
    topic: "AI & Automation",
    excerpt:
      "Beyond the hype: where AI can save time in small and mid-sized businesses, and where a simpler tool is the better choice.",
    description:
      "Explore realistic uses of AI in small-business operations, along with privacy, accuracy and human-review safeguards to consider before adopting it.",
    content: [
      {
        type: "paragraph",
        text: "Artificial intelligence can help with everyday work, but it is not a shortcut around unclear processes or poor-quality information. The most useful starting point is a repetitive task where a person spends time sorting, summarizing or drafting information and can easily review the result.",
      },
      {
        type: "heading",
        text: "Start with a small, reviewable task",
      },
      {
        type: "paragraph",
        text: "Examples include classifying incoming enquiries, summarizing long documents, drafting a first response from approved information, extracting fields from invoices for review, or searching internal guidance. These tasks can reduce routine effort while leaving decisions and customer commitments with a person.",
      },
      {
        type: "list",
        items: [
          "Choose a task that happens often and has a clear time or quality cost.",
          "Define what a good result looks like before selecting a tool.",
          "Keep a human review step for errors, sensitive cases and final decisions.",
          "Measure time saved and correction rates against the current process.",
          "Make it easy for staff to flag inaccurate or unhelpful results.",
        ],
      },
      {
        type: "heading",
        text: "AI is not always the right automation",
      },
      {
        type: "paragraph",
        text: "If a task follows fixed rules, conventional automation is often cheaper and more predictable. For example, routing an order based on a known value or sending a reminder on a fixed schedule usually does not need a generative AI model. Use AI where the input is variable or language-heavy; use clear rules where the process is deterministic.",
      },
      {
        type: "paragraph",
        text: "Avoid automating a process that is inconsistent or poorly understood. First agree on the steps, ownership and exceptions. Otherwise, a system may simply make mistakes faster and make it harder to understand where they came from.",
      },
      {
        type: "heading",
        text: "Protect information and set boundaries",
      },
      {
        type: "paragraph",
        text: "Before entering business or customer information into an AI service, understand how the provider handles submitted data, retention, access and reuse. Follow your legal and contractual obligations, limit access to approved users, and avoid sending sensitive information unless the service and your organization have explicitly approved that use.",
      },
      {
        type: "paragraph",
        text: "Tell staff which tools are approved and what information must not be entered. For customer-facing use, be clear about when a person is involved and provide an effective path to human support. Keep a record of important automated actions so mistakes can be traced and corrected.",
      },
      {
        type: "heading",
        text: "Evaluate outcomes, not novelty",
      },
      {
        type: "paragraph",
        text: "Run a limited pilot with real but appropriately protected examples. Compare the AI-assisted process with the current one: total handling time, error rates, review effort and user experience. Include the costs of subscriptions, integration, oversight and ongoing maintenance. Stop or adjust the pilot if it does not produce a clear benefit.",
      },
      {
        type: "paragraph",
        text: "Good AI adoption is usually incremental. Keep people accountable for consequential decisions, verify outputs before acting on them, and expand only after a small use case demonstrates value. The goal is not to use AI everywhere; it is to help people do valuable work with less unnecessary effort.",
      },
    ],
  },
];
