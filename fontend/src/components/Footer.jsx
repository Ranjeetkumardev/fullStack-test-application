import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

 
function Footer() {
  return (
    <>
       
      <div className="flex flex-col p-20   bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-indigo-500 to-indigo-400">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold">My Company</h2>
            <p className="text-sm">Contact us: info@yourcompany.com</p>
          </div>
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <Facebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <Twitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <Instagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <Linkedin />
            </a>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
        </div>
      </div>
      </div>
    </>
  );
}

export default Footer;