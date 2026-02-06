import Icon from "../../../components/elements/Icon";

const ValueProposition = () => {
  const valueProps = [
    {
      id: 1,
      iconColor: "var(--color-primary)",
      iconBg: "bg-primary/10",
      title: "For Retail Stores",
      description:
        "Get pre-confirmed, verified staff for billing, stocking, and delivery.",
      benefits: [
        "48-hour advance booking",
        "GST & Shop License verification",
        "Prepaid wallet",
        "QR code attendance",
        "Shift overbooking protection",
      ],
    },
    {
      id: 2,
      iconColor: "var(--color-secondary)",
      iconBg: "bg-secondary/10",
      title: "For Gigs",
      description:
        "Find predictable, nearby paid shifts with advance planning.",
      benefits: [
        "Advance shift planning",
        "Reliability rewards",
        "Daily/weekly payments",
        "Aadhaar & PAN verification",
        "Priority assignments",
      ],
    },
    {
      id: 3,
      iconColor: "var(--color-accent)",
      iconBg: "bg-accent/10",
      title: "For Delivery Partners",
      description:
        "Access hyperlocal delivery opportunities with GPS tracking.",
      benefits: [
        "Live GPS tracking",
        "Customer OTP verification",
        "License & vehicle verification",
        "Refund protection",
        "Priority access",
      ],
    },
  ];

  return (
    <section className="bg-background px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl">
            Built for Reliability, Designed for Trust
          </h2>
          <p className="mx-auto max-w-3xl text-base text-muted-foreground md:text-lg">
            Enterprise-grade platform connecting verified stores, workers, and
            delivery partners.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
          {valueProps.map((prop) => (
            <div
              key={prop.id}
              className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-elevation-sm hover:shadow-elevation-md transition-all duration-200"
            >
              <h3 className="mb-3 text-xl font-semibold text-foreground md:text-2xl">
                {prop.title}
              </h3>

              <p className="mb-6 text-sm text-muted-foreground md:text-base">
                {prop.description}
              </p>

              <ul className="space-y-3">
                {prop.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-4 w-4 items-center justify-center">
                        <Icon
                          name="Check"
                          size={14}
                          color="var(--color-success)"
                        />
                      </span>
                    <span className="text-sm text-foreground md:text-base">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
