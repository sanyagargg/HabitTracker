import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { defaultColor } from "@/colors";

function Calendar() {
  return (
    <div className="flex mx-4 flex-col gap-6 justify-center items-center mt-10">
      <div className="g-state so rounded-xl p-5 pt-7">
        <DateCalendar
          sx={{
            "& .MuiPickersDay-root": {
              "&.Mui-selected": {
                backgroundColor: defaultColor.default,
              },
            },
            "& .MuiPickersYear-yearButton.Mui-selected": {
              backgroundColor: defaultColor.default,
            },
          }}
        />
      </div>
    </div>
  );
}

export default Calendar;
