import { IconArrowRight } from './LandingIcons';
// import './Button.css';

/**
 * Reusable CTA button.
 * variant: 'primary' (filled sage) | 'secondary' (outlined) | 'ghost' (transparent)
 */
export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  showArrow = false,
  className = '',
}) {
  const classes = `syncher-btn syncher-btn--${variant} ${className}`.trim();

  const content = (
    <>
      <span>{children}</span>
      {showArrow && <IconArrowRight className="syncher-btn__icon" />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {content}
    </button>
  );
}