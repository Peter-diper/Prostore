import { APP_NAME } from "../lib/const";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t">
      <div className="p-5 flex-center">
        {currentYear} {APP_NAME}. All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
