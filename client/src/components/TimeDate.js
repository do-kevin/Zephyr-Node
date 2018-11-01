import moment from "moment";

const TimeDate = () => {
    return (
        moment().format("ddd, MMMM Do YYYY, h:mm:ss a")
    )
};

export default TimeDate;
