import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Award, Building2, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects & Clients",
  description:
    "JADE Coatings has been trusted by landmark hotels, resorts, and institutions across Sri Lanka. Explore our portfolio of premium projects.",
};

interface Project {
  id: number;
  name: string;
  location: string;
  description: string;
  image_url: string;
  type: string;
}

async function getData(): Promise<{ projects: Project[]; clients: Project[] }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/projects`, { cache: "no-store" });
    if (!res.ok) return { projects: [], clients: [] };
    return res.json();
  } catch {
    return { projects: [], clients: [] };
  }
}

const clientColors = [
  "bg-blue-50 text-blue-700 border-blue-100",
  "bg-rose-50 text-rose-700 border-rose-100",
  "bg-jade-pale text-jade-600 border-jade-100",
  "bg-purple-50 text-purple-700 border-purple-100",
  "bg-amber-50 text-amber-700 border-amber-100",
  "bg-teal-50 text-teal-700 border-teal-100",
  "bg-indigo-50 text-indigo-700 border-indigo-100",
];

function getProjectLogo(name: string): string | null {
  const lower = name.toLowerCase();
  if (lower.includes("shangri")) return "/images/projects/Shangrila hambanthota.png";
  if (lower.includes("heritance")) return "/images/projects/Heritance ahungalla.png";
  if (lower.includes("jetwing")) return "/images/projects/jetwing blue negombo.png";
  if (lower.includes("palm")) return "/images/projects/palm resort.png";
  if (lower.includes("thissa")) return "/images/projects/thissa safari.png";
  if (lower.includes("amaya")) return "/images/projects/amaya resort.png";
  if (lower.includes("margosa")) return "/images/projects/Margosa Bay.png";
  return null;
}

function getClientLogo(name: string): string | null {
  const lower = name.toLowerCase();
  if (lower.includes("prime lands")) return "/images/clients/prime-lands.png";
  if (lower.includes("pizza hut")) return "/images/clients/pizza-hut.png";
  if (lower.includes("army")) return "/images/clients/army.png";
  if (lower.includes("amaya")) return "/images/clients/amaya resort.png";
  if (lower.includes("toro")) return "/images/clients/EL toro.png";
  if (lower.includes("conwood")) return "/images/clients/conwood.png";
  if (lower.includes("margosa")) return "/images/clients/Margosa Bay.png";
  if (lower.includes("yokohama")) return "/images/clients/Yokohama.png";
  if (lower.includes("michelin")) return "/images/clients/Michelin.png";
  if (lower.includes("home lands")) return "/images/clients/home lands.png";
  if (lower.includes("furnicraft")) return "/images/clients/furnicraft.png";
  if (lower.includes("karapitiya")) return "/images/clients/karapitiya hospital.png";
  if (lower.includes("shangri")) return "/images/clients/Shangrila hambanthota.png";
  if (lower.includes("heritance")) return "/images/clients/Heritance ahungalla.png";
  return null;
}

export default async function ProjectsPage() {
  const { projects, clients } = await getData();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-jade-gradient overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Dynamic ambient radial glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-jade-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            Projects &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-jade-300 to-emerald-100">
              Clients
            </span>
          </h1>
          <p className="text-jade-100/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Trusted by Sri Lanka&apos;s most prestigious hotels, real estate developments, and national institutions. Our commercial-grade water-based formulations deliver enduring beauty across the island.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <Award className="w-7 h-7 text-jade-500" />
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-charcoal">
                Landmark Projects
              </h2>
              <p className="text-charcoal/50 text-sm mt-1">
                Signature projects where JADE Coatings made its mark
              </p>
            </div>
          </div>

          {projects.length === 0 ? (
            <p className="text-charcoal/40 text-center py-12">
              No projects found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, i) => {
                const projectLogo = project.image_url || getProjectLogo(project.name);
                return (
                  <div
                    key={project.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-jade-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Top colour band — alternating palette */}
                    <div
                      className={`h-48 flex items-center justify-center relative overflow-hidden ${
                        i % 3 === 0
                          ? "bg-gradient-to-br from-jade-700 to-jade-900"
                          : i % 3 === 1
                          ? "bg-gradient-to-br from-emerald-600 to-emerald-900"
                          : "bg-gradient-to-br from-teal-600 to-teal-900"
                      }`}
                    >
                      {/* Decorative shapes */}
                      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                      <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/5" />
                      <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center">
                        {projectLogo ? (
                          <div className="p-3.5 bg-white/95 rounded-2xl shadow-xl border border-white/40 max-w-[220px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                            <img
                              src={projectLogo}
                              alt={`${project.name} Logo`}
                              className="max-h-16 max-w-[190px] w-auto object-contain"
                            />
                          </div>
                        ) : (
                          <span className="font-display text-3xl font-bold text-white/90 block">
                            {project.name}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-display text-lg font-bold text-charcoal mb-2 group-hover:text-jade-600 transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-jade-500 text-xs mb-3">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="font-medium">{project.location}</span>
                      </div>
                      <p className="text-charcoal/60 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-24 bg-gradient-to-b from-jade-pale/60 via-white to-jade-pale/30 relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-jade-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-jade-500/10 border border-jade-500/20 text-jade-600 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-jade-500" />
              <span>Proven Industry Partnerships</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight">
              Trusted by Industry Leaders
            </h2>
            <p className="text-charcoal/65 mt-4 text-base sm:text-lg leading-relaxed">
              From global tyre manufacturing powerhouses and national institutions to premier luxury hospitality groups, JADE Coatings delivers certified reliability across Sri Lanka and beyond.
            </p>

            {/* Quick Proof Metrics Strip */}
            <div className="mt-8 grid grid-cols-3 gap-3 max-w-xl mx-auto">
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-3 border border-gray-100 shadow-xs text-center">
                <span className="block font-display text-xl sm:text-2xl font-black text-jade-600">10+</span>
                <span className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider">Enterprise Brands</span>
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-3 border border-gray-100 shadow-xs text-center">
                <span className="block font-display text-xl sm:text-2xl font-black text-jade-600">100%</span>
                <span className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider">Water-Borne Eco</span>
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-3 border border-gray-100 shadow-xs text-center">
                <span className="block font-display text-xl sm:text-2xl font-black text-jade-600">7+</span>
                <span className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider">Star Resorts</span>
              </div>
            </div>
          </div>

          {clients.length === 0 ? (
            <p className="text-charcoal/40 text-center py-12">
              No clients found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {clients.map((client) => {
                const logo = client.image_url || getClientLogo(client.name);
                return (
                  <div
                    key={client.id}
                    className="group relative bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:shadow-xl hover:border-jade-400/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Top gradient highlight on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-jade-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div>
                      {/* Logo Frame - Scaled up 100% for high visual impact */}
                      <div className="h-24 w-full flex items-center justify-center p-4 rounded-xl bg-gray-50/80 border border-gray-100 group-hover:bg-jade-50/40 group-hover:border-jade-200/50 transition-colors mb-4">
                        {logo ? (
                          <img
                            src={logo}
                            alt={`${client.name} Logo`}
                            className="max-h-20 max-w-[220px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-jade-500/10 text-jade-600 flex items-center justify-center font-bold text-2xl">
                            {client.name.charAt(0)}
                          </div>
                        )}
                      </div>

                      {/* Header */}
                      <div className="mb-2">
                        <h3 className="font-display text-lg font-bold text-charcoal group-hover:text-jade-600 transition-colors line-clamp-1">
                          {client.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-charcoal/50 mb-2">
                        <MapPin className="w-3 h-3 text-jade-500 shrink-0" />
                        <span className="truncate">{client.location}</span>
                      </div>

                      <p className="text-xs text-charcoal/65 line-clamp-2 leading-relaxed">
                        {client.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            Join Our Growing Client List
          </h2>
          <p className="text-white/50 text-sm mb-8">
            Looking for premium eco-friendly coatings for your next project?
            Let&apos;s talk.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-jade-500 hover:bg-jade-400 text-white rounded-full font-semibold transition-all duration-200 shadow-lg shadow-jade-500/30 hover:scale-105"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
