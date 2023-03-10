export const useQuickFunction = () => {
    function getGetCurrentDaybasedOnId(id: 1| 2| 3|4|5|6|7) {
        switch (id) {
            case 1:
                return {
                    full: "Monday",
                    short: "Mon",
                    letter: "M"
                }
            case 2:
                return {
                    full: "Tuesday",
                    short: "Tue",
                    letter: "T"
                }
            case 3:
                return {
                    full: "Wednesday",
                    short: "Wed",
                    letter: "W"
                }
            case 4:
                return {
                    full: "Thursday",
                    short: "Thu",
                    letter: "T"
                }
            case 5:
                return {
                    full: "Friday",
                    short: "Fri",
                    letter: "F"
                }
            case 6:
                return {
                    full: "Saturday",
                    short: "Sat",
                    letter: "S"
                }
            case 7:
                return {
                    full: "Sunday",
                    short: "Sun",
                    letter: "S"
                }
        }
    }
    return {
        getGetCurrentDaybasedOnId
    }
}