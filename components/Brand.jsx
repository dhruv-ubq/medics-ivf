// Brand wordmark: "medics" lowercase, "IVF" uppercase, everywhere.
export default function Brand({ className = "", ivfClassName = "" }) {
  return (
    <span className={className}>
      medics&nbsp;<span className={ivfClassName}>IVF</span>
    </span>
  );
}
