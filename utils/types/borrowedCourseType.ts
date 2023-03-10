import { courseSchedule } from "./courses/schedulesType"
interface borrowedCourseSuggestionWithScheduleType {
    id:number,
    code: string,
    title: string,

    course_origin: {
        department:{
            faculty_id: number,
            id: number,
            name: string,
        }
        parent_department?: {
            id: number,
            name: string, 
        },
        faculty: {
            id: number,
            name: string
        }
    },
    department_id: number,
    level_id: number,
    optional_code: string,
    school_id: number,
    updatedAt: string,
    createdAt: string,
    schedule: courseSchedule | courseSchedule[]
}
export {
    borrowedCourseSuggestionWithScheduleType
}