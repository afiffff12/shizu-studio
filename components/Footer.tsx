import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="inner">
        <div className="footer__top">
          <div>
            <div className="footer__word" data-split="scroll">shizu</div>
            <p className="footer__tag">Thoughtfully designed spaces, inspired by Japan.</p>
          </div>
          <div className="footer__cols">
            <div className="footer__col">
              <span className="label">Menu</span>
              <Link href="/work">Work</Link>
              <Link href="/#spaces">Spaces</Link>
              <Link href="/#styles">Styles</Link>
              <Link href="/#philosophy">Philosophy</Link>
              <Link href="/#studio">Studio</Link>
            </div>
            <div className="footer__col">
              <span className="label">Social</span>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer">Pinterest</a>
              <a href="https://behance.net" target="_blank" rel="noreferrer">Behance</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
            <div className="footer__col">
              <span className="label">Studio</span>
              <span>Jl. Pandanaran 42</span>
              <span>Semarang, Indonesia</span>
              <a href="mailto:hello@shizustudio.co">hello@shizustudio.co</a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 Shizu Studio. All rights reserved.</span>
          <span>Privacy &amp; Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
}
