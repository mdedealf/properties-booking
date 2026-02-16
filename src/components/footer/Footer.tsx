const footerSections = [
  {
    title: "Support",
    links: [
      "Help Center",
      "AirCover",
      "Anti-discrimination",
      "Disability support",
      "Cancellation options",
      "Report neighborhood concern",
    ],
  },
  {
    title: "Hosting",
    links: [
      "Airbnb your home",
      "AirCover for Hosts",
      "Hosting resources",
      "Community forum",
      "Hosting responsibly",
    ],
  },
  {
    title: "Airbnb",
    links: ["Newsroom", "New features", "Careers", "Investors", "Gift cards"],
  },
];

const bottomLinks = ["Privacy", "Terms", "Sitemap"];

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-gray-700">
        {footerSections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h3 className="font-semibold text-gray-900">{section.title}</h3>

            <ul className="space-y-2">
              {section.links.map((link) => (
                <li
                  key={link}
                  className="hover:underline cursor-pointer text-gray-400"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span>© {new Date().getFullYear()} Airbnb Clone</span>

            {bottomLinks.map((link) => (
              <span key={link} className="hover:underline cursor-pointer">
                {link}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">English (US)</span>
            <span className="hover:underline cursor-pointer">$ USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
