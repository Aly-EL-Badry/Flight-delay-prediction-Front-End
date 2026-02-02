import React from "react";

interface Contributor {
  name: string;
  role?: string;
  bio?: string;
  github?: string;
  linkedin?: string;
  email?: string;
}

const CONTRIBUTORS: Contributor[] = [
  {
    name: "Rawan Ahmed",
    role: "Frontend Engineer",
    bio: "Built UI and Autocomplete component",
    github: "https://github.com/rawan2088",
  },
  {
    name: "Maryam Ahmed Adel",
    role: "AI Engineer",
    bio: "Modeling and API",
    github: "https://github.com/maryamahmedadel365-bit",
  },
  {
    name: "Aly El-Badry",
    role: "AI Engineer",
    bio: "Modeling and API",
    github: "https://github.com/Aly-EL-Badry",
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-700 pt-8 pb-6 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {CONTRIBUTORS.map((c) => (
            <div key={c.name} className="text-sm">
              <h4 className="text-white font-semibold">{c.name}</h4>
              {c.role && <p className="text-slate-300 text-xs">{c.role}</p>}
              {c.bio && <p className="text-slate-400 mt-2">{c.bio}</p>}
              <div className="flex items-center gap-3 mt-3">
                {c.github && (
                  <a
                    href={c.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-300 hover:text-white text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="inline-block mr-1"
                      aria-hidden
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.262.82-.583 0-.288-.01-1.05-.016-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.084-.73.084-.73 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.997.108-.776.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.124-.304-.536-1.53.116-3.19 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.553 3.296-1.23 3.296-1.23.654 1.66.242 2.886.118 3.19.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.62-5.48 5.92.43.37.814 1.096.814 2.21 0 1.595-.015 2.88-.015 3.27 0 .322.216.7.825.58C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                )}
                {c.linkedin && (
                  <a
                    href={c.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-300 hover:text-white text-sm"
                  >
                    LinkedIn
                  </a>
                )}
                {c.email && (
                  <a
                    href={`mailto:${c.email}`}
                    className="text-slate-300 hover:text-white text-sm"
                  >
                    {c.email}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-slate-500">
          <p>
            Built with ❤️ by the Flight Prediction team • Data from public
            datasets
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
