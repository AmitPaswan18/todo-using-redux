import { GrAddCircle } from "react-icons/gr";
import PropTypes from "prop-types";

const Header = ({ setActiveStatus }) => {
  return (
    <div className="w-[375px] flex md:justify-between h-[73px] md:w-full">
      <div
        id="today-title"
        className="w-[65px]  md:w-[40px] md:h-[40px] text-3xl font-bold relative top-[16px] left-[16px] h-[41px]">
        Today
      </div>
      <div className="w-[25px] h-[25px] md:w-[40px] md:h-[40px] relative top-[23px] left-[268px] md:left-[-3%]">
        <GrAddCircle
          onClick={setActiveStatus}
          color="#006CFF"
          className="font-bold"
          size={30}
        />
      </div>
    </div>
  );
};

Header.propTypes = {
  setActiveStatus: PropTypes.func,
};

export default Header;
