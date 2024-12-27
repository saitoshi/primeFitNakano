import Link from 'next/link';
import './style.css';
export const Footer = () => {
  return (
    <div id='footer'>
      <div className='footerContainer'>
        <div className='rowSplit'>
          <div className='bigLeftCol'>
            <Link href='/'>
              <img
                className='footerLogo'
                src='/image/mainLogo.png'
                alt='primeFitLogo'
              />
            </Link>
          </div>
          <div className='smlRightCol'>
            <li className='footerNavLinks'>
              <Link href='/'>HOME</Link>
            </li>
            <li className='footerNavLinks'>
              <Link href='/service'>SERVICE</Link>
            </li>
            <li className='footerNavLinks'>
              <Link href='/blog'>BLOG</Link>
            </li>
            <li className='footerNavLinks'>
              <Link href='/location'>LOCATION</Link>
            </li>
            <li className='footerNavLinks'>
              <Link href='/contact'>CONTACT</Link>
            </li>
            <li className='footerNavLinks'>
              <Link href='/faq'>FAQ</Link>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};
