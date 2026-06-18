export default function AnimatedBackgroundLite() {
  return (
    <div className="site-background" aria-hidden="true">
      <svg className="background-lines" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <path className="background-line" d="M-80 180 C130 70 330 245 555 145 S880 52 1100 210 S1290 370 1540 230" stroke="rgba(88,215,255,0.32)" />
        <path className="background-line" d="M-100 470 C210 330 410 570 680 430 S1120 310 1530 500" stroke="rgba(56,248,212,0.24)" />
        <path className="background-line" d="M80 870 C290 655 560 780 820 585 S1110 395 1510 430" stroke="rgba(167,139,250,0.22)" />
      </svg>
      <span className="bg-node" />
      <span className="bg-node" />
      <span className="bg-node" />
      <span className="floating-geo geo-a" />
      <span className="floating-geo geo-b" />
      <span className="floating-geo geo-c" />
    </div>
  );
}
