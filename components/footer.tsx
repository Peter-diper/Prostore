import Link from "next/link";
import { APP_NAME } from "../lib/const";
import { FolderGitIcon } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="p-5 flex-center">
        {currentYear} {APP_NAME}. All Rights Reserved By
        <a target="_blank" href="https://github.com/Peter-diper">
          {" - "} <strong>Rasool Fada</strong>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
