// Simple 3D tilt initializer for elements with the `.card-3d` class
export function initCardTilt() {
  if (typeof window === 'undefined') return;
  const cards = () => Array.from(document.querySelectorAll('.card-3d'));

  function onMouseMove(e) {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 18; // -9..9 -> scaled
    const y = -((e.clientY - r.top) / r.height - 0.5) * 18;
    card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateZ(15px)`;
  }

  function onMouseLeave(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    card.style.transition = 'transform 600ms cubic-bezier(.23,1,.32,1)';
    setTimeout(() => { card.style.transition = ''; }, 600);
  }

  function attach() {
    cards().forEach((card) => {
      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);
    });
  }

  function detach() {
    cards().forEach((card) => {
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
    });
  }

  // Re-attach on DOM changes (simple mutation observer)
  const mo = new MutationObserver(() => { detach(); attach(); });
  mo.observe(document.body, { childList: true, subtree: true });

  // initial attach
  attach();

  return () => { mo.disconnect(); detach(); };
}
