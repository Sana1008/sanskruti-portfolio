/*
  CONTENT FILE — add or edit writeups here.

  Required fields: title, topic, date, readTime, excerpt, body
  Optional fields: featured, color
  The dashboard layout does not need to be changed when you add a new entry.
*/
const WRITEUPS = [
  {
    title: "Building a Linux Virtual Network from First Principles",
    topic: "Networking",
    date: "2026-10-12",
    readTime: 8,
    color: "purple",
    excerpt: "Namespaces, veth pairs, bridges, routing, uplinks, NAT, and the packet path behind a working lab network.",
    body: `<p>A practical network lab is one of the fastest ways to turn abstract networking concepts into something observable. This build connects isolated Linux network namespaces with virtual Ethernet pairs and a bridge, then adds routing and an uplink for controlled access beyond the lab.</p><p>The useful mental model is a miniature physical network: namespaces behave like hosts, veth pairs behave like cables, a bridge behaves like a switch, and routing tables decide where packets travel next. Capturing traffic with <code>tcpdump</code> makes each hop visible.</p><p>The most important lesson is that connectivity is a chain of small, testable decisions: interfaces must exist, addresses must be assigned, routes must be correct, forwarding must be enabled, and firewall or NAT behavior must match the intended boundary.</p>`
  },
  {
    title: "QoS-Aware Scheduling for a 5G Smart Factory",
    topic: "Systems",
    date: "2026-10-09",
    readTime: 7,
    color: "mint",
    excerpt: "A weighted MAC-layer priority metric that balances delay urgency, GBR deficit, buffer occupancy, and channel quality.",
    body: `<p>Smart-factory traffic is not equally tolerant of delay. A control loop, a video stream, and a background telemetry flow can share the same cell while having very different consequences when packets wait too long.</p><p>The scheduler combines delay urgency, guaranteed bit-rate deficit, buffer occupancy, and channel quality into a dynamic priority score. Each term captures a different pressure: deadlines, service commitments, queue growth, and the efficiency of serving a user now.</p><p>Simulation with mixed traffic shows why a single signal is rarely enough. A good policy must protect strict QoS requirements without completely starving best-effort traffic, especially as congestion increases.</p>`
  },
  {
    title: "From Alerts to Context: A Cyber Threat Intelligence Dashboard",
    topic: "Security",
    date: "2026-10-05",
    readTime: 6,
    color: "coral",
    excerpt: "Designing a dashboard that turns noisy indicators into timelines, relationships, and investigation-ready context.",
    body: `<p>Threat intelligence is most useful when it helps an analyst answer a question quickly: what happened, how confident are we, and what should we investigate next?</p><p>The dashboard brings together indicators, event timelines, severity, confidence, and related entities. Rather than presenting a wall of alerts, it emphasizes relationships — the domains, IPs, hashes, and behaviors that connect separate observations.</p><p>A good interface also exposes uncertainty. Confidence, source, and first-seen or last-seen timestamps prevent a single indicator from being mistaken for a complete incident story.</p>`
  },
  {
    title: "The Practical Math of Encryption and Hashing",
    topic: "Security",
    date: "2026-09-28",
    readTime: 5,
    color: "amber",
    excerpt: "A clear mental model for confidentiality, integrity, authentication, and the jobs cryptographic primitives actually do.",
    body: `<p>Encryption and hashing are often placed next to each other, but they solve different problems. Encryption is reversible with the right key; a cryptographic hash is designed to be one-way and useful for detecting change.</p><p>The practical questions are more important than memorizing names: who needs to recover the original message, who needs to verify it, and where should trust come from?</p><p>Secure systems compose primitives carefully — for example, authenticated encryption for confidentiality plus integrity, and password hashing with a deliberately expensive function rather than a fast general-purpose hash.</p>`
  },
  {
    title: "Feature Engineering Before Model Training",
    topic: "Machine learning",
    date: "2026-09-20",
    readTime: 6,
    color: "purple",
    excerpt: "Why the representation of a problem often matters more than the complexity of the model chosen afterward.",
    body: `<p>Model training begins long before an algorithm sees a dataset. Features determine what patterns are available to learn, what noise is amplified, and whether evaluation reflects the real task.</p><p>A disciplined workflow starts by understanding the data-generating process, handling missingness intentionally, encoding categories without leaking target information, and separating transformations that belong inside the training pipeline.</p><p>Good features make both simple and complex models stronger. They also make results easier to explain, debug, and carry into production.</p>`
  },
  {
    title: "Neural Networks: A Field Guide to the Learning Loop",
    topic: "Machine learning",
    date: "2026-09-13",
    readTime: 5,
    color: "mint",
    excerpt: "Weights, activations, loss, gradients, and the hyperparameters that shape how a network learns.",
    body: `<p>A neural network learns by repeatedly making a prediction, measuring error with a loss function, and adjusting its parameters in the direction that reduces that error.</p><p>Backpropagation is the bookkeeping system that makes this possible: it applies the chain rule to distribute responsibility for the error across the network's parameters.</p><p>Learning rate, batch size, depth, regularization, and initialization all influence the training path. The goal is not to maximize complexity; it is to find a model that generalizes beyond the examples it has already seen.</p>`
  }
];
