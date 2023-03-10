interface courseType {
    id:number,
    code: string,
    title: string,
    description?: string,
    color?: string,
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
    unit: number,
    optional_code: string,
    coordinator?: string;
    school_id: number,
    updatedAt: string,
    createdAt: string,
}
export {
    courseType
}