import Link from "next/link";
import Container from "./container";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-slate-900">
      <Container>
        <div className="footer p-10 text-base-content">
          <div>
            <span className="footer-title">Services</span>
            <Link href={"#"} className="link link-hover">
              Branding
            </Link>
            <Link href={"#"} className="link link-hover">
              Design
            </Link>
            <Link href={"#"} className="link link-hover">
              Marketing
            </Link>
            <Link href={"#"} className="link link-hover">
              Advertisement
            </Link>
          </div>
          <div>
            <span className="footer-title">Company</span>
            <Link href={"#"} className="link link-hover">
              About us
            </Link>
            <Link href={"#"} className="link link-hover">
              Contact
            </Link>
            <Link href={"#"} className="link link-hover">
              Jobs
            </Link>
            <Link href={"#"} className="link link-hover">
              Press kit
            </Link>
          </div>
          <div>
            <span className="footer-title">Legal</span>
            <Link href={"#"} className="link link-hover">
              Terms of use
            </Link>
            <Link href={"#"} className="link link-hover">
              Privacy policy
            </Link>
            <Link href={"#"} className="link link-hover">
              Cookie policy
            </Link>
          </div>
          <div>
            <span className="footer-title">Newsletter</span>
            <div className="form-control w-80">
              <label className="label">
                <span className="label-text">Enter your email address</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="username@site.com"
                  className="input input-bordered w-full pr-16"
                />
                <span className="btn btn-primary absolute top-0 right-0 rounded-l-none">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
