import React from "react";
import Icon from "../../../components/elements/Icon";

const SocialProof = () => {
  const stats = [
    {
      id: 1,
      value: "98.5%",
      label: "Show-up Rate",
      description: "Workers actually show up",
      icon: "CheckCircle2",
      color: "success",
    },
    {
      id: 2,
      value: "2,500+",
      label: "Verified Workers",
      description: "Active pool verified",
      icon: "Users",
      color: "primary",
    },
    {
      id: 3,
      value: "15,000+",
      label: "Shifts Completed",
      description: "This month",
      icon: "Calendar",
      color: "secondary",
    },
    {
      id: 4,
      value: "4.8/5",
      label: "Reliability Score",
      description: "Average rating",
      icon: "Award",
      color: "accent",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Store Owner, SuperMart Chain",
      image:
        "https://img.rocket.new/generatedImages/rocket_gen_img_17600c13d-1763292525043.png",
      imageAlt: "Store owner",
      rating: 5,
      comment:
        "GigErn solved our biggest problem - unreliable staff. The advance booking and double confirmation system ensures we always have the right people.",
      verified: true,
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Delivery Partner",
      image:
        "https://img.rocket.new/generatedImages/rocket_gen_img_1600db7f6-1763301349887.png",
      imageAlt: "Delivery partner",
      rating: 5,
      comment:
        "The GPS tracking and OTP system gives me security. My reliability score helped me get priority access to better opportunities.",
      verified: true,
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Store Worker",
      image:
        "https://img.rocket.new/generatedImages/rocket_gen_img_1f3f78660-1763295972306.png",
      imageAlt: "Store worker",
      rating: 5,
      comment:
        "I love the advance planning feature. I can see shifts 48 hours ahead and plan my week properly. Great platform for serious workers.",
      verified: true,
    },
  ];

  const colorMap = {
    success: "var(--color-success)",
    primary: "var(--color-primary)",
    secondary: "var(--color-secondary)",
    accent: "var(--color-accent)",
  };

  return (
    <section className="bg-background px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl">
            Trusted by Stores & Workers
          </h2>
          <p className="mx-auto max-w-3xl text-base text-muted-foreground md:text-lg">
            Real results from our reliability-driven platform.
          </p>
        </div>
        <div className="mb-12 grid gap-6 md:mb-16 md:gap-8 lg:grid-cols-4">
          {stats?.map((stat) => (
            <div
              key={stat?.id}
              className="rounded-xl border border-border bg-card p-6 text-center shadow-elevation-sm transition-all duration-250 hover:shadow-elevation-md"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 md:h-14 md:w-14">
                <Icon
                  name={stat?.icon}
                  size={24}
                  color={colorMap?.[stat?.color]}
                />
              </div>
              <div className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
                {stat?.value}
              </div>
              <div className="mb-2 text-sm font-semibold text-foreground md:text-base">
                {stat?.label}
              </div>
              <p className="text-xs text-muted-foreground md:text-sm">
                {stat?.description}
              </p>
            </div>
          ))}
        </div>
        <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial?.id}
              className="rounded-xl border border-border bg-card p-6 shadow-elevation-sm transition-all duration-250 hover:shadow-elevation-md md:p-8"
            >
              <div className="mb-4 flex items-center gap-1">
                {[...Array(testimonial?.rating)]?.map((_, idx) => (
                  <Icon
                    key={idx}
                    name="Star"
                    size={16}
                    color="var(--color-accent)"
                    className="fill-current"
                  />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-foreground md:text-base">
                "{testimonial?.comment}"
              </p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
                  <img
                    src={testimonial?.image}
                    alt={testimonial?.imageAlt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground md:text-base truncate">
                      {testimonial?.name}
                    </p>
                    {testimonial?.verified && (
                      <Icon
                        name="BadgeCheck"
                        size={16}
                        color="var(--color-primary)"
                      />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground md:text-sm truncate">
                    {testimonial?.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
