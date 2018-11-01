import moment from "moment";

const Time_date = () => {
    return (
        moment().format("ddd, MMMM Do YYYY, h:mm:ss a")
    )
};

export default Time_date;
