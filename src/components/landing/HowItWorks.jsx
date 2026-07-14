import OrganicDivider, { useRevealOnScroll } from './OrganicDivider';
import './HowItWorks.css';

const steps = [
  {
    number: '01',
    title: 'Check in.',
    description: 'Start your day with a simple, honest check-in — mood, water, sleep.',
  },
  {
    number: '02',
    title: 'Build healthy daily habits.',
    description: 'Small, gentle actions guided by your own rhythm, not a rigid plan.',
  },
  {
    number: '03',
    title: 'Grow through consistent wellness routines.',
    description: 'Watch small, steady habits compound into real, lasting change.',
  },
];

export default function HowItWorks() {
  const { ref, visible } = useRevealOnScroll();
  return (
    <section id="how-it-works" className="how-it-works">
      <OrganicDivider tone="beige" />
      <div ref={ref} className={`how-it-works__inner reveal ${visible ? 'reveal--visible' : ''}`}>
        <span className="section-eyebrow">How It Works</span>
        <h2 className="section-heading">Three gentle steps. That&rsquo;s all.</h2>

        <div className="how-it-works__steps">
          {steps.map(({ number, title, description }, i) => (
            <div className="step" key={number}>
              <span className="step__number">{number}</span>
              <h3 className="step__title">{title}</h3>
              <p className="step__desc">{description}</p>
              {i < steps.length - 1 && <span className="step__connector" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}