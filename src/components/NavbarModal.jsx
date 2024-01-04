import signal from "./icons/signal.svg";
import Wifi from "./icons/Wifi.svg";
import Battery from "./icons/Battery.svg";
import TimeStyle from "./icons/timestyle.png";

const Navbar = () => {
  return (
    <div className=" h-[44px] fixed top-0 w-[375px]   lg:w-full z-50 ">
      <img
        className=" fixed top-[12px] left-[21px] w-[54px] h-[21px]"
        src={TimeStyle}></img>

      <img
        className=" fixed w-[17px]  top-[17.67px] left-[293.67px] md:left-[88%]  h-[10.67px]"
        src={signal}
        alt=""
      />

      <img
        className="w-[15.27px] fixed top-[17.33px] left-[315.69px] md:left-[92%] h-[10.97px] "
        src={Wifi}
        alt=""
      />

      <img
        className="w-[24.33px] fixed top-[17.33px] left-[336px] md:left-[95%] h-[11.33px]"
        src={Battery}
        alt=""
      />
    </div>
  );
};

export default Navbar;
