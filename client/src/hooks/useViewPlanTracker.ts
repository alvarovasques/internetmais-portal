import { useEffect } from 'react';

interface ViewPlanOptions {
  section_name: string;
  plan_type: string;
  /** Percentual visível antes de disparar (0–1). Padrão: 0.4 = 40% */
  threshold?: number;
}

/**
 * Recebe um ref já criado (ex: o ref do useScrollAnimation) e dispara
 * dataLayer.push({ event: 'View_Plan', ... }) uma única vez quando o
 * elemento entra na viewport com pelo menos `threshold` de visibilidade.
 */
export function useViewPlanTracker(
  ref: React.RefObject<HTMLElement | null>,
  options: ViewPlanOptions
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { section_name, plan_type, threshold = 0.4 } = options;
    let fired = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !fired) {
            fired = true;
            if (typeof window !== 'undefined' && (window as any).dataLayer) {
              (window as any).dataLayer.push({
                event: 'View_Plan',
                section_name,
                plan_type,
              });
            }
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
