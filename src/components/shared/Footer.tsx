import { FaLinkedin, FaGithub, FaFacebook } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { BsTelephone } from 'react-icons/bs';
import Image from "next/image";
import image from '../../assets/logo4-removebg-preview1.png';

export const Footer = () => {
  const socialLinks = [
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/mubasshiralkasshaf", title: "LinkedIn" },
    { icon: <FaGithub />, href: "https://github.com/Mubasshir14", title: "Github" },
    { icon: <FaFacebook />, href: "https://www.facebook.com/mubasshir.alkasshaf.5?mibextid=ZbWKwL", title: "Facebook" }
  ];

  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/projects", text: "Project" },
    { href: "/contact", text: "Contact" }
  ];

  return (
    <footer className="bg-base-200/50 bg-gradient-to-b from-primary/10 to-transparent backdrop-blur-sm">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="pt-12 pb-4 grid grid-cols-1 md:grid-cols-3 gap-12">
       
          <div className="flex flex-col items-center md:items-start space-y-4">
            <div className="group relative">
              <Image 
                src={image} 
                alt="logo image" 
                width={150} 
                height={150} 
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary bg-300% animate-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

      
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3 text-primary">
              {navLinks.map((link) => (
                <li key={link.text}>
                  <a 
                    href={link.href} 
                    className="group relative inline-block text-base-content/80 hover:text-base-content transition-colors duration-300 text-primary"
                  >
                    {link.text}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

         
          <div className="flex flex-col items-center md:items-start space-y-6 text-primary">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Connect With Me
            </h3>

           
            <div className="flex gap-4 ">
              {socialLinks.map((social) => (
                <a
                  key={social.title}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.title}
                  className="text-2xl  hover:-translate-y-1 transform group relative inline-block text-base-content/80 hover:text-base-content transition-colors duration-300"
                >
                  {social.icon}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            <div className="space-y-3 text-primary">
              <a 
                href="mailto:mubasshiralkasshaf22@gmail.com"
                className="flex items-center gap-2 hover:text-primary transition-colors duration-300"
              >
                <HiMail className="text-xl" />
                <span>mubasshir@gmail.com</span>
                
              </a>
              <p className="flex items-center gap-2">
                <BsTelephone className="text-lg" />
                <span>01317110909</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};