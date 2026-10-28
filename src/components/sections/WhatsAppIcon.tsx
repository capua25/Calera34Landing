type WhatsAppIconProps = {
  className?: string;
};

// Simplified chat bubble with a handset, drawn for this site (no external asset).
export function WhatsAppIcon({ className }: WhatsAppIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 0 12 2.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.1 7.6c-.3-.6-.6-.6-.9-.6h-.7c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.9c.2.2 2.6 4.1 6.4 5.6 3.2 1.2 3.8 1 4.5.9.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.7.2-1.8l-.6-.4-2.3-1.1c-.3-.1-.5-.2-.8.2l-1 1.3c-.2.2-.4.3-.8.1-.3-.2-1.5-.5-2.8-1.7-1-.9-1.7-2-1.9-2.4-.2-.3 0-.5.2-.7l.5-.6.4-.6c.1-.2 0-.5 0-.6l-1-2.4Z"
        fill="currentColor"
        transform="translate(1.2 -1.4) scale(0.9)"
      />
    </svg>
  );
}
