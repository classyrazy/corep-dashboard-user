interface courseSchedule {
course_id: number,
createdAt: string,
day: 1| 2| 3|4|5|6|7
end_time: string,
id: number,
location: string,
location_type: "physical" |"online",
start_time: string,
type: "1"| "2",
updatedAt: string
}
export {
    courseSchedule
}