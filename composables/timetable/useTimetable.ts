import { courseSchedule } from "~~/utils/types/courses/schedulesType";
import moment from "moment"
import Graph from "~~/libs/avanda";
import { useUserStore } from "~~/store/user";
import { useAlert } from "../core/useToast";
export interface TimeTableItem {
    id: number;
    code: string;
    title: string;
    unit: number;
    color: string;
    day: string;
    type: string;
    location: string;
    locationtype: string;
    start: string;
    end: string;
    optionalCode?: string;
    courseId: number;
    level: string;
    isBorrowed: boolean;
}
export const formatTimeToCalendar = (time: string, dayId: number) => {
    // convert time to 12 hour format\
    let timeSplit = time.split(":")
    let hour = parseInt(timeSplit[0])
    let minute = parseInt(timeSplit[1])
    return moment({ hour: hour, minute: minute }).day(dayId).format('YYYY-MM-DD HH:mm')

}
let events = ref<TimeTableItem[]>([])
export const useTimetable = () => {
    let store = useUserStore()
    function transformTimeTableArray(inputArr: any[]): TimeTableItem[] {
        const output: TimeTableItem[] = reactive([]);
        inputArr.forEach(item => {
            const course = item.course;
            // item.schedule.forEach((scheduleItem: courseSchedule) => {
            const outputItem = {
                id: item.id,
                code: course.code,
                title: course.title,
                unit: course.unit,
                color: course.color,
                day: item.day,
                type: item.type,
                location: item.location,
                locationtype: item.location_type,
                start: formatTimeToCalendar(item.start_time, parseInt(item.day)),
                end: formatTimeToCalendar(item.end_time, parseInt(item.day)),
                optionalCode: course.optional_code,
                courseId: course.id,
                level: course.level_id,
                isBorrowed: item.is_borrowed
            };
            output.push(outputItem);
            // });
        });
        return output;
    }
    async function getTimeTableData(dayId: number) {
        try {
            let req = await new Graph().service("Schedule/getTimetableSchedules").fetch(
                "*",
                new Graph().service("Course/getCourseFromParent").as("course")
            ).get()
            // let req = await new Graph().service("CourseTimeline/getAllScheduleWithDeptId").fetch(
            //     "*",
            //     new Graph().service("Course/getCourseFromParent").as("course"),
            //     new Graph().service("CourseSchedule/getScheduleFromParent").as("schedule")
            // ).params({ "department_timetable_id": store.user?.dept_timetable_id }).get()
            // console.log(transformTimeTableArray(req.getData()))
            // console.info(transformTimeTableArray(req.getData()))
            events.value = transformTimeTableArray(req.getData())
            // console.log(events)
            return events
        } catch (error: any) {
            useAlert().openAlert({ type: 'ERROR', msg: error.getMsg() })
        }
    }
    return {
        transformTimeTableArray,
        getTimeTableData,
        events
    }
}