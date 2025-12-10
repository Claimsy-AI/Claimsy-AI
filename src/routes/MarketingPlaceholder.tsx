const MarketingPlaceholder = ({ title }: { title: string }) => (
  <div className="panel rounded-3xl p-6 sm:p-8 shadow-lg space-y-3">
    <h1 className="text-3xl font-semibold text-main">{title}</h1>
    <p className="text-sm text-muted">Public marketing page placeholder.</p>
    <ul className="list-disc list-inside text-sm text-muted space-y-1">
      <li>Hero section with CTA to onboarding forms.</li>
      <li>Value props and partner logos.</li>
      <li>Role-specific FAQ.</li>
    </ul>
  </div>
);

export default MarketingPlaceholder;
