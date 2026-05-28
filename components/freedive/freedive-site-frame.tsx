import type { ReactNode } from "react";

/**
 * Moldura fixa nas bordas da viewport (copiada do template saas).
 * Visível apenas em desktop (≥ 850px); ver estilos em globals.css.
 */
export function FreediveSiteFrame(): ReactNode {
  return (
    <>
      <div className="freedive-site-frame freedive-site-frame--top" aria-hidden="true" />
      <div className="freedive-site-frame freedive-site-frame--bottom" aria-hidden="true" />
      <div className="freedive-site-frame freedive-site-frame--left" aria-hidden="true" />
      <div className="freedive-site-frame freedive-site-frame--right" aria-hidden="true" />

      <svg
        className="freedive-site-corner freedive-site-corner--top-left"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
          fill="currentColor"
        />
      </svg>
      <svg
        className="freedive-site-corner freedive-site-corner--top-right"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
          fill="currentColor"
        />
      </svg>
      <svg
        className="freedive-site-corner freedive-site-corner--bottom-left"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
          fill="currentColor"
        />
      </svg>
      <svg
        className="freedive-site-corner freedive-site-corner--bottom-right"
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M5.50871e-06 0C-0.00788227 37.3001 8.99616 50.0116 50 50H5.50871e-06V0Z"
          fill="currentColor"
        />
      </svg>
    </>
  );
}
