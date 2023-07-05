export const useQuickFunction = () => {
    function getGetCurrentDaybasedOnId(id: "1" | "2" | "3" | "4" | "5" | "6" | "7") {
        switch (id) {
            case "1":
                return {
                    full: "Monday",
                    short: "Mon",
                    letter: "M"
                }
            case "2":
                return {
                    full: "Tuesday",
                    short: "Tue",
                    letter: "T"
                }
            case "3":
                return {
                    full: "Wednesday",
                    short: "Wed",
                    letter: "W"
                }
            case "4":
                return {
                    full: "Thursday",
                    short: "Thu",
                    letter: "T"
                }
            case "5":
                return {
                    full: "Friday",
                    short: "Fri",
                    letter: "F"
                }
            case "6":
                return {
                    full: "Saturday",
                    short: "Sat",
                    letter: "S"
                }
            case "7":
                return {
                    full: "Sunday",
                    short: "Sun",
                    letter: "S"
                }
        }
    }
    function convertToRgba(colorString: string, opacity: number = 1) {
        let colors = colorString.split(",");
        let rgbaColors = [];

        for (let i = 0; i < colors.length; i++) {
            let hex = colors[i].replace("#", "");
            let r = parseInt(hex.substring(0, 2), 16);
            let g = parseInt(hex.substring(2, 4), 16);
            let b = parseInt(hex.substring(4, 6), 16);
            rgbaColors.push(`rgba(${r}, ${g}, ${b}, ${opacity})`);
        }

        return rgbaColors;
    }
    function regulateColor(colorString:string, factor: number) {
        // Split the color string into individual color values
        let colors = colorString.split(',');

        // Calculate the average brightness of all the colors
        let brightness = 0;
        for (let i = 0; i < colors.length; i++) {
            let r = parseInt(colors[i].slice(1, 3), 16);
            let g = parseInt(colors[i].slice(3, 5), 16);
            let b = parseInt(colors[i].slice(5, 7), 16);
            brightness += (r + g + b) / 3;
        }
        brightness /= colors.length;

        // Calculate the new RGB values for each color based on the regulation factor
        var newColors = [];
        for (let i = 0; i < colors.length; i++) {
            let r = parseInt(colors[i].slice(1, 3), 16);
            let g = parseInt(colors[i].slice(3, 5), 16);
            let b = parseInt(colors[i].slice(5, 7), 16);
            let newR = Math.round(r + (brightness - r) * factor);
            let newG = Math.round(g + (brightness - g) * factor);
            let newB = Math.round(b + (brightness - b) * factor);
            let newHex = "#" + ((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1);
            newColors.push(newHex);
        }

        // Join the new color values back into a comma-separated string
        let newColorString = newColors;

        return newColorString;
    }

    type appTodoTypes = "add-course-and-level" | "add-time-table" | "subscribe-courses" | "completed"
    function getAppTodoInNumber(level: appTodoTypes) {
        switch (level) {
            case "add-course-and-level":
                return 1;
            case "add-time-table":
                return 2;
            case "subscribe-courses":
                return 3;
            case "completed":
                return 4;
        }
    }

    return {
        getGetCurrentDaybasedOnId,
        convertToRgba,
        regulateColor,
        getAppTodoInNumber,
    }
}