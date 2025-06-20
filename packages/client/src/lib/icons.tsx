export const Spinner = ({ className }: { className?: string }) => (
  <svg
    width="1.5em"
    height="1.5em"
    viewBox="0 0 24 24"
    color="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={className}>
    <path
      d="M2,12A10.94,10.94,0,0,1,5,4.65c-.21-.19-.42-.36-.62-.55h0A11,11,0,0,0,12,23c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z"
      stroke="currentColor"></path>
  </svg>
);
