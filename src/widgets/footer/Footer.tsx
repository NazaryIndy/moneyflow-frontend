export const Footer = () => {
  const currentYear = new Date().getFullYear();

  // const footerLinks = [
  //   {
  //     title: 'Solutions',
  //     links: ['Marketing', 'Analytics', 'Commerce', 'Insights'],
  //   },
  //   {
  //     title: 'Support',
  //     links: ['Pricing', 'Documentation', 'Guides', 'API Status'],
  //   },
  //   {
  //     title: 'Company',
  //     links: ['About Us', 'Blog', 'Careers', 'Press'],
  //   },
  //   {
  //     title: 'Legal',
  //     links: ['Claim', 'Privacy', 'Terms', 'Policies'],
  //   },
  // ];

  return (
    <footer className="w-full border-t border-border-subtle bg-surface text-text-primary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        {/*   <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-12">
           Brand Section
          <div className="col-span-2 md:col-span-4 lg:col-span-1 flex flex-col gap-4">
            <span className="text-xl font-bold text-white tracking-wider">ACME CORP</span>
            <p className="text-sm text-slate-400 max-w-xs">
              Making the world a better place through constructing elegant hierarchies.
            </p>
          </div>

           Dynamic Link Columns
          {footerLinks.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2 text-sm">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>*/}

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {currentYear} MoneyFlow. v0.1.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="text-link transition-colors hover:text-link-hover">
              Privacy Policy
            </a>
            <a href="#terms" className="text-link transition-colors hover:text-link-hover">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
